// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

// Interface for contact form data
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  requestType: string;
  preferredContact: string;
  subscribedToNewsletter: boolean;
  bestTimeToCall?: string;
  vehicleId?: string;
  vehicleTitle?: string;
}

// This is for demo purposes - in production, use a real email service
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

// Function to save contact submissions to a JSON file
async function saveContactSubmission(submission: ContactFormData) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'contact-submissions.json');
    
    // Ensure the directory exists
    await fs.mkdir(dataDir, { recursive: true });
    
    // Get existing submissions or create empty array
    let submissions: ContactFormData[] = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      submissions = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      submissions = [];
    }
    
    // Add timestamp
    const submissionWithTimestamp = {
      ...submission,
      timestamp: new Date().toISOString(),
    };
    
    // Add new submission
    submissions.push(submissionWithTimestamp);
    
    // Save back to file
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf8');
    
    return true;
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return false;
  }
}

// Helper to send email notification
async function sendEmailNotification(formData: ContactFormData) {
  try {
    // Only attempt to send if email configuration is provided
    if (!process.env.EMAIL_USER) {
      console.log('Email sending skipped: No email configuration provided');
      return true;
    }
    
    // Format the email content
    const emailContent = `
      New Contact Form Submission
      
      Type: ${formData.requestType}
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Preferred Contact Method: ${formData.preferredContact}
      ${formData.preferredContact === 'phone' && formData.bestTimeToCall ? `Best Time to Call: ${formData.bestTimeToCall}` : ''}
      
      Subject: ${formData.subject}
      
      Message:
      ${formData.message}
      
      ${formData.vehicleId ? `Related Vehicle: ${formData.vehicleTitle} (ID: ${formData.vehicleId})` : ''}
      
      Newsletter: ${formData.subscribedToNewsletter ? 'Subscribed' : 'Not subscribed'}
    `;
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'contact@premiumauto.com',
      to: process.env.EMAIL_TO || 'sales@premiumauto.com',
      subject: `New Contact Form: ${formData.subject}`,
      text: emailContent,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!formData[field as keyof ContactFormData]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Validate phone format (basic validation, adjust as needed)
    const phoneRegex = /^[0-9()\-\s+]{7,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number' },
        { status: 400 }
      );
    }
    
    // Save the submission
    const saved = await saveContactSubmission(formData);
    
    // Send email notification
    const emailSent = await sendEmailNotification(formData);
    
    // Add to newsletter if subscribed
    if (formData.subscribedToNewsletter) {
      // If you have a newsletter API endpoint, you can call it here
      await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, name: `${formData.firstName} ${formData.lastName}` }),
      });
    }
    
    if (saved) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
        emailSent,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET handler to retrieve contact submissions (admin only - would be protected in production)
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'contact-submissions.json');
    
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      const submissions = JSON.parse(fileData);
      return NextResponse.json(submissions);
    } catch (error) {
      // File doesn't exist or is invalid
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contact submissions' },
      { status: 500 }
    );
  }
}
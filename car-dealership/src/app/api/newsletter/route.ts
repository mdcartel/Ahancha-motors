// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

interface NewsletterSubscription {
  email: string;
  name?: string;
  timestamp: string;
  source?: string;
  interests?: string[];
}

// Setup email transporter (same as contact form)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

// Save subscription to file
async function saveSubscription(subscription: Omit<NewsletterSubscription, 'timestamp'>) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'newsletter-subscribers.json');
    
    // Ensure the directory exists
    await fs.mkdir(dataDir, { recursive: true });
    
    // Get existing subscribers or create empty array
    let subscribers: NewsletterSubscription[] = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      subscribers = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      subscribers = [];
    }
    
    // Check if email already exists
    const emailExists = subscribers.some(sub => sub.email.toLowerCase() === subscription.email.toLowerCase());
    
    if (emailExists) {
      return { success: false, reason: 'already_subscribed' };
    }
    
    // Add timestamp
    const newSubscription: NewsletterSubscription = {
      ...subscription,
      timestamp: new Date().toISOString(),
    };
    
    // Add new subscriber
    subscribers.push(newSubscription);
    
    // Save back to file
    await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf8');
    
    return { success: true };
  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    return { success: false, reason: 'server_error' };
  }
}

// Send confirmation email
async function sendConfirmationEmail(email: string, name?: string) {
  try {
    // Only attempt to send if email configuration is provided
    if (!process.env.EMAIL_USER) {
      console.log('Email sending skipped: No email configuration provided');
      return true;
    }
    
    // Format the email content
    const emailContent = `
      Hello ${name || 'there'},
      
      Thank you for subscribing to the Premium Auto Dealership newsletter!
      
      You'll now receive updates on:
      - New vehicle arrivals
      - Special promotions and discounts
      - Automotive tips and news
      - Exclusive events
      
      If you didn't intend to subscribe, you can unsubscribe by clicking the link in our emails.
      
      Best regards,
      The Premium Auto Dealership Team
    `;
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'newsletter@premiumauto.com',
      to: email,
      subject: 'Welcome to the Premium Auto Dealership Newsletter!',
      text: emailContent,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}

// POST handler to add a new subscriber
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate email
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Save subscription
    const result = await saveSubscription({
      email: data.email,
      name: data.name,
      source: data.source || 'website',
      interests: data.interests,
    });
    
    if (result.success) {
      // Send confirmation email
      const emailSent = await sendConfirmationEmail(data.email, data.name);
      
      return NextResponse.json({
        success: true,
        message: 'You have been successfully subscribed to our newsletter!',
        emailSent,
      });
    } else if (result.reason === 'already_subscribed') {
      return NextResponse.json({
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      }, { status: 409 }); // Conflict status code
    } else {
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET handler to retrieve subscribers (admin only - would be protected in production)
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'newsletter-subscribers.json');
    
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      const subscribers = JSON.parse(fileData);
      return NextResponse.json(subscribers);
    } catch (error) {
      // File doesn't exist or is invalid
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error retrieving newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve newsletter subscribers' },
      { status: 500 }
    );
  }
}

// DELETE handler to unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(process.cwd(), 'data', 'newsletter-subscribers.json');
    
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      let subscribers: NewsletterSubscription[] = JSON.parse(fileData);
      
      // Filter out the email to unsubscribe
      const initialCount = subscribers.length;
      subscribers = subscribers.filter(sub => sub.email.toLowerCase() !== email.toLowerCase());
      
      // If no change in length, the email wasn't subscribed
      if (subscribers.length === initialCount) {
        return NextResponse.json({
          success: false,
          message: 'Email not found in our subscription list.',
        }, { status: 404 });
      }
      
      // Save updated list
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf8');
      
      return NextResponse.json({
        success: true,
        message: 'You have been successfully unsubscribed from our newsletter.',
      });
    } catch (error) {
      // File doesn't exist or is invalid
      return NextResponse.json({
        success: false,
        message: 'Email not found in our subscription list.',
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
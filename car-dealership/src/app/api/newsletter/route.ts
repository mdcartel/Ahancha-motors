// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Mark this app route as statically exportable when using `output: "export"`
export const dynamic = "force-static";
import { saveNewsletterSubscription, getNewsletterSubscribers, unsubscribeFromNewsletter } from '@/lib/db';
import nodemailer from 'nodemailer';

interface NewsletterSubscription {
  email: string;
  name?: string;
  timestamp: string;
  source?: string;
  interests?: string[];
}

// Updated email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.tetnazgrafix.co.ke',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true' || true, // Use true for port 465
  auth: {
    user: process.env.EMAIL_USER || 'no-reply@tetnazgrafix.co.ke',
    pass: process.env.EMAIL_PASSWORD || 'Z=EsX+l94YGL',
  },
});

// Updated send confirmation email function
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
      
      Thank you for subscribing to the Ahancha Motors newsletter!
      
      You'll now receive updates on:
      - New vehicle arrivals
      - Special promotions and discounts
      - Automotive tips and news
      - Exclusive events
      
      If you didn't intend to subscribe, you can unsubscribe by clicking the link in our emails.
      
      Best regards,
      The Ahancha Motors Team
    `;
    
    // Send email with properly formatted from field
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Ahancha Motors" <no-reply@tetnazgrafix.co.ke>',
      to: email,
      subject: 'Welcome to the Ahancha Motors Newsletter!',
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
    
    // Save subscription using the database utility
    const result = await saveNewsletterSubscription({
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
    // Using database utility to retrieve subscribers
    const subscribers = await getNewsletterSubscribers();
    return NextResponse.json(subscribers);
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
    
    // Using database utility to unsubscribe
    const result = await unsubscribeFromNewsletter(email);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'You have been successfully unsubscribed from our newsletter.',
      });
    } else if (result.reason === 'not_found') {
      return NextResponse.json({
        success: false,
        message: 'Email not found in our subscription list.',
      }, { status: 404 });
    } else {
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing unsubscribe request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
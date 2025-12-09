// lib/db.js
import fs from 'fs/promises';
import path from 'path';
// Commented out for static export - SQLite not needed when API routes don't work
// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// Determine if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// Check if we're in a build/static export context (no database needed)
const isStaticExport = process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.__NEXT_PRIVATE_STANDALONE_CONFIG === 'true';

// File paths for development mode
const getFilePath = (filename) => {
  const dataDir = path.join(process.cwd(), 'data');
  return path.join(dataDir, filename);
};

// SQLite setup disabled for static export
// For static export builds, API routes don't work at runtime, so no database needed
let dbPromise = null;
/*
if (!isDevelopment && !isStaticExport) {
  dbPromise = open({
    filename: '/tmp/ahancha-motors.db', // Using /tmp which is writable in Vercel
    driver: sqlite3.Database
  }).then(async (db) => {
    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        subject TEXT,
        message TEXT,
        request_type TEXT,
        preferred_contact TEXT,
        subscribed_to_newsletter INTEGER,
        best_time_to_call TEXT,
        vehicle_id TEXT,
        vehicle_title TEXT,
        timestamp TEXT
      );
      
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT,
        source TEXT,
        interests TEXT,
        timestamp TEXT
      );
    `);
    return db;
  });
}
*/

//=============== CONTACT SUBMISSIONS FUNCTIONS ===============//

export async function saveContactSubmission(submission) {
  try {
    if (isDevelopment) {
      // Development: Use file system
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = getFilePath('contact-submissions.json');

      // Ensure the directory exists
      await fs.mkdir(dataDir, { recursive: true });

      // Get existing submissions or create empty array
      let submissions = [];
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
    } else {
      // Production: Use SQLite
      const db = await dbPromise;

      // Add timestamp if not present
      if (!submission.timestamp) {
        submission.timestamp = new Date().toISOString();
      }

      const result = await db.run(`
        INSERT INTO contact_submissions (
          first_name, last_name, email, phone, subject, message, 
          request_type, preferred_contact, subscribed_to_newsletter,
          best_time_to_call, vehicle_id, vehicle_title, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        submission.firstName,
        submission.lastName,
        submission.email,
        submission.phone,
        submission.subject,
        submission.message,
        submission.requestType,
        submission.preferredContact,
        submission.subscribedToNewsletter ? 1 : 0,
        submission.bestTimeToCall || null,
        submission.vehicleId || null,
        submission.vehicleTitle || null,
        submission.timestamp
      ]);

      return result.lastID > 0;
    }
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return false;
  }
}

export async function getContactSubmissions() {
  try {
    if (isDevelopment) {
      // Development: Use file system
      const filePath = getFilePath('contact-submissions.json');

      try {
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData);
      } catch (error) {
        // File doesn't exist or is invalid
        return [];
      }
    } else {
      // Production: Use SQLite
      const db = await dbPromise;

      const rows = await db.all(`
        SELECT 
          first_name as firstName,
          last_name as lastName,
          email,
          phone,
          subject,
          message,
          request_type as requestType,
          preferred_contact as preferredContact,
          subscribed_to_newsletter as subscribedToNewsletter,
          best_time_to_call as bestTimeToCall,
          vehicle_id as vehicleId,
          vehicle_title as vehicleTitle,
          timestamp
        FROM contact_submissions
        ORDER BY timestamp DESC
      `);

      // Convert SQLite's integer to boolean for subscribedToNewsletter
      return rows.map(row => ({
        ...row,
        subscribedToNewsletter: !!row.subscribedToNewsletter
      }));
    }
  } catch (error) {
    console.error('Error retrieving contact submissions:', error);
    return [];
  }
}

//=============== NEWSLETTER SUBSCRIBERS FUNCTIONS ===============//

export async function saveNewsletterSubscription(subscription) {
  try {
    if (isDevelopment) {
      // Development: Use file system
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = getFilePath('newsletter-subscribers.json');

      // Ensure the directory exists
      await fs.mkdir(dataDir, { recursive: true });

      // Get existing subscribers or create empty array
      let subscribers = [];
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
      const newSubscription = {
        ...subscription,
        timestamp: new Date().toISOString(),
      };

      // Add new subscriber
      subscribers.push(newSubscription);

      // Save back to file
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf8');

      return { success: true };
    } else {
      // Production: Use SQLite
      const db = await dbPromise;

      // Add timestamp if not present
      if (!subscription.timestamp) {
        subscription.timestamp = new Date().toISOString();
      }

      // Convert interests array to JSON string if it exists
      const interests = subscription.interests ? JSON.stringify(subscription.interests) : null;

      try {
        const result = await db.run(`
          INSERT INTO newsletter_subscribers (
            email, name, source, interests, timestamp
          ) VALUES (?, ?, ?, ?, ?)
        `, [
          subscription.email,
          subscription.name || null,
          subscription.source || 'website',
          interests,
          subscription.timestamp
        ]);

        return { success: true };
      } catch (error) {
        // Check if it's a unique constraint error (email already exists)
        if (error.message.includes('UNIQUE constraint failed')) {
          return { success: false, reason: 'already_subscribed' };
        }
        throw error;
      }
    }
  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    return { success: false, reason: 'server_error' };
  }
}

export async function getNewsletterSubscribers() {
  try {
    if (isDevelopment) {
      // Development: Use file system
      const filePath = getFilePath('newsletter-subscribers.json');

      try {
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData);
      } catch (error) {
        // File doesn't exist or is invalid
        return [];
      }
    } else {
      // Production: Use SQLite
      const db = await dbPromise;

      const rows = await db.all(`
        SELECT 
          email,
          name,
          source,
          interests,
          timestamp
        FROM newsletter_subscribers
        ORDER BY timestamp DESC
      `);

      // Parse interests JSON string back to array
      return rows.map(row => ({
        ...row,
        interests: row.interests ? JSON.parse(row.interests) : undefined
      }));
    }
  } catch (error) {
    console.error('Error retrieving newsletter subscribers:', error);
    return [];
  }
}

export async function unsubscribeFromNewsletter(email) {
  try {
    if (isDevelopment) {
      // Development: Use file system
      const filePath = getFilePath('newsletter-subscribers.json');

      try {
        const fileData = await fs.readFile(filePath, 'utf8');
        let subscribers = JSON.parse(fileData);

        // Filter out the email to unsubscribe
        const initialCount = subscribers.length;
        subscribers = subscribers.filter(sub => sub.email.toLowerCase() !== email.toLowerCase());

        // If no change in length, the email wasn't subscribed
        if (subscribers.length === initialCount) {
          return { success: false, reason: 'not_found' };
        }

        // Save updated list
        await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), 'utf8');

        return { success: true };
      } catch (error) {
        // File doesn't exist or is invalid
        return { success: false, reason: 'not_found' };
      }
    } else {
      // Production: Use SQLite
      const db = await dbPromise;

      const result = await db.run(`
        DELETE FROM newsletter_subscribers
        WHERE LOWER(email) = LOWER(?)
      `, [email]);

      if (result.changes === 0) {
        return { success: false, reason: 'not_found' };
      }

      return { success: true };
    }
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return { success: false, reason: 'server_error' };
  }
}
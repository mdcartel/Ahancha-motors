import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Privacy Policy | Premium Auto Dealership',
  description: 'Learn how Premium Auto Dealership collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="relative bg-gray-900 text-white">
                            <div className="absolute inset-0 z-0 opacity-30">
                              <Image 
                                src="/images/backgrounds/services.png" 
                                alt="Premium Auto Dealership" 
                                fill 
                                className="object-cover xl:object-left"
                                priority
                              />
                            </div>
                            <div className="relative z-10 container mx-auto px-4 py-20">
                              <div className="max-w-3xl">
                                <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
                                  Privacy
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Privacy Policy</h1>
                                <p className="text-lg text-gray-300">
                                Last updated: March 10, 2025
                                </p>
                              </div>
                            </div>
                          </div>
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="prose max-w-none">
              <p>
                At Premium Auto Dealership, we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                website or use our services. Please read this Privacy Policy carefully. By accessing or using our website, you 
                acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">1. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fill out forms on our website</li>
                <li>Schedule a test drive or service appointment</li>
                <li>Request a vehicle quote</li>
                <li>Apply for financing</li>
                <li>Contact us via email, phone, or other methods</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in promotions or surveys</li>
              </ul>
              <p>
                This information may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Contact information (name, email address, phone number, address)</li>
                <li>Demographic information (age, gender, location)</li>
                <li>Financial information (for financing applications)</li>
                <li>Vehicle preferences and purchase history</li>
                <li>Service and maintenance history</li>
              </ul>
              
              <p>
                We may also collect certain information automatically when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages viewed and time spent on those pages</li>
                <li>Clicks and interactions on the website</li>
                <li>Device information</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">2. How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing your vehicle purchases, service appointments, and financing applications</li>
                <li>Sending you information about vehicles that match your preferences</li>
                <li>Sending service reminders and maintenance recommendations</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Sending promotional communications and newsletters (if you have opted in)</li>
                <li>Conducting market research and improving our website and services</li>
                <li>Ensuring compliance with legal obligations</li>
                <li>Detecting and preventing fraud</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">3. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities on our 
                website. Cookies are small text files that are stored on your device when you visit a website. They help us 
                provide you with a better browsing experience and allow us to analyze our website traffic.
              </p>
              <p>
                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on 
                your device for a set period or until you delete them). We also use third-party cookies from services like 
                Google Analytics to help us understand how visitors use our website.
              </p>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you 
                when a website tries to place cookies on your device. However, disabling cookies may affect your ability to use 
                certain features of our website.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">4. Information Sharing and Disclosure</h2>
              <p>
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party service providers who 
                  perform services on our behalf, such as website hosting, data analysis, payment processing, and customer service.
                </li>
                <li>
                  <strong>Financial Institutions and Lenders:</strong> If you apply for financing through our dealership, 
                  we may share your information with financial institutions and lenders to process your application.
                </li>
                <li>
                  <strong>Vehicle Manufacturers:</strong> We may share your information with vehicle manufacturers for warranty 
                  registration, recall notifications, and customer satisfaction surveys.
                </li>
                <li>
                  <strong>Business Partners:</strong> We may share your information with trusted business partners who offer 
                  products or services that may be of interest to you, such as extended warranty providers or insurance companies.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response 
                  to valid requests by public authorities (e.g., a court or government agency).
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of 
                  our assets, your information may be transferred as part of that transaction.
                </li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">5. Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational measures to protect your personal information from 
                unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the Internet 
                or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                When you provide sensitive information (such as financial data for financing applications), we encrypt that information 
                using secure socket layer technology (SSL). We also maintain physical, electronic, and procedural safeguards to protect 
                your personal information.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">6. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Information" section below.
              </p>
              <p>
                <strong>Marketing Communications:</strong> You can opt out of receiving promotional emails from us by clicking the 
                "unsubscribe" link at the bottom of our emails. Even if you opt out of receiving marketing communications, we will still 
                send you transactional messages, such as service appointments and purchase confirmations.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">7. Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 16, and we do not knowingly collect personal information from 
                children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to 
                delete that information as quickly as possible.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">8. Kenya Privacy Rights</h2>
              <p>
                Kenya residents may have additional rights under the Kenya Consumer Privacy Act (CCPA) regarding their personal 
                information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to know what personal information we collect, use, disclose, and sell</li>
                <li>The right to request deletion of personal information</li>
                <li>The right to opt out of the sale of personal information</li>
                <li>The right to non-discrimination for exercising these rights</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Information" section below.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, 
                or regulatory reasons. The updated Privacy Policy will be posted on this page with a revised "Last updated" date. We 
                encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your 
                information.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="not-prose">
                <p className="text-gray-800 font-medium">Premium Auto Dealership</p>
                <p className="text-gray-800">123 Auto Drive</p>
                <p className="text-gray-800">Car City, CC 12345</p>
                <p className="text-gray-800">Email: <a href="mailto:privacy@premiumauto.com" className="text-red-600 hover:underline">privacy@premiumauto.com</a></p>
                <p className="text-gray-800">Phone: +2547 9628-0700</p>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="text-center mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                Back to Home
              </a>
              <a 
                href="/terms" 
                className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                View Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
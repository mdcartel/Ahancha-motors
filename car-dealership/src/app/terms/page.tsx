import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Terms of Service | Premium Auto Dealership',
  description: 'Terms and conditions for using the Premium Auto Dealership website and services.',
};

export default function TermsOfServicePage() {
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
                            Terms
                          </div>
                          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Terms of Service</h1>
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
                Welcome to Premium Auto Dealership. These Terms of Service ("Terms") govern your use of our website, 
                located at <a href="https://www.premiumauto.com" className="text-red-600 hover:underline">www.premiumauto.com</a> (the "Site") 
                and the products and services we offer (collectively, the "Services"). By accessing or using our Site or Services, 
                you agree to be bound by these Terms and our Privacy Policy.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms. 
                If you do not agree to all of these Terms, you may not access or use the Site. We reserve the right to modify 
                these Terms at any time, and such modifications shall be effective immediately upon posting on the Site. 
                Your continued use of the Site following any modifications indicates your acceptance of the modified Terms.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">2. Site Use and Restrictions</h2>
              <p>
                You may use this Site for personal, non-commercial purposes only. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Use the Site in any way that violates any applicable laws or regulations</li>
                <li>Use the Site to transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                <li>Interfere with the proper functioning of the Site</li>
                <li>Attempt to breach the Site's security measures</li>
                <li>Collect or harvest any personal information from the Site</li>
                <li>Use the Site to advertise or promote products or services without our prior consent</li>
              </ul>
              <p>
                We reserve the right to terminate your access to the Site for violation of these Terms.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">3. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Site, including but not limited to text, graphics, logos, 
                icons, images, audio clips, digital downloads, and software, are the exclusive property of Premium Auto Dealership 
                or its licensors and are protected by United States and international copyright, trademark, patent, and other 
                intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly 
                display, publicly perform, republish, download, store, or transmit any content on our Site without our prior 
                written consent.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">4. Vehicle Information and Pricing</h2>
              <p>
                While we strive to provide accurate information about our vehicles, we do not warrant that vehicle descriptions, 
                pricing, or other content on the Site is accurate, complete, reliable, current, or error-free. All vehicles are 
                subject to prior sale. Price does not include applicable tax, title, license, processing and/or documentation fees.
              </p>
              <p>
                Manufacturers have the option to change vehicle specifications and features without notice, and we cannot be held 
                responsible for such changes. Images shown on the Site may not reflect the actual vehicle being offered for sale. 
                Customers are advised to confirm vehicle details, availability, and pricing with our dealership before making a 
                purchase decision.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">5. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites that are not owned or controlled by Premium Auto Dealership. 
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
                third-party websites. We do not warrant the offerings of any of these entities/individuals or their websites. 
                You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage 
                or loss caused or alleged to be caused by or in connection with the use of or reliance on any content, goods, 
                or services available on or through any such third-party websites.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">6. Online Scheduling and Appointments</h2>
              <p>
                When scheduling service appointments or test drives through our Site, you agree to provide accurate and complete 
                information. We reserve the right to cancel or reschedule any appointment at our discretion. You understand that 
                scheduling an appointment does not guarantee the availability of specific vehicles or services, which remain 
                subject to prior sale or scheduling changes.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">7. User Submissions</h2>
              <p>
                If you submit any information, feedback, ideas, or other materials to us through the Site (including vehicle 
                reviews, comments, or suggestions), you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and 
                fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, 
                distribute, and display such content throughout the world in any media. You represent and warrant that you own 
                or control all rights to the content you submit and that such content does not violate these Terms.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">8. Disclaimer of Warranties</h2>
              <p>
                THE SITE AND ALL CONTENT, MATERIALS, INFORMATION, AND SERVICES PROVIDED ON THE SITE ARE PROVIDED "AS IS" AND 
                "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE 
                PURSUANT TO APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, 
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT THE FUNCTIONS CONTAINED IN THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS 
                WILL BE CORRECTED, OR THAT THE SITE OR THE SERVERS THAT MAKE THE SITE AVAILABLE ARE FREE OF VIRUSES OR OTHER 
                HARMFUL COMPONENTS. WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE 
                OF THE SITE IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY, OR OTHERWISE.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">9. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL PREMIUM AUTO DEALERSHIP, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, 
                OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT 
                LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO 
                OR USE OF OR INABILITY TO ACCESS OR USE THE SITE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SITE; 
                (III) ANY CONTENT OBTAINED FROM THE SITE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS 
                OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER 
                OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">10. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Premium Auto Dealership, its affiliates, and their respective 
                officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments, awards, 
                losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation 
                of these Terms or your use of the Site.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">11. Governing Law and Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], without 
                giving effect to any principles of conflicts of law. Any dispute arising from or relating to these Terms or your 
                use of the Site shall be subject to the exclusive jurisdiction of the state and federal courts located in 
                [Your County], [Your State].
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">12. Severability</h2>
              <p>
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and 
                interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, 
                and the remaining provisions will continue in full force and effect.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4">13. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="not-prose">
                <p className="text-gray-800 font-medium">Premium Auto Dealership</p>
                <p className="text-gray-800">123 Auto Drive</p>
                <p className="text-gray-800">Car City, CC 12345</p>
                <p className="text-gray-800">Email: <a href="mailto:chachadaniel44@gmail.com" className="text-red-600 hover:underline">chachadaniel44@gmail.com</a></p>
                <p className="text-gray-800">Phone: +2547 9628-0700</p>
              </div>
            </div>
          </div>
          
          {/* Action button */}
          <div className="text-center mb-8">
            <a href="/" className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
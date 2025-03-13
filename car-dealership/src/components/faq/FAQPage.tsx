'use client';

import React, { useState } from 'react';
import { ChevronDown, Search, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

// Define categories and FAQ items
const faqCategories = [
  {
    id: 'buying',
    name: 'Buying a Vehicle',
    icon: '🚗',
    items: [
      {
        question: 'What documents do I need to purchase a vehicle?',
        answer: 'To purchase a vehicle, you\'ll need a valid driver\'s license, proof of insurance, proof of income if financing, and down payment if applicable. For cash purchases, we accept bank transfers, cashier\'s checks, and debit cards for amounts up to specified limits.'
      },
      {
        question: 'Do you offer test drives?',
        answer: 'Yes, we encourage test drives before making a purchase decision. You can schedule a test drive through our website, by phone, or by visiting our dealership. A valid driver\'s license is required, and one of our sales professionals will accompany you during the test drive.'
      },
      {
        question: 'What warranties do your vehicles come with?',
        answer: 'New vehicles come with the manufacturer\'s warranty. Certified pre-owned vehicles come with an extended limited warranty. Used vehicles may have remaining manufacturer warranties or available extended warranty options. We offer various protection plans to suit your needs and budget.'
      },
      {
        question: 'Can I buy a car online without visiting the dealership?',
        answer: 'Yes, we offer an online buying process where you can select a vehicle, apply for financing, and complete most paperwork online. We can arrange delivery of your vehicle to your home or workplace, though some final paperwork may require an in-person signature depending on local regulations.'
      },
      {
        question: 'Do you take trade-ins?',
        answer: 'Yes, we accept trade-ins and offer competitive market-based values. You can get an estimated trade-in value on our website or bring your vehicle to our dealership for an in-person appraisal. The trade-in value can be applied directly to your new purchase.'
      }
    ]
  },
  {
    id: 'financing',
    name: 'Financing & Payments',
    icon: '💰',
    items: [
      {
        question: 'What financing options do you offer?',
        answer: 'We offer a variety of financing options through multiple lenders to fit different credit situations. Our options include traditional auto loans with terms from 24-84 months, lease options, and specialized financing for first-time buyers or those with challenged credit.'
      },
      {
        question: 'What credit score do I need to qualify for financing?',
        answer: 'While a higher credit score typically results in better rates, we work with lenders who accommodate a wide range of credit scores. We have financing options for scores from excellent to challenged. Each application is evaluated individually, considering factors beyond just the credit score.'
      },
      {
        question: 'Can I get pre-approved for financing?',
        answer: 'Yes, you can apply for pre-approval on our website or at our dealership. Pre-approval gives you a clear budget and streamlines the buying process. It typically requires basic personal and financial information and has minimal impact on your credit score.'
      },
      {
        question: 'What is the minimum down payment required?',
        answer: 'Down payment requirements vary based on your credit profile, the vehicles price, and the lenders policies. Generally, we recommend at least 10-20% down for optimal loan terms, but we have options with lower down payments, sometimes as low as 0% for qualified buyers.'
      },
      {
        question: 'How can I lower my monthly payment?',
        answer: 'Monthly payments can be reduced by: making a larger down payment, extending the loan term (though this increases total interest paid), finding a less expensive vehicle, improving your credit score before applying, or bringing a trade-in with equity.'
      }
    ]
  },
  {
    id: 'service',
    name: 'Service & Maintenance',
    icon: '🔧',
    items: [
      {
        question: 'How often should I service my vehicle?',
        answer: 'Follow your vehicle\'s recommended maintenance schedule, typically every 5,000-7,500 miles or 6 months. Your owner\'s manual provides specific intervals for your model. Regular maintenance includes oil changes, tire rotations, and inspections of key systems.'
      },
      {
        question: 'Do you offer loaner vehicles during service?',
        answer: 'Yes, we offer complimentary loaner vehicles for warranty services and major repairs, subject to availability. For minor services, we provide a comfortable waiting area with Wi-Fi, refreshments, and a workspace. Shuttle service is also available within a 10-mile radius.'
      },
      {
        question: 'Can I book a service appointment online?',
        answer: 'Yes, you can schedule service appointments through our website, mobile app, or by calling our service department. Online scheduling allows you to select your preferred date and time, describe your service needs, and receive automatic confirmation and reminders.'
      },
      {
        question: 'What types of service and repairs do you perform?',
        answer: 'Our service center handles everything from routine maintenance (oil changes, tire rotations, brake service) to complex repairs and diagnostics. We have factory-trained technicians with expertise in all major vehicle systems, using genuine parts and advanced diagnostic equipment.'
      },
      {
        question: 'Are your technicians certified?',
        answer: 'Yes, our technicians are factory-trained and certified, with ongoing education to stay current on the latest technologies and repair techniques. Many hold ASE (Automotive Service Excellence) certifications in multiple specialties, and we have manufacturer-specific training for various brands.'
      }
    ]
  },
  {
    id: 'policies',
    name: 'Dealership Policies',
    icon: '📝',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 5-day/250-mile money-back guarantee on most vehicles. If you\'re not satisfied with your purchase, return it in the same condition for a full refund or exchange. Certain conditions apply, and custom-ordered vehicles may be excluded. A small restocking fee may apply for certain situations.'
      },
      {
        question: 'Do you offer a price match guarantee?',
        answer: 'Yes, we will match any legitimate, written offer from another authorized dealer for the same make, model, year, and comparable equipment within 100 miles of our dealership. The competing offer must be presented prior to purchase and verifiable by our sales manager.'
      },
      {
        question: 'What fees should I expect when purchasing a vehicle?',
        answer: 'Beyond the vehicle price, you can expect documentation fees, registration fees, title fees, and applicable sales tax. We provide a transparent breakdown of all fees before purchase with no hidden charges. Optional items like extended warranties or protection packages are clearly itemized.'
      },
      {
        question: 'What are your business hours?',
        answer: 'Our sales department is open Monday-Friday from 9am-7pm, Saturday from 9am-6pm, and Sunday from 11am-5pm. The service center operates Monday-Friday from 7:30am-6pm and Saturday from 8am-4pm. Parts department hours are Monday-Friday from 8am-6pm and Saturday from 8am-4pm.'
      },
        {
            question: 'What is your privacy policy?',
            answer: 'We take your privacy seriously and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and protect your data, including online and offline interactions. We do not sell or share your information with third parties without your consent.'

        }
    ]
  }
];

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('buying');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Toggle FAQ item open/closed
  const toggleItem = (categoryId: string, index: number) => {
    const itemKey = `${categoryId}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  // Filter FAQ items based on search query
  const getFilteredFAQs = () => {
    if (!searchQuery.trim()) {
      return faqCategories;
    }

    const query = searchQuery.toLowerCase();
    return faqCategories.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0);
  };

  const filteredCategories = getFilteredFAQs();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to common questions about our vehicles, financing options, service, and more.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for questions or keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {searchQuery ? (
          // Search results view
          <div>
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            {filteredCategories.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600 mb-4">No results found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map(category => (
                  <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {category.items.map((item, index) => (
                        <div key={index} className="p-6">
                          <button
                            className="flex justify-between items-start w-full text-left"
                            onClick={() => toggleItem(category.id, index)}
                          >
                            <h4 className="text-lg font-medium text-gray-900 pr-8">{item.question}</h4>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-500 transform transition-transform ${
                                openItems[`${category.id}-${index}`] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <div
                            className={`mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${
                              openItems[`${category.id}-${index}`] ? 'max-h-96' : 'max-h-0'
                            }`}
                          >
                            <p className="pt-2">{item.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Regular category view
          <div>
            {/* Category Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {faqCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Accordions */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="mr-2">
                    {faqCategories.find(c => c.id === activeCategory)?.icon}
                  </span>
                  {faqCategories.find(c => c.id === activeCategory)?.name}
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {faqCategories
                  .find(c => c.id === activeCategory)
                  ?.items.map((item, index) => (
                    <div key={index} className="p-6">
                      <button
                        className="flex justify-between items-start w-full text-left"
                        onClick={() => toggleItem(activeCategory, index)}
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-8">{item.question}</h3>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-500 transform transition-transform ${
                            openItems[`${activeCategory}-${index}`] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`mt-2 text-gray-600 transition-all duration-300 overflow-hidden ${
                          openItems[`${activeCategory}-${index}`] ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <p className="pt-2">{item.answer}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Still Have Questions Section */}
        <div className="mt-16 bg-gray-50 rounded-lg shadow border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Still Have Questions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 rounded-full p-3 mr-4">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Call Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our customer service team is available to answer your questions.
              </p>
              <a
                href="tel:+254796280700"
                className="text-red-600 hover:text-red-700 font-medium flex items-center"
              >
                +254 796-280-700
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Hours: Mon-Sat: 9am-7pm | Sun: Closed
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 rounded-full p-3 mr-4">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Email Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:info@ahanchamotors.com"
                className="text-red-600 hover:text-red-700 font-medium flex items-center"
              >
                info@ahanchamotors.com
              </a>
              <p className="text-sm text-gray-500 mt-4">
                For general inquiries, financing questions, or service support
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
'use client';

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface FinanceOption {
  title: string;
  description: string;
  features: string[];
  idealFor: string[];
  learnMoreLink: string;
}

const FinanceOptions = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'lease' | 'special'>('traditional');
  const [expandedOption, setExpandedOption] = useState<number | null>(null);

  const toggleOption = (index: number) => {
    setExpandedOption(expandedOption === index ? null : index);
  };

  const financingOptions: Record<string, FinanceOption[]> = {
    traditional: [
      {
        title: "Standard Auto Loan",
        description: "A traditional auto loan with fixed monthly payments over a set term, typically 36-72 months.",
        features: [
          "Fixed interest rates",
          "Predictable monthly payments",
          "Full vehicle ownership after loan payoff",
          "No mileage restrictions",
          "Ability to customize or sell at any time"
        ],
        idealFor: [
          "Long-term vehicle ownership",
          "High-mileage drivers",
          "Those who want to build equity"
        ],
        learnMoreLink: "/financing/traditional-loans"
      },
      {
        title: "First-Time Buyer Program",
        description: "Specialized financing options for first-time car buyers with limited credit history.",
        features: [
          "More flexible approval requirements",
          "Credit-building opportunity",
          "Competitive rates for first-time buyers",
          "Financial education resources",
          "Lower down payment options"
        ],
        idealFor: [
          "First-time vehicle purchasers",
          "Young buyers with limited credit",
          "Recent graduates"
        ],
        learnMoreLink: "/financing/first-time-buyers"
      },
      {
        title: "Refinancing",
        description: "Replace your current auto loan with a new one, potentially with better terms or lower monthly payments.",
        features: [
          "Opportunity for lower interest rates",
          "Reduced monthly payments",
          "Option to change loan term",
          "Possibility to remove or add co-signers",
          "Cash-out options in some cases"
        ],
        idealFor: [
          "Current owners looking to reduce payments",
          "Those whose credit has improved since original loan",
          "Anyone unhappy with current loan terms"
        ],
        learnMoreLink: "/financing/refinancing"
      }
    ],
    lease: [
      {
        title: "Standard Lease",
        description: "Essentially a long-term rental with lower monthly payments and the option to purchase at the end of the term.",
        features: [
          "Lower monthly payments than traditional loans",
          "Drive a new vehicle every few years",
          "Warranty coverage throughout lease term",
          "Option to purchase at lease-end",
          "Minimal down payment requirements"
        ],
        idealFor: [
          "Those who prefer driving newer vehicles",
          "Drivers who maintain low annual mileage",
          "Business uses with tax advantages"
        ],
        learnMoreLink: "/financing/standard-lease"
      },
      {
        title: "Lease-to-Own",
        description: "A hybrid option that combines aspects of leasing and traditional financing.",
        features: [
          "Lower initial payments that increase equity over time",
          "Predetermined purchase option",
          "More flexibility than traditional leases",
          "Often available for those with less-than-perfect credit",
          "Early purchase options available"
        ],
        idealFor: [
          "Those uncertain about long-term vehicle needs",
          "Buyers looking to build equity gradually",
          "Credit-rebuilding situations"
        ],
        learnMoreLink: "/financing/lease-to-own"
      }
    ],
    special: [
      {
        title: "0% APR Financing",
        description: "Limited-time manufacturer promotions offering interest-free financing on select new vehicles.",
        features: [
          "No interest charges for the life of the loan",
          "Potential for significant savings",
          "Fixed monthly payments",
          "Full vehicle ownership after loan payoff",
          "Usually requires excellent credit"
        ],
        idealFor: [
          "Buyers with excellent credit",
          "Those planning to keep the vehicle long-term",
          "Customers ready to purchase during promotional periods"
        ],
        learnMoreLink: "/financing/zero-apr"
      },
      {
        title: "Credit-Building Program",
        description: "Specialized financing designed to help establish or rebuild credit while purchasing a vehicle.",
        features: [
          "Available for challenged or limited credit histories",
          "Reports to major credit bureaus to build positive history",
          "Structured to improve credit score over time",
          "Financial education and support",
          "Refinancing opportunities after credit improvement"
        ],
        idealFor: [
          "First-time buyers with no credit history",
          "Those rebuilding after credit challenges",
          "Buyers focused on improving financial health"
        ],
        learnMoreLink: "/financing/credit-building"
      },
      {
        title: "Military & First Responder Program",
        description: "Special financing rates and terms for active military, veterans, and first responders.",
        features: [
          "Reduced interest rates",
          "Flexible payment terms for deployments",
          "Lower down payment requirements",
          "Fee waivers on select services",
          "Exclusive vehicle discounts"
        ],
        idealFor: [
          "Active duty military personnel",
          "Veterans",
          "Police, firefighters, and EMTs",
          "Healthcare workers"
        ],
        learnMoreLink: "/financing/military-first-responder"
      }
    ]
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'traditional'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('traditional')}
        >
          Traditional Financing
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'lease'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('lease')}
        >
          Lease Options
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'special'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('special')}
        >
          Special Programs
        </button>
      </div>

      {/* Financing Options */}
      <div className="space-y-4">
        {financingOptions[activeTab].map((option, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleOption(index)}
              className="flex items-center justify-between w-full p-4 text-left focus:outline-none hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">{option.title}</h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  expandedOption === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedOption === index && (
              <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-700 mb-4">{option.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-4 h-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Ideal For</h4>
                    <ul className="space-y-1">
                      {option.idealFor.map((ideal, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-4 h-4 text-red-600 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{ideal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <a
                  href={option.learnMoreLink}
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-6 bg-gray-900 text-white p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Need Financing Help?</h3>
        <p className="text-gray-300 text-sm mb-3">
          Our finance experts can help you navigate your options and find the perfect solution for your situation.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
        >
          Contact a Finance Specialist
        </a>
      </div>
    </div>
  );
};

export default FinanceOptions;
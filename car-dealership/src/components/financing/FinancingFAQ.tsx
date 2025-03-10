'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FinancingFAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqs = [
    {
      question: "What documents do I need for financing?",
      answer: "To process your financing application, you'll typically need a valid driver's license, proof of income (pay stubs or tax returns), proof of residence, and insurance information. Additional documents may be required based on your specific situation."
    },
    {
      question: "Can I get financing with less-than-perfect credit?",
      answer: "Yes! We work with multiple lenders to provide options for a wide range of credit profiles. Our finance team specializes in finding solutions for customers with varying credit histories."
    },
    {
      question: "How long does the approval process take?",
      answer: "In many cases, we can provide preliminary approval within hours. The final approval process typically takes 24-48 hours, depending on the lender and verification requirements."
    },
    {
      question: "Is there a difference between leasing and financing?",
      answer: "Yes, financing means you'll eventually own the vehicle after completing the loan payments. Leasing is essentially a long-term rental with lower monthly payments, but you return the vehicle at the end of the lease term (typically 2-3 years) unless you choose to purchase it."
    },
    {
      question: "Can I pay off my loan early?",
      answer: "Most of our financing options allow for early payoff without penalties. However, specific terms depend on the lender. Our finance team will ensure you understand all terms before finalizing your agreement."
    },
    {
      question: "Do you offer special rates for military or first responders?", 
      answer: "Yes, we offer special financing programs for active military, veterans, and first responders. These programs typically include reduced interest rates, flexible payment terms, and other benefits. Contact our finance team for details."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              className="flex justify-between items-center w-full text-left focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  openQuestion === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            <div 
              className={`mt-2 text-gray-700 overflow-hidden transition-all duration-300 ${
                openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="pb-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center pt-4 border-t border-gray-200">
        <p className="text-gray-700 mb-4">
          Have a question that's not answered here? Our finance team is ready to help.
        </p>
        <a 
          href="/contact?department=finance" 
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          Contact Finance Team
        </a>
      </div>
    </div>
  );
};

export default FinancingFAQ;
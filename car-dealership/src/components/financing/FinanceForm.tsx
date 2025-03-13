'use client';

import React, { useState } from 'react';
import { Calculator, Check } from 'lucide-react';

const FinanceForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    employmentStatus: '',
    annualIncome: '',
    creditScore: '',
    loanAmount: '',
    downPayment: '',
    tradeInValue: '',
    agreedToTerms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      status: 'submitting',
      message: 'Processing your application...',
    });
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        status: 'success',
        message: 'Your application has been submitted successfully! Our finance team will contact you within 24 hours.',
      });
      
      // Reset form after success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        employmentStatus: '',
        annualIncome: '',
        creditScore: '',
        loanAmount: '',
        downPayment: '',
        tradeInValue: '',
        agreedToTerms: false
      });
      
      setCurrentStep(1);
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: 'There was an error submitting your application. Please try again or contact us directly.',
      });
    }
  };

  // Format currency inputs
  const formatCurrency = (value: string) => {
    if (!value) return '';
    return '$' + parseInt(value.replace(/[^\d]/g, '')).toLocaleString();
  };

  // Process currency inputs
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^\d]/g, '');
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  return (
    <div id="finance-form">
      {formStatus.status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-700 mb-4">{formStatus.message}</p>
          <button
            onClick={() => setFormStatus({ status: 'idle', message: '' })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Start New Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step indicators */}
          <div className="flex mb-4">
            <div 
              className={`flex-1 text-center py-2 border-b-2 ${
                currentStep === 1 ? 'border-red-600 text-red-600' : 'border-gray-300 text-gray-500'
              }`}
            >
              Personal Info
            </div>
            <div 
              className={`flex-1 text-center py-2 border-b-2 ${
                currentStep === 2 ? 'border-red-600 text-red-600' : 'border-gray-300 text-gray-500'
              }`}
            >
              Financial Info
            </div>
            <div 
              className={`flex-1 text-center py-2 border-b-2 ${
                currentStep === 3 ? 'border-red-600 text-red-600' : 'border-gray-300 text-gray-500'
              }`}
            >
              Review
            </div>
          </div>
          
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Financial Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Status*
                </label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                >
                  <option value="">Select employment status</option>
                  <option value="employed">Employed Full-Time</option>
                  <option value="partTime">Employed Part-Time</option>
                  <option value="selfEmployed">Self-Employed</option>
                  <option value="retired">Retired</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Income*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Credit Score
                </label>
                <select
                  id="creditScore"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                >
                  <option value="">Select estimated range</option>
                  <option value="excellent">Excellent (720+)</option>
                  <option value="good">Good (690-719)</option>
                  <option value="fair">Fair (630-689)</option>
                  <option value="challenged">Challenged (Below 630)</option>
                  <option value="unknown">Don't Know</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Loan Amount*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      id="loanAmount"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                      className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
                    Down Payment
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      id="downPayment"
                      name="downPayment"
                      value={formData.downPayment}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="tradeInValue" className="block text-sm font-medium text-gray-700 mb-1">
                    Trade-In Value (if any)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      id="tradeInValue"
                      name="tradeInValue"
                      value={formData.tradeInValue}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full p-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Review Information */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h4>
                    <p className="text-gray-900">{formData.firstName} {formData.lastName}</p>
                    <p className="text-gray-900">{formData.email}</p>
                    <p className="text-gray-900">{formData.phone}</p>
                    <p className="text-gray-900">{formData.address}</p>
                    <p className="text-gray-900">{formData.city}, {formData.state} {formData.zipCode}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Financial Information</h4>
                    <p className="text-gray-900">Employment: {formData.employmentStatus}</p>
                    <p className="text-gray-900">Annual Income: ${parseInt(formData.annualIncome).toLocaleString()}</p>
                    <p className="text-gray-900">Credit Score: {formData.creditScore}</p>
                    <p className="text-gray-900">Loan Amount: ${parseInt(formData.loanAmount).toLocaleString()}</p>
                    {formData.downPayment && <p className="text-gray-900">Down Payment: ${parseInt(formData.downPayment).toLocaleString()}</p>}
                    {formData.tradeInValue && <p className="text-gray-900">Trade-In Value: ${parseInt(formData.tradeInValue).toLocaleString()}</p>}
                  </div>
                </div>
                
                <div className="flex items-start mt-4">
                  <input
                    id="agreedToTerms"
                    name="agreedToTerms"
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={handleCheckboxChange}
                    required
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="agreedToTerms" className="ml-2 text-sm text-gray-700">
                    I authorize Ahancha Motors Dealership to obtain my credit report and verify the information provided. 
                    I understand this does not guarantee financing approval. 
                    See our <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a> for more information.
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Form navigation buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={formStatus.status === 'submitting' || !formData.agreedToTerms}
                className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
              >
                {formStatus.status === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            )}
          </div>
          
          {/* Error message */}
          {formStatus.status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
              {formStatus.message}
            </div>
          )}
        </form>
      )}
      
      {/* Calculator Tool */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center text-gray-900 mb-2">
          <Calculator className="h-5 w-5 mr-2 text-red-600" />
          <h3 className="font-medium">Payment Calculator</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Estimate your monthly payments based on loan amount, interest rate, and term.
        </p>
        <a 
          href="/financing/calculator" 
          className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center"
        >
          Open Calculator
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FinanceForm;
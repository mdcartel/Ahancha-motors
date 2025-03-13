'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Check, DollarSign, Percent, Clock } from 'lucide-react';
import FinanceCalculator from '@/components/vehicles/FinanceCalculator';

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
    agreedToTerms: false,
    // Contact API required fields
    subject: 'Financing Application',
    message: 'I would like to apply for financing.',
    requestType: 'financing',
    preferredContact: 'email',
    subscribedToNewsletter: false,
    bestTimeToCall: '',
    vehicleId: '',
    vehicleTitle: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  // Calculator state
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorResults, setCalculatorResults] = useState<{
    vehiclePrice: number;
    monthlyPayment: number;
    loanTerm: number;
    interestRate: number;
    downPayment: number;
    tradeInValue: number;
  }>({
    vehiclePrice: 25000, // Default starting price
    monthlyPayment: 0,
    loanTerm: 60,
    interestRate: 4.99,
    downPayment: 2500,
    tradeInValue: 0
  });

  // Update form data from calculator results
  useEffect(() => {
    if (calculatorResults.monthlyPayment > 0) {
      setFormData(prev => ({
        ...prev,
        loanAmount: String(calculatorResults.vehiclePrice - calculatorResults.downPayment - calculatorResults.tradeInValue),
        downPayment: String(calculatorResults.downPayment),
        tradeInValue: String(calculatorResults.tradeInValue),
        message: `I would like to apply for financing with a monthly payment of $${calculatorResults.monthlyPayment.toFixed(2)}, a loan term of ${calculatorResults.loanTerm} months, and an interest rate of ${calculatorResults.interestRate}%.`
      }));
    }
  }, [calculatorResults]);

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

  // Handler to receive calculator updates
  const handleCalculatorUpdate = (results: any) => {
    // Don't update state automatically from the calculator's useEffect
    // Instead, keep this data available but don't trigger state updates
    // Until the user explicitly clicks "Apply These Calculations"
    console.log("Calculator updated:", results);
    // We don't call setCalculatorResults here anymore
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      status: 'submitting',
      message: 'Processing your application...',
    });
    
    try {
      // Format the data for the Contact API
      const contactApiData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: "Financing Application",
        message: formData.message + `\n\nFinancing Details:\nLoan Amount: $${formData.loanAmount}\nDown Payment: $${formData.downPayment}\nTrade-In Value: $${formData.tradeInValue}\nCredit Score: ${formData.creditScore}\nAnnual Income: $${formData.annualIncome}\n\nAddress: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        requestType: "financing",
        preferredContact: "email",
        subscribedToNewsletter: formData.subscribedToNewsletter,
        monthlyPayment: calculatorResults.monthlyPayment,
        loanTerm: calculatorResults.loanTerm,
        interestRate: calculatorResults.interestRate
      };
      
      // Submit to the Contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactApiData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }
      
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
        agreedToTerms: false,
        subject: 'Financing Application',
        message: 'I would like to apply for financing.',
        requestType: 'financing',
        preferredContact: 'email',
        subscribedToNewsletter: false,
        bestTimeToCall: '',
        vehicleId: '',
        vehicleTitle: ''
      });
      
      setCurrentStep(1);
      setShowCalculator(false);
    } catch (error: any) {
      setFormStatus({
        status: 'error',
        message: error.message || 'There was an error submitting your application. Please try again or contact us directly.',
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
        <>
          {/* Calculator toggle button */}
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => setShowCalculator(!showCalculator)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Calculator className="h-5 w-5 mr-2 text-gray-500" />
              {showCalculator ? 'Hide Calculator' : 'Show Payment Calculator'}
            </button>
          </div>

          {/* Finance Calculator integration */}
          {showCalculator && (
          <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <FinanceCalculator 
              vehiclePrice={calculatorResults.vehiclePrice} 
              onUpdate={handleCalculatorUpdate}
              manualUpdateOnly={true} // Add this prop
            />
            
            {calculatorResults.monthlyPayment > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="font-medium text-blue-700 mb-2">Apply these calculations to your application?</h4>
                <p className="text-blue-600 mb-3">Monthly payment: ${calculatorResults.monthlyPayment.toFixed(2)}</p>
                <button
                  type="button"
                  onClick={() => {
                    // Update form data with calculator results
                    setFormData(prev => ({
                      ...prev,
                      loanAmount: String(calculatorResults.vehiclePrice - calculatorResults.downPayment - calculatorResults.tradeInValue),
                      downPayment: String(calculatorResults.downPayment),
                      tradeInValue: String(calculatorResults.tradeInValue)
                    }));
                    setShowCalculator(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Use These Values
                </button>
              </div>
            )}
          </div>
        )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step indicators */}
            <div className="flex mb-4">
              <div 
                className={currentStep === 1 
                  ? "flex-1 text-center py-2 border-b-2 border-red-600 text-red-600" 
                  : "flex-1 text-center py-2 border-b-2 border-gray-300 text-gray-500"
                }
              >
                Personal Info
              </div>
              <div 
                className={currentStep === 2 
                  ? "flex-1 text-center py-2 border-b-2 border-red-600 text-red-600" 
                  : "flex-1 text-center py-2 border-b-2 border-gray-300 text-gray-500"
                }
              >
                Financial Info
              </div>
              <div 
                className={currentStep === 3 
                  ? "flex-1 text-center py-2 border-b-2 border-red-600 text-red-600" 
                  : "flex-1 text-center py-2 border-b-2 border-gray-300 text-gray-500"
                }
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
                    {calculatorResults.monthlyPayment > 0 && (
                      <p className="text-xs text-green-600 mt-1">From calculator</p>
                    )}
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
                    {calculatorResults.downPayment > 0 && (
                      <p className="text-xs text-green-600 mt-1">From calculator</p>
                    )}
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
                    {calculatorResults.tradeInValue > 0 && (
                      <p className="text-xs text-green-600 mt-1">From calculator</p>
                    )}
                  </div>
                </div>
                
                {/* Monthly payment from calculator */}
                {calculatorResults.monthlyPayment > 0 && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-4">
                    <h4 className="text-md font-medium text-gray-900 mb-2">Your Estimated Payment</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Monthly Payment:</span>
                      <span className="text-xl font-bold text-red-600">${calculatorResults.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                      <div>
                        <span className="text-gray-500">Term:</span>
                        <span className="ml-2 font-medium">{calculatorResults.loanTerm} months</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Interest:</span>
                        <span className="ml-2 font-medium">{calculatorResults.interestRate}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Vehicle:</span>
                        <span className="ml-2 font-medium">${calculatorResults.vehiclePrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Newsletter option */}
                <div className="mt-4">
                  <div className="flex items-start">
                    <input
                      id="subscribedToNewsletter"
                      name="subscribedToNewsletter"
                      type="checkbox"
                      checked={formData.subscribedToNewsletter}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="subscribedToNewsletter" className="ml-2 text-sm text-gray-700">
                      Subscribe to our newsletter for updates on new inventory and special financing offers.
                    </label>
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
                  
                  {/* Calculator results display in review */}
                  {calculatorResults.monthlyPayment > 0 && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <h4 className="font-medium text-green-800 mb-2">Your Calculated Payment Plan</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700">Monthly Payment:</p>
                          <p className="text-lg font-bold text-green-700">${calculatorResults.monthlyPayment.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">Loan Term:</p>
                          <p className="font-medium text-gray-900">{calculatorResults.loanTerm} months</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">Interest Rate:</p>
                          <p className="font-medium text-gray-900">{calculatorResults.interestRate}% APR</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">Vehicle Price:</p>
                          <p className="font-medium text-gray-900">${calculatorResults.vehiclePrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
        </>
      )}
    </div>
  );
};

export default FinanceForm;
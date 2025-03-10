'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Clock, ArrowRight } from 'lucide-react';

interface FinanceCalculatorProps {
  vehiclePrice: number;
  vehicleTitle?: string;
}

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ 
  vehiclePrice, 
  vehicleTitle = 'this vehicle'
}) => {
  const [loanParams, setLoanParams] = useState({
    price: vehiclePrice,
    downPayment: Math.round(vehiclePrice * 0.1), // Default 10% down payment
    tradeInValue: 0,
    loanTerm: 60, // Default 60 months (5 years)
    interestRate: 4.99, // Default 4.99% APR
    taxRate: 6, // Default 6% sales tax
    includeExtendedWarranty: false,
    extendedWarrantyPrice: 1500, // Default warranty price
  });
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  
  // Calculate monthly payment and other loan details
  useEffect(() => {
    // Calculate the loan amount
    let loanAmount = loanParams.price;
    
    // Add sales tax
    loanAmount += loanAmount * (loanParams.taxRate / 100);
    
    // Add extended warranty if selected
    if (loanParams.includeExtendedWarranty) {
      loanAmount += loanParams.extendedWarrantyPrice;
    }
    
    // Subtract down payment and trade-in value
    loanAmount -= (loanParams.downPayment + loanParams.tradeInValue);
    
    // Ensure loan amount is not negative
    loanAmount = Math.max(0, loanAmount);
    
    // Set the total loan amount
    setTotalLoanAmount(loanAmount);
    
    // Calculate monthly payment using loan formula
    const monthlyInterestRate = loanParams.interestRate / 100 / 12;
    const numberOfPayments = loanParams.loanTerm;
    
    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      return;
    }
    
    if (monthlyInterestRate === 0) {
      // Simple division for 0% interest
      setMonthlyPayment(loanAmount / numberOfPayments);
      setTotalInterest(0);
    } else {
      // Standard loan payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const payment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      
      setMonthlyPayment(payment);
      setTotalInterest(payment * numberOfPayments - loanAmount);
    }
  }, [loanParams]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setLoanParams(prev => ({ ...prev, [name]: checked }));
    } else {
      setLoanParams(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Calculator</h3>
      <p className="text-gray-600 mb-6">
        Estimate your monthly payments for {vehicleTitle}. Adjust the values below to see how they affect your payment.
      </p>
      
      <div className="space-y-6">
        {/* Vehicle Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="price"
              value={loanParams.price}
              onChange={handleInputChange}
              min="0"
              step="100"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="downPayment"
              value={loanParams.downPayment}
              onChange={handleInputChange}
              min="0"
              step="100"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Trade-In Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trade-In Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="tradeInValue"
              value={loanParams.tradeInValue}
              onChange={handleInputChange}
              min="0"
              step="100"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term (months)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Clock size={16} className="text-gray-500" />
            </div>
            <select
              name="loanTerm"
              value={loanParams.loanTerm}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="24">24 months (2 years)</option>
              <option value="36">36 months (3 years)</option>
              <option value="48">48 months (4 years)</option>
              <option value="60">60 months (5 years)</option>
              <option value="72">72 months (6 years)</option>
              <option value="84">84 months (7 years)</option>
            </select>
          </div>
        </div>
        
        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (APR)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Percent size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="interestRate"
              value={loanParams.interestRate}
              onChange={handleInputChange}
              min="0"
              max="25"
              step="0.1"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Sales Tax Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sales Tax Rate
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Percent size={16} className="text-gray-500" />
            </div>
            <input
              type="number"
              name="taxRate"
              value={loanParams.taxRate}
              onChange={handleInputChange}
              min="0"
              max="15"
              step="0.1"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        {/* Extended Warranty */}
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeExtendedWarranty"
              name="includeExtendedWarranty"
              checked={loanParams.includeExtendedWarranty}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="includeExtendedWarranty" className="ml-2 text-sm text-gray-700">
              Include Extended Warranty
            </label>
          </div>
          
          {loanParams.includeExtendedWarranty && (
            <div className="mt-3 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign size={16} className="text-gray-500" />
              </div>
              <input
                type="number"
                name="extendedWarrantyPrice"
                value={loanParams.extendedWarrantyPrice}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Results Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-900">Estimated Monthly Payment</h4>
          <span className="text-2xl font-bold text-primary">
            ${monthlyPayment.toFixed(2)}
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Total Loan Amount</p>
            <p className="font-medium text-gray-900">${totalLoanAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Interest</p>
            <p className="font-medium text-gray-900">${totalInterest.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Term Length</p>
            <p className="font-medium text-gray-900">{loanParams.loanTerm} months</p>
          </div>
          <div>
            <p className="text-gray-500">Interest Rate</p>
            <p className="font-medium text-gray-900">{loanParams.interestRate}% APR</p>
          </div>
        </div>
      </div>
      
      {/* Disclaimer and CTA */}
      <div className="mt-6">
        <p className="text-xs text-gray-500 mb-4">
          Disclaimer: Estimated payment calculations are for informational purposes only and do not represent a financing offer. Actual rates and terms may vary based on credit approval and other factors.
        </p>
        
        <a 
          href="/financing" 
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Learn more about our financing options <ArrowRight size={16} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default FinanceCalculator;
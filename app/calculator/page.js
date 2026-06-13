'use client';

import React, { useState } from 'react';
import Card from '@/components/UI/Card';

export default function CalculatorPage() {
  const [onboardingHours, setOnboardingHours] = useState(8);
  const [clientsPerMonth, setClientsPerMonth] = useState(4);
  const [billingRate, setBillingRate] = useState(1500);

  // Core state formulas
  const monthlyHoursLost = onboardingHours * clientsPerMonth;
  const annualHoursLost = monthlyHoursLost * 12;
  const annualFinancialLoss = annualHoursLost * billingRate;

  return (
    <div className="relative overflow-hidden w-full pb-20">
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        <div className="flex flex-col gap-4 mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#3B82F6] uppercase">01 // The Operational Cost</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F3F4F6]">
            Agency Automation Calculator
          </h1>
          <p className="text-xs md:text-sm text-[#9CA3AF] max-w-xl leading-relaxed">
            Estimate how many hours you lose to manual administrative overhead, invoicing disputes, client negotiations, and scoping calls.
          </p>
        </div>

        {/* Sliders and dashboard readout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start !grid-cols-1 md:!grid-cols-5">
          {/* Sliders Input Panel */}
          <Card className="md:col-span-3 flex flex-col gap-6 bg-[#16171D] border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#F3F4F6] border-b border-white/5 pb-3">Inputs</h2>

            {/* Slider 1: Onboarding Hours */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                <label htmlFor="onboarding-hours">Manual Hours per Client</label>
                <span className="font-mono text-[#3B82F6]">{onboardingHours} hrs</span>
              </div>
              <input
                id="onboarding-hours"
                type="range"
                min="1"
                max="20"
                value={onboardingHours}
                onChange={(e) => setOnboardingHours(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1E2028] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <span className="text-[10px] text-[#6B7280]">
                Time spent scoping briefs, preparing proposals, and chasing upfront payments.
              </span>
            </div>

            {/* Slider 2: Clients closed per month */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                <label htmlFor="clients-closed">Clients closed monthly</label>
                <span className="font-mono text-[#3B82F6]">{clientsPerMonth} clients</span>
              </div>
              <input
                id="clients-closed"
                type="range"
                min="1"
                max="10"
                value={clientsPerMonth}
                onChange={(e) => setClientsPerMonth(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1E2028] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <span className="text-[10px] text-[#6B7280]">
                Number of new client project negotiations or onboarding cycles handled.
              </span>
            </div>

            {/* Slider 3: Billing rate */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                <label htmlFor="billing-rate">Avg Hourly Rate (INR)</label>
                <span className="font-mono text-[#3B82F6]">₹{billingRate.toLocaleString('en-IN')}/hr</span>
              </div>
              <input
                id="billing-rate"
                type="range"
                min="500"
                max="5000"
                step="100"
                value={billingRate}
                onChange={(e) => setBillingRate(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1E2028] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <span className="text-[10px] text-[#6B7280]">
                Your equivalent standard billable hourly rate.
              </span>
            </div>
          </Card>

          {/* Results Output Panel */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Card className="bg-[#1E2028] border-[#3B82F6]/20 p-6 flex flex-col items-center text-center justify-center min-h-[200px]">
              <span className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase">Monthly Time Wasted</span>
              <span className="text-4xl md:text-5xl font-extrabold font-mono text-[#F3F4F6] mt-2 mb-1">{monthlyHoursLost}</span>
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Hours lost to administrative tasks</span>
            </Card>

            <Card className="bg-[#3B82F6]/5 border-[#3B82F6]/30 p-6 flex flex-col items-center text-center justify-center min-h-[220px]">
              <span className="text-[10px] font-bold tracking-widest text-[#3B82F6] uppercase">Annual Revenue Leak</span>
              <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#3B82F6] mt-3 mb-2">
                ₹{annualFinancialLoss.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#9CA3AF] max-w-[200px] leading-normal">
                Direct monetary leak based on your billable hourly rate.
              </span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

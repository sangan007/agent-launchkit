'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/UI/Card';
import { useProgress, CHAPTER_TASKS } from '@/components/ProgressProvider';

export default function ChapterThreePage() {
  const { progress, toggleTask } = useProgress();

  const chapterNum = 3;
  const tasks = CHAPTER_TASKS[chapterNum];

  return (
    <div className="relative overflow-hidden w-full pb-20">
      <div className="absolute top-[-10%] left-[-10%] h-[450px] w-[450px] rounded-full bg-[#F59E0B]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        {/* Navigation Breadcrumb */}
        <Link href="/blueprint" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors mb-6 min-h-[44px]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Chapters
        </Link>

        {/* Chapter Header */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-3xl font-bold text-[#F59E0B] opacity-50">03</span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#F3F4F6]">
              The Auto-Pay System
            </h1>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
            Time to deploy: 15 minutes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Main Content Column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div>
              <h2 className="text-base md:text-lg font-bold text-[#F3F4F6] mb-3">Eliminating Bank Transfer Screenshots</h2>
              <p className="text-xs md:text-sm text-[#9CA3AF] leading-relaxed mb-4">
                Chasing down outstanding payments is one of the most frustrating aspects of running an agency. In India, clients often send static payment screenshots that you must manually check and reconcile in your banking application. This chapter automates the settlement. By integrating a secure payment gateway with instant UPI, clients complete transactions, verify in real-time, and get GST-compliant invoices delivered with zero administrative hours on your side.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Step 1: Create Your Secure Merchant Account</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Sign up for a Razorpay or Cashfree business account. Once your digital KYC is processed, your infrastructure unlocks a seamless checkout experience supporting UPI (Google Pay, PhonePe, Paytm, BHIM), local netbanking, and credit cards.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Step 2: Generate Fixed-Price Package Pay Buttons</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Inside your gateway console, create direct payment links for your specific productized service packages (e.g. "₹45,000 Agency Setup Retainer"). These links handle taxes and coupon calculations automatically. When a qualified prospect selects a service level from Chapter 2, they can settle their deposit instantly.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Step 3: Webhook Automation &amp; Instantly Auto-Sent Invoices</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed mb-3">
                  Set up a basic webhook integration or use native automation connections. The second a payment clears, automate the client deliverables instantly:
                </p>

                {/* Code Block for webhook flow */}
                <div className="bg-[#0F1015] border border-white/5 rounded-xl overflow-hidden my-3">
                  <div className="bg-white/[0.01] border-b border-white/5 px-4 py-2 flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500/60"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/60"></span>
                    <span className="font-mono text-[9px] text-[#9CA3AF] uppercase ml-2">Typical Automation Webhook Flow</span>
                  </div>
                  <pre className="p-4 font-mono text-[10px] md:text-xs text-[#E5E7EB] leading-relaxed overflow-x-auto">
{`1. PAYMENT_CLEARED event received from Razorpay API.
2. Auto-generate professional GST-compliant invoice.
3. Deliver PDF invoice to client's email box.
4. Send Discord/WhatsApp alert: "🚀 Project Deposit Authorized - ₹45,000"
5. Auto-create dedicated shared Google Drive folder for client.`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Razorpay Call to Action */}
            <Card className="bg-[#F59E0B]/5 border-[#F59E0B]/20 p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] mb-2">Configure Gateway Settlements</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                Deploy links with immediate UPI verifications and GST compatibility to secure upfront retainers on autopilot.
              </p>
              <a
                href="https://rzp.io/rzp/rgEkOpa4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-transparent text-white font-bold text-xs tracking-wider uppercase border border-[#F59E0B] rounded-[10px] transition-all hover:text-[#F59E0B] hover:border-[#F59E0B]"
              >
                Set Up Razorpay / Cashfree
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </Card>
          </div>

          {/* Checklist Sidebar Column */}
          <div className="md:col-span-2">
            <Card className="bg-[#16171D] border-white/5 p-6 sticky top-24">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] mb-4 border-b border-white/5 pb-2">
                Chapter Checkpoints
              </h3>
              <div className="flex flex-col gap-3">
                {tasks.map((task, idx) => {
                  const isChecked = progress[3] && progress[3][idx];
                  return (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer user-select-none group min-h-[44px]">
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => toggleTask(3, idx)}
                        className="sr-only"
                      />
                      <span className={`h-4.5 w-4.5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                        isChecked
                          ? 'bg-[#F59E0B] border-[#F59E0B]'
                          : 'border-white/10 group-hover:border-[#F59E0B] bg-[#1E2028]'
                      }`}>
                        {isChecked && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </span>
                      <span className={`text-xs leading-normal transition-colors ${
                        isChecked ? 'text-[#6B7280] line-through' : 'text-[#9CA3AF] group-hover:text-[#F3F4F6]'
                      }`}>
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

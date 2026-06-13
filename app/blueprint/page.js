'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/UI/Card';
import { useProgress, CHAPTER_TASKS } from '@/components/ProgressProvider';

export default function BlueprintPage() {
  const { progress, getOverallProgress, toggleTask, isInitialized } = useProgress();
  const overallCompletion = getOverallProgress();

  const chapters = [
    {
      num: '01',
      title: 'The Digital Shopfront',
      desc: 'Deploy a high-performance single-page portfolio site. Establish clear fixed-price levels and register your custom agency domain.',
      path: '/blueprint/chapter-1',
      accentColor: 'border-[#3B82F6]/30',
      badgeColor: 'text-[#3B82F6]'
    },
    {
      num: '02',
      title: 'The Inquiry System',
      desc: 'Eliminate manual WhatsApp DMs. Deploy pre-qualifying discovery forms and conditional routing to route high-value bookings.',
      path: '/blueprint/chapter-2',
      accentColor: 'border-[#818CF8]/30',
      badgeColor: 'text-[#818CF8]'
    },
    {
      num: '03',
      title: 'The Auto-Pay System',
      desc: 'Settle invoices automatically. Integrate a UPI/card payment gateway and configure webhooks to send GST invoices instantly.',
      path: '/blueprint/chapter-3',
      accentColor: 'border-[#F59E0B]/30',
      badgeColor: 'text-[#F59E0B]'
    }
  ];

  return (
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background Atmospheric Glow */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        <div className="flex flex-col gap-4 mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#3B82F6] uppercase">03 // The Infrastructure Blueprint</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F3F4F6]">
            Agency Automation Guide
          </h1>
          <p className="text-xs md:text-sm text-[#9CA3AF] max-w-xl leading-relaxed">
            Follow our 45-minute step-by-step setup guides to launch your automated client onboarding and payout architecture.
          </p>
        </div>

        {/* Dynamic Launch Progress Dashboard */}
        <Card className="bg-[#16171D] border-[#3B82F6]/20 p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3F4F6]">Overall Launch Progress</h3>
            <p className="text-xs text-[#9CA3AF] max-w-md leading-relaxed">
              Complete each checkpoint across the three sub-routes. When you hit 100%, your automated agency engine is officially live.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 min-w-[150px] w-full md:w-auto">
            <div className="flex justify-between w-full text-xs font-semibold text-[#9CA3AF] uppercase">
              <span>Status</span>
              <span className="font-mono text-[#3B82F6]">{isInitialized ? `${overallCompletion}%` : 'Loading...'}</span>
            </div>
            <div className="w-full h-2 bg-[#1E2028] rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-[#3B82F6] rounded-full transition-all duration-500 shadow-[0_0_8px_#3B82F6]"
                style={{ width: `${overallCompletion}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {chapters.map((ch, idx) => (
            <Card key={idx} className={`border bg-[#16171D] hover:border-white/10 hover:translate-y-[-1px] transition-all duration-300 ${ch.accentColor}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-3xl font-bold ${ch.badgeColor} opacity-50 flex-shrink-0`}>
                    {ch.num}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-base md:text-lg font-bold text-[#F3F4F6]">{ch.title}</h2>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-xl">{ch.desc}</p>
                  </div>
                </div>
                <Link
                  href={ch.path}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#1E2028] hover:bg-white/[0.03] text-[#F3F4F6] border border-white/5 hover:border-white/10 rounded-[10px] transition-all self-end sm:self-auto min-h-[44px]"
                >
                  View Guide
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Interactive Checklist Summary */}
        <Card className="bg-[#1E2028]/50 border-white/5 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] mb-4">Launch Milestones Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((ch) => (
              <div key={ch} className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">Chapter 0{ch}</span>
                <div className="flex flex-col gap-2">
                  {CHAPTER_TASKS[ch].map((task, idx) => {
                    const isChecked = progress[ch] && progress[ch][idx];
                    return (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer user-select-none group min-h-[36px]">
                        <input
                          type="checkbox"
                          checked={!!isChecked}
                          onChange={() => toggleTask(ch, idx)}
                          className="sr-only"
                        />
                        <span className={`h-4.5 w-4.5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-[#3B82F6] border-[#3B82F6]'
                            : 'border-white/10 group-hover:border-[#3B82F6] bg-[#1E2028]'
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
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

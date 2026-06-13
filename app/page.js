import React from 'react';
import Link from 'next/link';
import Card from '@/components/UI/Card';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden w-full pb-20">
      {/* Background Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#3B82F6]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#818CF8]/10 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col items-start gap-6 mb-20">
          
          {/* 1. Problem-First Hook (Agitate the Friction) */}
          <div className="border-l-2 border-red-500 pl-4 py-1">
            <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase block mb-1">
              Operational Friction
            </span>
            <p className="text-sm md:text-base text-[#9CA3AF] font-medium max-w-2xl leading-relaxed">
              Solo independent developers and freelancers are drowning in administrative overhead, manual WhatsApp scoping, and ghosted invoices.
            </p>
          </div>

          {/* 2. Core Value Proposition Main Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#F3F4F6] max-w-3xl leading-[1.1] font-sans">
            Scale from Freelance Grind to an Automated Micro-Agency
          </h1>

          {/* 3. Micro-Proof Block */}
          <div className="flex items-center gap-3 bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-xl px-4 py-3 w-full max-w-2xl">
            <svg className="h-5 w-5 text-[#3B82F6] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p className="text-xs md:text-sm text-[#F3F4F6] font-medium leading-relaxed">
              Built by developers to replace messy administrative pipelines with a high-converting, zero-code infrastructure.
            </p>
          </div>

          {/* 4. Value Pillars Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            <Card className="hover:translate-y-[-2px]">
              <div className="flex gap-3 items-start">
                <div className="h-2 w-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] mb-1">Who this is for</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">Independent developers, designers, and solo operators trying to scale into micro-agencies.</p>
                </div>
              </div>
            </Card>
            <Card className="hover:translate-y-[-2px]">
              <div className="flex gap-3 items-start">
                <div className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] mb-1">What result you get</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">Eliminate admin grind, stop scope creep, and securely automate a 3-step upfront deposit pipeline.</p>
                </div>
              </div>
            </Card>
          </div>

          {/* 5. Primary Call to Action */}
          <div className="w-full mt-4">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3B82F6] hover:bg-transparent text-white font-bold text-sm tracking-wider uppercase border border-[#3B82F6] rounded-[10px] transition-all hover:text-[#3B82F6] hover:border-[#3B82F6] shadow-[0_4px_25px_rgba(59,130,246,0.35)] hover:shadow-none hover:translate-y-[-2px] active:scale-[0.98] w-full sm:w-auto text-center"
            >
              Analyze Your Automation ROI
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* --- INTRODUCTION / PROBLEM SECTION --- */}
        <section className="border-t border-white/5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-3 flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest text-[#3B82F6] uppercase">00 // The Problem &amp; The Promise</span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#F3F4F6]">The Silent Tax on Creative Independence</h2>
              <p className="text-xs md:text-sm text-[#9CA3AF] leading-relaxed">
                Most talented Indian freelancers do not fail because of their lack of skill. They fail because they run their business like a manual post office.
              </p>
              <p className="text-xs md:text-sm text-[#9CA3AF] leading-relaxed">
                Every inquiry requires custom negotiations. Every payment involves chasing down Razorpay links, cross-referencing UPI screenshots on WhatsApp, and manually generating invoices. As client numbers grow, administrative overhead scales exponentially, leaving less time for actual high-value delivery.
              </p>
              <div className="border-l-2 border-[#3B82F6] pl-4 py-2 my-2 bg-white/[0.01]">
                <p className="text-xs md:text-sm italic text-[#F3F4F6] leading-relaxed">
                  "Manual administration is the silent tax on creative independence. If you do not automate your operations, you do not own an agency—you have built a highly stressful job where you are the bottleneck."
                </p>
              </div>
            </div>
            <div className="md:col-span-2">
              <Card className="flex flex-col gap-4 border-[#3B82F6]/20 bg-[#16171D]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3F4F6]">The 45-Minute Blueprint</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Learn how to wire three distinct, high-leverage cloud systems together to qualify prospects, schedule bookings, authorize payments, and deliver invoices instantly.
                </p>
                <Link
                  href="/blueprint"
                  className="mt-2 text-center text-xs font-bold uppercase tracking-wider bg-[#1E2028] text-[#F3F4F6] border border-white/5 hover:border-white/20 py-3 rounded-[10px] transition-all hover:bg-white/5"
                >
                  Explore Setup Chapters
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* --- DONE-FOR-YOU MONETIZATION SECTION --- */}
        <section className="border-t border-white/5 py-16 relative">
          <div className="absolute right-[-10%] bottom-[-10%] h-[350px] w-[350px] rounded-full bg-[#F59E0B]/5 blur-[80px] pointer-events-none"></div>
          
          <div className="flex flex-col gap-5 items-start">
            <span className="text-[10px] font-bold tracking-widest text-[#F59E0B] uppercase">04 // Elite Service Deployment</span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#F3F4F6]">Skip the Setup Nightmare</h2>
            <p className="text-xs md:text-sm text-[#9CA3AF] leading-relaxed max-w-2xl">
              Don't want to spend time connecting servers, payment gateways, and databases? Let our engineering team deploy your entire custom, automated onboarding pipeline for you in 48 hours.
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20booking%20the%20Done-For-You%20Deployment%20(₹15,000)%20for%20my%20agency."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white font-bold text-xs tracking-wider uppercase rounded-[10px] transition-opacity cursor-pointer shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
            >
              Book Done-For-You Deployment (₹15,000)
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

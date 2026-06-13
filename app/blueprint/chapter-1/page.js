'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import { useProgress, CHAPTER_TASKS } from '@/components/ProgressProvider';

export default function ChapterOnePage() {
  const { progress, toggleTask } = useProgress();

  const chapterNum = 1;
  const tasks = CHAPTER_TASKS[chapterNum];

  return (
    <div className="relative overflow-hidden w-full pb-20">
      <div className="absolute top-[-10%] left-[-10%] h-[450px] w-[450px] rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none"></div>

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
            <span className="font-mono text-3xl font-bold text-[#3B82F6] opacity-50">01</span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#F3F4F6]">
              The Digital Shopfront
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
              <h2 className="text-base md:text-lg font-bold text-[#F3F4F6] mb-3">Deploying a High-Performance Digital Shopfront</h2>
              <p className="text-xs md:text-sm text-[#9CA3AF] leading-relaxed mb-4">
                A slow, cluttered PDF portfolio or Google Drive folder is a trust-killer. Your business needs a fast, high-converting, single-page digital storefront that communicates instant authority. If loading speeds take longer than 2 seconds, your conversion rates fall by half.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Step 1: Domain Selection and Elite Web Hosting</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Secure a clean, high-performance domain matching your personal brand or agency name. Choose high-leverage domains (such as `.agency`, `.co`, `.in`, or a global `.com`). Do not use free subdomain providers. Free subdomains look unprofessional and restrict your ability to host webhooks, custom code, or high-performance API integrations.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Step 2: Designing a Stark, Minimalist Layout</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  A high-converting agency site does not have sliding carousels, unnecessary background animations, or bulky heavy layouts. Keep it razor-focused:
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1.5 text-xs text-[#9CA3AF]">
                  <li><strong>Hero Headline</strong>: State clearly and instantly who you serve and what exact problem you solve.</li>
                  <li><strong>Proof of Skill</strong>: Present 3 to 4 pixel-perfect case studies of your past work instead of endless thumbnails.</li>
                  <li><strong>Transparent Pricing Tiers</strong>: Define 3 fixed-price tiers (e.g. Starter Setup, Complete Rebuild, Advanced Workflows) rather than hiding prices behind ambiguous "Get a Quote" forms.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Step 3: Integrate Your Primary Action Button</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Ensure every segment of the layout feeds into one single primary call-to-action button: booking a structured inquiry form. Let your page act as a professional landing environment rather than a casual gallery.
                </p>
              </div>
            </div>

            {/* Hosting Call to Action */}
            <Card className="bg-[#3B82F6]/5 border-[#3B82F6]/20 p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] mb-2">Recommended Starting Infrastructure</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                We recommend starting on hosting services optimized for high-volume API requests, fast loading times in India, and SSL compliance.
              </p>
              <a
                href="https://www.hostinger.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] hover:bg-transparent text-white font-bold text-xs tracking-wider uppercase border border-[#3B82F6] rounded-[10px] transition-all hover:text-[#3B82F6] hover:border-[#3B82F6]"
              >
                Get Premium Hosting &amp; Domain
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
                  const isChecked = progress[1] && progress[1][idx];
                  return (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer user-select-none group min-h-[44px]">
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => toggleTask(1, idx)}
                        className="sr-only"
                      />
                      <span className={`h-4.5 w-4.5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all ${
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

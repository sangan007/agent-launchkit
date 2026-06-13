import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0D0E12] py-12 mt-auto">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#F3F4F6] uppercase">Launchkit.</span>
            <p className="text-xs text-[#9CA3AF] mt-3 max-w-sm italic">
              "Stop trading time for administration. Let your machines run your business."
            </p>
          </div>

          <div>
            <span className="text-xs font-bold tracking-widest text-[#9CA3AF] uppercase">Setup Guide Chapters</span>
            <ul className="mt-3 space-y-2 text-xs text-[#9CA3AF]">
              <li>
                <Link href="/blueprint/chapter-1" className="hover:text-[#F3F4F6] transition-colors">
                  01 / Shopfront
                </Link>
              </li>
              <li>
                <Link href="/blueprint/chapter-2" className="hover:text-[#F3F4F6] transition-colors">
                  02 / Intake Form
                </Link>
              </li>
              <li>
                <Link href="/blueprint/chapter-3" className="hover:text-[#F3F4F6] transition-colors">
                  03 / Payments Gateway
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-xs font-bold tracking-widest text-[#9CA3AF] uppercase">Open Infrastructure</span>
            <ul className="mt-3 space-y-2 text-xs text-[#9CA3AF]">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F3F4F6] transition-colors">
                  Source Repository
                </a>
              </li>
              <li>
                <span className="text-[#6B7280]">Distributed freely under the MIT License</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#6B7280]">
          <p>&copy; {new Date().getFullYear()} The One-Person Agency Launchkit. All rights reserved.</p>
          <p>Designed with absolute minimalism for elite digital operators.</p>
        </div>
      </div>
    </footer>
  );
}

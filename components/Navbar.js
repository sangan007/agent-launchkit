'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Calculator', path: '/calculator' },
    { name: 'AI Consultant', path: '/consultant' },
    { name: 'Chapters', path: '/blueprint' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0D0E12]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#F3F4F6] uppercase hover:opacity-85 transition-opacity">
          Launchkit
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[11px] font-bold uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                isActive(link.path)
                  ? 'text-[#3B82F6] border-b border-[#3B82F6]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <button
          className="flex h-11 w-11 items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-white/5 bg-[#0D0E12] px-6 py-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-sm font-bold uppercase tracking-wider min-h-[44px] flex items-center ${
                  isActive(link.path) ? 'text-[#3B82F6]' : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';

// Simple lightweight client-side markdown parser to style markdown responses without installing heavy external packages
function parseMarkdown(text) {
  if (!text) return null;

  const lines = text.split('\n');
  return lines.map((line, index) => {
    // Headers
    if (line.startsWith('# ')) {
      return (
        <h2 key={index} className="text-xl md:text-2xl font-bold text-[#F3F4F6] mt-6 mb-3 border-b border-white/5 pb-2">
          {line.replace('# ', '')}
        </h2>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h3 key={index} className="text-lg md:text-xl font-bold text-[#F3F4F6] mt-5 mb-2">
          {line.replace('## ', '')}
        </h3>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h4 key={index} className="text-sm md:text-base font-semibold text-[#F3F4F6] mt-4 mb-2">
          {line.replace('### ', '')}
        </h4>
      );
    }

    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const cleaned = line.replace(/^[\s]*[-*]\s+/, '');
      // Format bold text inside lists
      return (
        <li key={index} className="ml-5 list-disc text-xs md:text-sm text-[#9CA3AF] mb-1.5 leading-relaxed">
          {formatBoldText(cleaned)}
        </li>
      );
    }

    // Ordered list items
    if (/^\d+\.\s+/.test(line.trim())) {
      const cleaned = line.replace(/^\d+\.\s+/, '');
      return (
        <li key={index} className="ml-5 list-decimal text-xs md:text-sm text-[#9CA3AF] mb-1.5 leading-relaxed">
          {formatBoldText(cleaned)}
        </li>
      );
    }

    // Tables parsing
    if (line.trim().startsWith('|') && index < lines.length - 1) {
      // Check if it's separator line
      if (line.includes('---')) return null;

      const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
      const isHeader = index === 0 || (lines[index - 1] && lines[index - 1].trim() === '') || (lines[index + 1] && lines[index + 1].includes('---'));

      return (
        <div key={index} className="w-full overflow-x-auto my-3">
          <table className="w-full border-collapse border border-white/5">
            <tbody>
              <tr className={isHeader ? 'bg-[#1E2028] border-b border-white/5' : 'border-b border-white/5'}>
                {cells.map((cell, cIdx) => (
                  <td key={cIdx} className={`px-4 py-2 text-xs text-[#F3F4F6] ${isHeader ? 'font-bold uppercase tracking-wider text-[#9CA3AF]' : ''}`}>
                    {formatBoldText(cell)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    // Empty lines
    if (line.trim() === '') {
      return <div key={index} className="h-2"></div>;
    }

    // Regular paragraphs
    return (
      <p key={index} className="text-xs md:text-sm text-[#9CA3AF] mb-3 leading-relaxed">
        {formatBoldText(line)}
      </p>
    );
  }).filter(el => el !== null);
}

// Function to handle inline bold markers **text**
function formatBoldText(text) {
  if (!text.includes('**')) return text;

  const parts = text.split('**');
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="font-semibold text-[#F3F4F6]">{part}</strong>;
    }
    return part;
  });
}

export default function ConsultantPage() {
  const [description, setDescription] = useState('');
  const [streamedOutput, setStreamedOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || loading) return;

    setLoading(true);
    setStreamedOutput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: description }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          setStreamedOutput((prev) => prev + chunk);
        }
      }
    } catch (err) {
      console.error('Error generating framework:', err);
      setStreamedOutput('Error: Failed to connect to AI Productizer. Check connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden w-full pb-20 flex-grow">
      {/* Background Atmospheric Glow */}
      <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#818CF8]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-5xl px-6 pt-24 md:pt-32">
        <div className="flex flex-col gap-4 mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#818CF8] uppercase">02 // The AI Assistant</span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F3F4F6]">
            AI Launch Consultant
          </h1>
          <p className="text-xs md:text-sm text-[#9CA3AF] max-w-xl leading-relaxed">
            Convert your hourly development or design services into clear, fixed-price productized packages to eliminate scope creep and WhatsApp DM scoping.
          </p>
        </div>

        {/* Dual-Pane Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Input Area */}
          <Card className="bg-[#16171D] border-white/5 flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] border-b border-white/5 pb-3">
              Describe Your Services
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: I build custom Shopify websites for local brands. I charge 1500 per hour and typically take 2-3 weeks, handling design, coding, payment setups, and revisions via WhatsApp..."
                className="w-full h-48 bg-[#1E2028] text-sm text-[#F3F4F6] placeholder-[#6B7280] border border-white/5 rounded-[10px] p-4 outline-none focus:border-[#3B82F6] transition-all resize-none"
              />
              <Button
                variant="accent"
                type="submit"
                disabled={loading || !description.trim()}
                className="w-full md:py-3.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Framework...
                  </span>
                ) : (
                  'Generate Productized Framework'
                )}
              </Button>
            </form>
          </Card>

          {/* Right Panel - Streamed Output */}
          <Card className="bg-[#16171D] border-white/5 min-h-[300px] flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] border-b border-white/5 pb-3">
              Productized Framework Output
            </h2>
            <div className="flex-grow mt-4">
              {loading && !streamedOutput && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-[#818CF8] animate-spin"></div>
                  </div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold animate-pulse">
                    AI engine structuring packages...
                  </p>
                </div>
              )}

              {!loading && !streamedOutput && (
                <div className="flex flex-col items-center justify-center py-20 text-center text-[#6B7280]">
                  <svg className="h-10 w-10 mb-3 text-white/5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-8.982M18 13.613L15.904 15M21 3L11.018 12.982M15 9h.008v.008H15V9z" />
                  </svg>
                  <p className="text-xs uppercase tracking-wider font-semibold">Ready for input</p>
                  <p className="text-[10px] mt-1 max-w-[240px] leading-relaxed">
                    Provide a description on the left to structure your services into fixed-scope retainer tiers.
                  </p>
                </div>
              )}

              {streamedOutput && (
                <div className="prose prose-invert max-w-none text-[#9CA3AF]">
                  {parseMarkdown(streamedOutput)}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

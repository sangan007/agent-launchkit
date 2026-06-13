import React from 'react';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-[#16171D] border border-white/5 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-white/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

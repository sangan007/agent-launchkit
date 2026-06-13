import React from 'react';

export default function Button({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wider rounded-[10px] cursor-pointer transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#F3F4F6] text-[#0D0E12] border border-[#F3F4F6] hover:bg-transparent hover:text-[#F3F4F6] hover:border-white/20',
    secondary: 'bg-[#1E2028] text-[#9CA3AF] border border-white/5 hover:text-[#F3F4F6] hover:border-white/20',
    accent: 'bg-[#3B82F6] text-white border border-[#3B82F6] hover:bg-transparent hover:text-[#3B82F6] hover:border-[#3B82F6] shadow-[0_4px_20px_rgba(59,130,246,0.3)]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

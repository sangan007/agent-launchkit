'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(null);

export const CHAPTER_TASKS = {
  1: [
    'Register custom agency domain',
    'Acquire premium high-performance hosting',
    'Establish unified visual layouts & tiers'
  ],
  2: [
    'Draft targeted discovery questions',
    'Setup smart form conditional routing',
    'Enable automatic brief/file uploads'
  ],
  3: [
    'Register Razorpay or Cashfree merchant API',
    'Generate fixed-tier payment buttons',
    'Setup webhook invoice automation'
  ]
};

const defaultProgress = {
  1: [false, false, false],
  2: [false, false, false],
  3: [false, false, false]
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('launchkit-progress-v2');
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('launchkit-progress-v2', JSON.stringify(progress));
      } catch (e) {
        console.error('Failed to save progress to localStorage', e);
      }
    }
  }, [progress, isInitialized]);

  const toggleTask = (chapter, index) => {
    setProgress((prev) => {
      const chapterData = [...(prev[chapter] || [false, false, false])];
      chapterData[index] = !chapterData[index];
      return {
        ...prev,
        [chapter]: chapterData
      };
    });
  };

  const getOverallProgress = () => {
    let total = 0;
    let checked = 0;
    Object.keys(CHAPTER_TASKS).forEach((ch) => {
      CHAPTER_TASKS[ch].forEach((_, idx) => {
        total++;
        if (progress[ch] && progress[ch][idx]) {
          checked++;
        }
      });
    });
    return total > 0 ? Math.round((checked / total) * 100) : 0;
  };

  return (
    <ProgressContext.Provider value={{ progress, toggleTask, getOverallProgress, isInitialized }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

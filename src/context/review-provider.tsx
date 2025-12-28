'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TrendReport } from '@/lib/actions';

interface ReviewContextType {
  report: TrendReport | null;
  setReport: (report: TrendReport | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [report, setReport] = useState<TrendReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ReviewContext.Provider value={{ report, setReport, isLoading, setIsLoading }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
}

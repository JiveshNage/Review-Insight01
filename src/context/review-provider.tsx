'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
<<<<<<< HEAD
import { TrendReport } from '@/lib/actions';

interface ReviewContextType {
  report: TrendReport | null;
  setReport: (report: TrendReport | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
=======

interface ReviewContextType {
  reviews: string[];
  setReviews: (reviews: string[]) => void;
>>>>>>> origin/main
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
<<<<<<< HEAD
  const [report, setReport] = useState<TrendReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ReviewContext.Provider value={{ report, setReport, isLoading, setIsLoading }}>
=======
  const [reviews, setReviews] = useState<string[]>([]);

  return (
    <ReviewContext.Provider value={{ reviews, setReviews }}>
>>>>>>> origin/main
      {children}
    </ReviewContext.Provider>
  );
}

<<<<<<< HEAD
export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
=======
export function useReviewContext() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
>>>>>>> origin/main
  }
  return context;
}

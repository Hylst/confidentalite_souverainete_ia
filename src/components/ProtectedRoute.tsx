import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProgress } from '@/src/contexts/ProgressContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userProfile, isLoading, setIsOnboardingOpen } = useProgress();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !userProfile) {
      setIsOnboardingOpen(true);
    }
  }, [isLoading, userProfile, setIsOnboardingOpen]);

  if (isLoading) {
    return null; // Layout gère déjà le loader global
  }

  if (!userProfile) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

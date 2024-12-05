"use client";

import React, { createContext, useContext, useState } from 'react';
import { InterviewStep, PermissionStatus, Question } from '../types';

interface InterviewContextType {
  currentStep: InterviewStep;
  setCurrentStep: (step: InterviewStep) => void;
  permissions: PermissionStatus;
  setPermissions: (permissions: PermissionStatus) => void;
  currentQuestion: Question | null;
  setCurrentQuestion: (question: Question | null) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<InterviewStep>('instructions');
  const [permissions, setPermissions] = useState<PermissionStatus>({
    audio: false,
    video: false,
    screen: false,
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  return (
    <InterviewContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        permissions,
        setPermissions,
        currentQuestion,
        setCurrentQuestion,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}
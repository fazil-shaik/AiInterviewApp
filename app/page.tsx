"use client";

import { useEffect } from 'react';
import { InterviewProvider, useInterview } from './context/InterviewContext';
import Instructions from './components/Instructions';
import PermissionCheck from './components/PermissionCheck';
import QuestionScreen from './components/QuestionScreen';
import AnswerScreen from './components/AnswerScreen';
import CompletionScreen from './components/CompletionScreen';

function InterviewFlow() {
  const { currentStep } = useInterview();

  const renderStep = () => {
    switch (currentStep) {
      case 'instructions':
        return <Instructions />;
      case 'permissions':
        return <PermissionCheck />;
      case 'question':
        return <QuestionScreen />;
      case 'answer':
        return <AnswerScreen />;
      case 'completion':
        return <CompletionScreen />;
      default:
        return <Instructions />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="light-effect top-[-400px] left-[-400px]" />
      <div className="light-effect top-[-300px] right-[-300px]" />
      <div className="light-effect bottom-[-200px] left-[50%] transform -translate-x-1/2" />
      <div className="relative z-10 w-full">
        {renderStep()}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <InterviewProvider>
      <InterviewFlow />
    </InterviewProvider>
  );
}
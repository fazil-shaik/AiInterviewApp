"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { useInterview } from "../context/InterviewContext";

export default function Instructions() {
  const { setCurrentStep } = useInterview();

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-black/20 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-300" />
          <CardTitle className="text-blue-100">Interview Instructions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-200">Before You Begin:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-100">
            <li>Ensure you re in a quiet environment</li>
            <li>Check your camera and microphone are working</li>
            <li>Have a stable internet connection</li>
            <li>Close unnecessary browser tabs and applications</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-200">Interview Format:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-100">
            <li>You ll be asked a series of questions</li>
            <li>Each question will be presented both in text and audio</li>
            <li>You ll have time to prepare and record your response</li>
            <li>Your video and audio will be recorded for evaluation</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setCurrentStep('permissions')}
        >
          Start Interview
        </Button>
      </CardFooter>
    </Card>
  );
}
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, MoveRight } from "lucide-react";
import { useInterview } from "../context/InterviewContext";

export default function QuestionScreen() {
  const { currentQuestion, setCurrentStep } = useInterview();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">
          {currentQuestion?.text || "How would you handle a difficult situation with a team member?"}
        </div>
        
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full"
            onClick={toggleAudio}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
        </div>

        <audio
          ref={audioRef}
          src={currentQuestion?.audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => setCurrentStep('answer')}
        >
          Start Recording
          <MoveRight className="ml-2 w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
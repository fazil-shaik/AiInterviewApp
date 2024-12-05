"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, StopCircle } from "lucide-react";
import { useInterview } from "../context/InterviewContext";

export default function AnswerScreen() {
  const { setCurrentStep } = useInterview();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        streamRef.current = stream;
        
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
          }
        };

        setIsRecording(true);
        mediaRecorder.start();
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Example of sending recorded data to an API
      const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const formData = new FormData();
      formData.append('video', recordedBlob);

      try {
        // Replace with your actual API endpoint
        // await fetch('/api/submit-recording', {
        //   method: 'POST',
        //   body: formData,
        // });
        
        setCurrentStep('completion');
      } catch (error) {
        console.error('Error submitting recording:', error);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6" />
          <CardTitle>Recording Answer</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
        
        {isRecording && (
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm">Recording in progress...</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive"
          className="w-full"
          onClick={handleStopRecording}
          disabled={!isRecording}
        >
          <StopCircle className="mr-2 w-4 h-4" />
          Stop Recording
        </Button>
      </CardFooter>
    </Card>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mic, Camera, Monitor, CheckCircle2, XCircle } from "lucide-react";
import { useInterview } from "../context/InterviewContext";

export default function PermissionCheck() {
  const { permissions, setPermissions, setCurrentStep } = useInterview();
  const [isChecking, setIsChecking] = useState(false);

  const checkPermissions = async () => {
    setIsChecking(true);
    try {
      // Check audio and video permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach(track => track.stop());
      setPermissions(prev => ({ ...prev, audio: true, video: true }));

      // Check screen sharing permission
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenStream.getTracks().forEach(track => track.stop());
      setPermissions(prev => ({ ...prev, screen: true }));
    } catch (error) {
      console.error('Permission check failed:', error);
    }
    setIsChecking(false);
  };

  const allPermissionsGranted = permissions.audio && permissions.video && permissions.screen;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          <CardTitle>System Check</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              <span>Microphone Access</span>
            </div>
            {permissions.audio ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              <span>Camera Access</span>
            </div>
            {permissions.video ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              <span>Screen Sharing</span>
            </div>
            {permissions.screen ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          className="w-full"
          onClick={checkPermissions}
          disabled={isChecking}
        >
          {isChecking ? "Checking Permissions..." : "Check Permissions"}
        </Button>
        <Button 
          className="w-full"
          variant="secondary"
          onClick={() => setCurrentStep('question')}
          disabled={!allPermissionsGranted}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
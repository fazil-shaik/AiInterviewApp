"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mic, Camera, Monitor } from "lucide-react";
import { useInterview } from "../context/InterviewContext";
import { useMediaPermissions } from "../../hooks/useMediaPermissions";
import { PermissionCheckItem } from "./PermissionCheckItem";

export default function PermissionCheck() {
  const { permissions, setPermissions, setCurrentStep } = useInterview();
  const { isChecking, checkPermissions } = useMediaPermissions();

  const allPermissionsGranted = permissions.audio && permissions.video && permissions.screen;

  const handleCheckPermissions = () => {
    checkPermissions(setPermissions);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-black/20 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-300" />
          <CardTitle className="text-blue-100">System Check</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <PermissionCheckItem
            icon={<Mic className="w-5 h-5 text-blue-300" />}
            label="Microphone Access"
            granted={permissions.audio}
          />
          <PermissionCheckItem
            icon={<Camera className="w-5 h-5 text-blue-300" />}
            label="Camera Access"
            granted={permissions.video}
          />
          <PermissionCheckItem
            icon={<Monitor className="w-5 h-5 text-blue-300" />}
            label="Screen Sharing"
            granted={permissions.screen}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleCheckPermissions}
          disabled={isChecking}
        >
          {isChecking ? "Checking Permissions..." : "Check Permissions"}
        </Button>
        <Button
          className="w-full bg-blue-400/10 hover:bg-blue-400/20 text-blue-100"
          variant="secondary"
          onClick={() => setCurrentStep("question")}
          disabled={!allPermissionsGranted}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
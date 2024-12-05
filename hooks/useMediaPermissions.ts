"use client";

import { useState } from 'react';
import { PermissionStatus } from '../app/types/permissions';

export function useMediaPermissions() {
  const [isChecking, setIsChecking] = useState(false);

  const checkPermissions = async (
    setPermissions: (permissions: PermissionStatus) => void
  ): Promise<void> => {
    setIsChecking(true);
    try {
      // Check audio and video permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      
      // Check screen sharing permission
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenStream.getTracks().forEach((track) => track.stop());

      setPermissions({
        audio: true,
        video: true,
        screen: true,
      });
    } catch (error) {
      console.error("Permission check failed:", error);
      setPermissions({
        audio: false,
        video: false,
        screen: false,
      });
    }
    setIsChecking(false);
  };

  return {
    isChecking,
    checkPermissions,
  };
}
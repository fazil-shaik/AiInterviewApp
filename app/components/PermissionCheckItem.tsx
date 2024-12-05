"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { PermissionCheckProps } from "../types/permissions";

export function PermissionCheckItem({ icon, label, granted }: PermissionCheckProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {granted ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-destructive" />
      )}
    </div>
  );
}
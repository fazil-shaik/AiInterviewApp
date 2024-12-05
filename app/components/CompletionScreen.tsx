"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function CompletionScreen() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <CardTitle>Interview Completed</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="py-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Thank you for completing the interview!
          </h3>
          <p className="text-muted-foreground">
            Your responses have been recorded successfully. We will review your interview and get back to you soon.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => window.location.href = '/'}
        >
          Return to Home
        </Button>
      </CardFooter>
    </Card>
  );
}
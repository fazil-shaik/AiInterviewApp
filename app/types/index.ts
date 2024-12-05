export type InterviewStep = 'instructions' | 'permissions' | 'question' | 'answer' | 'completion';

export interface Question {
  id: string;
  text: string;
  audioUrl: string;
  duration: number;
}

export interface PermissionStatus {
  audio: boolean;
  video: boolean;
  screen: boolean;
}
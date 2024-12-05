export interface PermissionStatus {
    audio: boolean;
    video: boolean;
    screen: boolean;
  }
  
  export interface PermissionCheckProps {
    icon: React.ReactNode;
    label: string;
    granted: boolean;
  }
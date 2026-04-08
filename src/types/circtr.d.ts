export {};

declare global {
  interface Window {
    circtr?: {
      platform: NodeJS.Platform;
      window: {
        minimize: () => Promise<void>;
        toggleMaximize: () => Promise<boolean>;
        close: () => Promise<void>;
        isMaximized: () => Promise<boolean>;
        onMaximizedChange: (listener: (isMaximized: boolean) => void) => () => void;
      };
    };
  }
}

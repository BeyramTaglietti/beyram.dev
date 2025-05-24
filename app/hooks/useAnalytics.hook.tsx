/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (eventName: string, payload?: Record<string, unknown>) => {
      if (process.env.NODE_ENV !== "development") {
        (window as any).umami.track(eventName, payload);
      }
    },
    []
  );

  return {
    trackEvent,
  };
};

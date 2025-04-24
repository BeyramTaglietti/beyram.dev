/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";

export const UseAnalytics = () => {
  const trackEvent = useCallback(
    (eventName: string, payload?: Record<string, unknown>) => {
      (window as any).umami.track(eventName, payload);
    },
    []
  );

  return {
    trackEvent,
  };
};

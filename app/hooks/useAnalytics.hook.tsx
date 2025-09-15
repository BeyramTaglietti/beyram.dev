/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";

export enum AnalyticsEvent {
  OPEN_APP = "Open app",
  MONITOR_CLICKED = "Monitor clicked",
  PLAY_MUSIC = "Playing music",
}

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (eventName: AnalyticsEvent, payload?: Record<string, unknown>) => {
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

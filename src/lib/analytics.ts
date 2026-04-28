import posthog from "posthog-js";

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;

export function trackEvent(
  eventName: string,
  properties: Record<string, string | number | boolean | null>
) {
  if (!posthogKey) return;

  posthog.capture(eventName, properties);
}

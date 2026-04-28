import posthog from "posthog-js";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost =
  import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

export function initAnalytics() {
  if (!posthogKey) return;

  posthog.init(posthogKey, {
    api_host: posthogHost,
    autocapture: false,
    capture_pageview: true,
    person_profiles: "identified_only",
  });
}

export function trackEvent(
  eventName: string,
  properties: Record<string, string | number | boolean | null>
) {
  if (!posthogKey) return;

  posthog.capture(eventName, properties);
}

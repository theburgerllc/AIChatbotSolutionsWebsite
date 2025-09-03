export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  try {
    gtag('event', event, params || {});
  } catch { /* noop */ }
}

export function pageview(path: string, title?: string) {
  track('page_view', { page_path: path, page_title: title || document?.title });
}


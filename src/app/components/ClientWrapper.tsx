"use client";

import { useEffect } from "react";

export default function ClientWrapper() {
  useEffect(() => {
    // Monitor Core Web Vitals
    import("web-vitals").then((webVitals) => {
      // web-vitals v5 uses different API
      if (webVitals.onCLS) webVitals.onCLS(console.log);
      if (webVitals.onFCP) webVitals.onFCP(console.log);
      if (webVitals.onINP) webVitals.onINP(console.log);
      if (webVitals.onLCP) webVitals.onLCP(console.log);
      if (webVitals.onTTFB) webVitals.onTTFB(console.log);
    });

    // Monitor performance metrics
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navigationEntry = entry as PerformanceNavigationTiming;
            console.log("Navigation Performance:", {
              domContentLoaded:
                navigationEntry.domContentLoadedEventEnd -
                navigationEntry.domContentLoadedEventStart,
              loadComplete:
                navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
              domInteractive: navigationEntry.domInteractive,
              firstPaint: performance.getEntriesByType("paint")[0]?.startTime,
            });
          }
        }
      });

      observer.observe({ entryTypes: ["navigation", "paint"] });
    }

    // Monitor user interactions
    let lastInteraction = Date.now();
    const updateLastInteraction = () => {
      lastInteraction = Date.now();
    };

    ["click", "keydown", "scroll", "touchstart"].forEach((event) => {
      document.addEventListener(event, updateLastInteraction, {
        passive: true,
      });
    });

    // Report performance data periodically
    const reportPerformance = () => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteraction;

      // Send to analytics if user is active
      if (timeSinceLastInteraction < 30000) {
        // 30 seconds
        console.log("Performance Report:", {
          timestamp: now,
          timeSinceLastInteraction,
          memoryUsage: (
            performance as Performance & { memory?: { usedJSHeapSize: number } }
          ).memory?.usedJSHeapSize,
          navigationType: performance.navigation.type,
        });
      }
    };

    const interval = setInterval(reportPerformance, 60000); // Every minute

    return () => {
      clearInterval(interval);
      ["click", "keydown", "scroll", "touchstart"].forEach((event) => {
        document.removeEventListener(event, updateLastInteraction);
      });
    };
  }, []);

  return null; // This component doesn't render anything
}

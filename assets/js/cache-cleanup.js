import { APP_VERSION } from "./app-version.js";

let cleanupPromise = null;

export async function runCacheCleanup(page = "unknown") {
  if (cleanupPromise) return cleanupPromise;

  cleanupPromise = (async () => {
    const summary = {
      page,
      appVersion: APP_VERSION,
      serviceWorkerSupported: "serviceWorker" in navigator,
      registrationsFound: 0,
      registrationsRemoved: 0,
      cacheStorageSupported: "caches" in window,
      cachesFound: 0,
      cachesDeleted: [],
    };

    if (summary.serviceWorkerSupported) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        summary.registrationsFound = registrations.length;

        for (const registration of registrations) {
          try {
            const removed = await registration.unregister();
            if (removed) summary.registrationsRemoved += 1;
          } catch (error) {
            console.warn("[Cache] Service worker unregister hiba", error);
          }
        }
      } catch (error) {
        console.warn("[Cache] Service worker lista lekérése sikertelen", error);
      }
    }

    if (summary.cacheStorageSupported) {
      try {
        const cacheNames = await caches.keys();
        summary.cachesFound = cacheNames.length;

        for (const cacheName of cacheNames) {
          try {
            const deleted = await caches.delete(cacheName);
            if (deleted) summary.cachesDeleted.push(cacheName);
          } catch (error) {
            console.warn(`[Cache] Cache Storage törlés sikertelen: ${cacheName}`, error);
          }
        }
      } catch (error) {
        console.warn("[Cache] Cache Storage lista lekérése sikertelen", error);
      }
    }

    console.info("[Cache] Cleanup", summary);
    return summary;
  })();

  return cleanupPromise;
}

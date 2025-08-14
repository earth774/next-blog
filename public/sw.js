const CACHE_NAME = "amiearth-blog-v1";
const STATIC_CACHE_NAME = "amiearth-static-v1";

// Files to cache immediately
const STATIC_FILES = [
  "/",
  "/blog",
  "/about",
  "/project",
  "/feed.xml",
  "/manifest.json",
  "/profile.jpg",
  "/favicon.ico",
];

// Install event - cache static files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - implement caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith("/api/")) {
    // API requests - network first with cache fallback
    event.respondWith(networkFirst(request));
  } else if (isStaticAsset(url.pathname)) {
    // Static assets - cache first with network fallback
    event.respondWith(cacheFirst(request));
  } else if (isHTMLPage(url.pathname)) {
    // HTML pages - stale-while-revalidate
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Default - network first
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy for static assets
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response("Network error", { status: 503 });
  }
}

// Network first strategy for dynamic content
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response("Network error", { status: 503 });
  }
}

// Stale while revalidate strategy for HTML pages
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // Return cached response immediately if available
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response);
      }
    });
    return cachedResponse;
  }

  // If no cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response("Network error", { status: 503 });
  }
}

// Helper functions
function isStaticAsset(pathname) {
  return /\.(js|css|woff|woff2|ttf|otf|eot|ico|png|jpg|jpeg|gif|webp|svg|mp4|webm|ogg|mp3|wav)$/i.test(
    pathname
  );
}

function isHTMLPage(pathname) {
  return !isStaticAsset(pathname) && !pathname.startsWith("/api/");
}

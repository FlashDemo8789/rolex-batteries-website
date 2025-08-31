/**
 * Rolex Batteries - Service Worker
 * Modern PWA with advanced caching strategies
 */

const CACHE_NAME = 'rolex-batteries-v1.0.0';
const STATIC_CACHE_NAME = 'rolex-batteries-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'rolex-batteries-dynamic-v1.0.0';

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/critical.css',
  '/css/main.css',
  '/js/critical.js',
  '/js/main.js',
  '/manifest.json'
];

// Cache rules for different resource types
const CACHE_RULES = [
  {
    pattern: /\.(js|css)$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 50
  },
  {
    pattern: /\.(png|jpg|jpeg|svg|webp|ico)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 100
  },
  {
    pattern: /\.(woff|woff2|ttf|eot)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    maxEntries: 20
  },
  {
    pattern: /\/api\//,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  }
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE_NAME);
        await cache.addAll(STATIC_ASSETS);
        console.log('Service Worker: Static assets cached');
        
        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('Service Worker: Install failed', error);
      }
    })()
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating');
  
  event.waitUntil(
    (async () => {
      try {
        // Take control of all clients
        await self.clients.claim();
        
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('rolex-batteries-') && 
          name !== CACHE_NAME &&
          name !== STATIC_CACHE_NAME &&
          name !== DYNAMIC_CACHE_NAME
        );
        
        await Promise.all(oldCaches.map(name => caches.delete(name)));
        console.log('Service Worker: Old caches cleaned up');
        
        // Update all clients
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_UPDATE',
            message: 'Service Worker updated successfully'
          });
        });
        
      } catch (error) {
        console.error('Service Worker: Activation failed', error);
      }
    })()
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', event => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(handleRequest(event.request));
});

// Main request handler
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Find matching cache rule
  const rule = CACHE_RULES.find(rule => rule.pattern.test(url.pathname));
  const strategy = rule?.strategy || CACHE_STRATEGIES.NETWORK_FIRST;
  
  try {
    switch (strategy) {
      case CACHE_STRATEGIES.CACHE_FIRST:
        return await cacheFirst(request, rule);
      case CACHE_STRATEGIES.NETWORK_FIRST:
        return await networkFirst(request, rule);
      case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
        return await staleWhileRevalidate(request, rule);
      case CACHE_STRATEGIES.NETWORK_ONLY:
        return await fetch(request);
      case CACHE_STRATEGIES.CACHE_ONLY:
        return await cacheOnly(request);
      default:
        return await networkFirst(request, rule);
    }
  } catch (error) {
    console.error('Service Worker: Request failed', error);
    return await getOfflineFallback(request);
  }
}

// Cache-first strategy
async function cacheFirst(request, rule) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cache entry is still valid
    if (rule?.maxAge) {
      const cacheDate = new Date(cachedResponse.headers.get('sw-cache-date') || 0);
      const isExpired = Date.now() - cacheDate.getTime() > rule.maxAge;
      
      if (isExpired) {
        // Fetch new version in background
        fetchAndCache(request, cache, rule).catch(console.error);
      }
    }
    
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  const response = await fetch(request);
  await cacheResponse(cache, request, response.clone(), rule);
  return response;
}

// Network-first strategy
async function networkFirst(request, rule) {
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await cacheResponse(cache, request, response.clone(), rule);
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, rule) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Always fetch fresh version in background
  const fetchPromise = fetchAndCache(request, cache, rule);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    fetchPromise.catch(console.error); // Don't wait for background fetch
    return cachedResponse;
  }
  
  // No cached version, wait for network
  return await fetchPromise;
}

// Cache-only strategy
async function cacheOnly(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (!cachedResponse) {
    throw new Error('Resource not found in cache');
  }
  
  return cachedResponse;
}

// Helper: Fetch and cache response
async function fetchAndCache(request, cache, rule) {
  const response = await fetch(request);
  
  if (response.ok) {
    await cacheResponse(cache, request, response.clone(), rule);
  }
  
  return response;
}

// Helper: Cache response with metadata
async function cacheResponse(cache, request, response, rule) {
  // Add cache metadata
  const responseWithMetadata = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      'sw-cache-date': new Date().toISOString()
    }
  });
  
  await cache.put(request, responseWithMetadata);
  
  // Enforce cache size limits
  if (rule?.maxEntries) {
    await limitCacheSize(cache, rule.maxEntries);
  }
}

// Helper: Limit cache size
async function limitCacheSize(cache, maxEntries) {
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Helper: Get offline fallback
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // Return cached page for navigation requests
  if (request.mode === 'navigate') {
    const cache = await caches.open(STATIC_CACHE_NAME);
    return await cache.match('/') || new Response('Offline', { status: 503 });
  }
  
  // Return placeholder for images
  if (request.destination === 'image') {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#f3f4f6"/>
        <text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="#6b7280" font-family="Arial" font-size="14">
          Image Unavailable
        </text>
      </svg>`,
      {
        headers: {
          'Content-Type': 'image/svg+xml'
        }
      }
    );
  }
  
  throw new Error('Resource not available offline');
}

// Background sync for forms
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    const formDataStore = await getStoredFormData();
    
    for (const formData of formDataStore) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData.data)
        });
        
        if (response.ok) {
          await removeStoredFormData(formData.id);
          
          // Notify client of successful sync
          const clients = await self.clients.matchAll();
          clients.forEach(client => {
            client.postMessage({
              type: 'FORM_SYNCED',
              message: 'Form submitted successfully'
            });
          });
        }
      } catch (error) {
        console.error('Background sync failed for form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

// Push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New notification from Rolex Batteries',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false,
    vibrate: data.vibrate || [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Rolex Batteries', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      // Check if there's already a window open
      for (const client of clients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

// Helper functions for IndexedDB (form data storage)
async function getStoredFormData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('RolexBatteriesDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['formData'], 'readonly');
      const store = transaction.objectStore('formData');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('formData')) {
        db.createObjectStore('formData', { keyPath: 'id' });
      }
    };
  });
}

async function removeStoredFormData(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('RolexBatteriesDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['formData'], 'readwrite');
      const store = transaction.objectStore('formData');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    console.log('Performance metrics received:', event.data.metrics);
    
    // Could send to analytics service here
    // analytics.track('core-web-vitals', event.data.metrics);
  }
});

console.log('Service Worker: Script loaded successfully');
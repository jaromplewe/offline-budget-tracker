console.log('sw hit')
const CACHE_NAME = 'budgetTracker-v1';

const FILES_TO_CACHE = [
    '/',
    '/styles.css',
    '/manifest.webmanifest',
    '/index.js',
    '/index.html',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png'
]


self.addEventListener('install', (event) => {
    console.log('hit install');

    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
            .catch(err => console.log('error caching files: ', err))
    );

    self.skipWaiting();
});




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

self.addEventListener('activate', (event) => {
    console.log('hit activation')

    event.waitUntil(
        caches
            .keys()
            .then(keyList => {
                return Promise.all(
                    keyList.map(key => {
                        if (key !== CACHE_NAME && key !== DATA_CACHE) {
                            console.group('deleting cache: ', key);
                            return caches.delete(key);
                        }
                    })
                )
            })
            .catch(err => console.log('activation error: ', err))
    )

    self.clients.claim();

});


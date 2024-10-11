self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/start_url.html',
                'scripts/Common.js',
                'scripts/jquery.md5.js',
                'scripts/jquery-3.7.0.min.js',
                'scripts/layui.js',
                'styles/code.css',
                'styles/index.css',
                'styles/install.css',
                'styles/laydate.css',
                'styles/layer.css',
                'styles/layui.css',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

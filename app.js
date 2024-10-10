let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const pwaPromptStatus = localStorage.getItem('pwaInstallPromptShown');

    if (pwaPromptStatus === null || pwaPromptStatus === 'false') {

        const installButton = document.getElementById('installButton');
        installButton.style.display = 'none';

        const loadingDialog = document.getElementById('loadingDialog');
        loadingDialog.style.display = 'block';

        setTimeout(() => {
            loadingDialog.style.display = 'none';
            const installButton = document.getElementById('installButton');
            installButton.style.display = 'block';
        }, 5000);
    }


});

document.getElementById('installButton').addEventListener('click', () => {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        localStorage.setItem('pwaInstallPromptShown', 'true');
        deferredPrompt = null;
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => {
            console.log('Service Worker registered');
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

window.addEventListener('beforeunload', (event) => {
    localStorage.setItem('pwaInstallPromptShown', 'false');
});

const getAppButton = document.getElementById('getAppButton');
const loadingDialog = document.getElementById('loadingDialog');
const dialog = document.getElementById('dialog');
const overlay = document.getElementById('overlay');
const installButton = document.getElementById('installButton');
const dialogInstallButton = document.getElementById('dialogInstallButton');


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt')

    e.preventDefault();
    deferredPrompt = e;

    // const pwaPromptStatus = localStorage.getItem('pwaInstallPromptShown');
    //
    // if (pwaPromptStatus === null || pwaPromptStatus === 'false') {
    //
    //     getAppButton.style.display = 'none';
    //     installButton.style.display = 'none';
    //     loadingDialog.style.display = 'block';
    //
    //     setTimeout(() => {
    //         loadingDialog.style.display = 'none';
    //         installButton.style.display = 'block';
    //     }, 5000);
    // }


});

installButton.addEventListener('click', () => {
    if (deferredPrompt === undefined || deferredPrompt === null) {

        installButton.style.display = 'none';
        dialog.style.display = 'block';
        overlay.style.display = 'block';

        setTimeout(() => {
            const isInstallDialogVisible = window.getComputedStyle(dialog).display !== 'none';
            if (isInstallDialogVisible) {
                dialogInstallButton.style.display = 'block';
            }
        }, 3000);

        return;
    }

    showInstallPromt();
});

function showInstallPromt() {
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
}

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

getAppButton.addEventListener('click', () => {
    getAppButton.style.display = 'none';
    loadingDialog.style.display = 'block';

    setTimeout(() => {
        if (deferredPrompt === undefined || deferredPrompt === null) {
            loadingDialog.style.display = 'none';
            installButton.style.display = 'block';
        }
    }, 3000);
});

dialogInstallButton.addEventListener('click', () => {
    dialog.style.display = 'none';
    overlay.style.display = 'none';

    showInstallPromt();
});

overlay.addEventListener('click', () => {
    dialog.style.display = 'none';
    overlay.style.display = 'none';
});

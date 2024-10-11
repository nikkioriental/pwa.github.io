const getAppButton = document.getElementById('getAppButton');
const loadingDialog = document.getElementById('loadingDialog');
const dialog = document.getElementById('dialog');
const overlay = document.getElementById('overlay');
const installButton = document.getElementById('installButton');
const dialogInstallButton = document.getElementById('dialogInstallButton');
const dialogInstallSpinner = document.getElementById('dialogInstallSpinner');


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt')

    e.preventDefault();
    deferredPrompt = e;
});

installButton.addEventListener('click', () => {
    if (isPromtNotReady()) {

        installButton.style.display = 'none';
        dialog.style.display = 'block';
        overlay.style.display = 'block';

        setTimeout(() => {
            const isInstallDialogVisible = window.getComputedStyle(dialog).display !== 'none';
            if (isInstallDialogVisible) {
                dialogInstallSpinner.style.display = 'none';
                dialogInstallButton.style.display = 'block';
            }
        }, 5000);

        return;
    }

    showInstallPromt();
});

function isPromtNotReady() {
    return deferredPrompt === undefined || deferredPrompt === null
}

function showInstallPromt() {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        installButton.style.display = 'block';
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

getAppButton.addEventListener('click', () => {
    if (isPromtNotReady()) {
        getAppButton.style.display = 'none';
        loadingDialog.style.display = 'block';

        setTimeout(() => {
            if (deferredPrompt === undefined || deferredPrompt === null) {
                loadingDialog.style.display = 'none';
                installButton.style.display = 'block';
            }
        }, 3000);
    } else {
        getAppButton.style.display = 'none';
        installButton.style.display = 'block';
    }

});

dialogInstallButton.addEventListener('click', () => {
    dialog.style.display = 'none';
    overlay.style.display = 'none';

    showInstallPromt();
});

(() => {
  const installButton = document.getElementById('install-button');
  const installContainer = document.getElementById('install-container');
  const iosTip = document.getElementById('ios-install-tip');
  let deferredPrompt = null;

  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  if (isStandalone) {
    installContainer?.setAttribute('hidden', '');
    return;
  }

  if (isIOS) {
    iosTip?.removeAttribute('hidden');
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installContainer?.removeAttribute('hidden');
    iosTip?.setAttribute('hidden', '');
  });

  installButton?.addEventListener('click', async () => {
    if (!deferredPrompt) {
      installButton.setAttribute('disabled', 'true');
      installButton.textContent = 'التطبيق مثبت أو غير مدعوم';
      return;
    }

    installButton.setAttribute('disabled', 'true');
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        installButton.textContent = 'جاري التثبيت…';
      } else {
        installButton.textContent = 'حاول مرة أخرى';
        installButton.removeAttribute('disabled');
      }
    } catch (error) {
      console.error('فشل عرض نافذة التثبيت:', error);
      installButton.textContent = 'حدث خطأ، حاول لاحقًا';
    } finally {
      deferredPrompt = null;
    }
  });

  window.addEventListener('appinstalled', () => {
    installButton?.setAttribute('disabled', 'true');
    installButton.textContent = 'تم التثبيت بنجاح';
    iosTip?.setAttribute('hidden', '');
  });
})();

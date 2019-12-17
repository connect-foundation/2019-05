let serviceWorkerRegistCnt = 0;

const register = async () => {
  const isPossibleBrowser =
    process.browser && 'serviceWorker' in navigator && 'PushManager' in window;
  if (!isPossibleBrowser) {
    return;
  }
  try {
    await navigator.serviceWorker.register('/serviceWorker.js');
    serviceWorkerRegistCnt = 0;
  } catch (error) {
    if (serviceWorkerRegistCnt >= 5) {
      return;
    }
    serviceWorkerRegistCnt += 1;
    register();
  }
};

const unregister = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    return;
  }
  await registration.unregister();
};

const updater = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    return;
  }
  await registration.update();
};

const isExistRegistration = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    return true;
  }
  return false;
};

export { register, unregister, updater, isExistRegistration };

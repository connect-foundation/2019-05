import axios from 'axios';

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default async () => {
  const isPossibleBrowser =
    process.browser && 'serviceWorker' in navigator && 'PushManager' in window;
  if (!isPossibleBrowser) {
    return;
  }
  try {
    await navigator.serviceWorker.register('/serviceWorker.js');
    await navigator.serviceWorker.ready
      .then((registration) => {
        return registration.pushManager
          .getSubscription()
          .then(async (subscribe) => {
            if (subscribe) {
              return subscribe;
            }
            const response = await axios(
              `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/vapidPublicKey`
            );
            const vapidPublicKey = response.data.publicKey;
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            });
          });
      })
      .then(async (subscription) => {
        await axios(
          `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/register`,
          {
            method: 'post',
            headers: {
              'Content-type': 'application/json',
            },
            data: JSON.stringify({
              subscription,
            }),
          }
        );
        const sub = await axios(
          `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/subscription`
        );
        console.log(sub);
        document.querySelector('.push').addEventListener('click', async () => {
          await axios(
            `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/sendNotification`,
            {
              method: 'post',
              headers: {
                'Content-type': 'application/json',
              },
              data: JSON.stringify({
                subscription: sub.data.subscription,
              }),
            }
          );
        });
      });
  } catch (error) {
    console.log(error);
  }
};

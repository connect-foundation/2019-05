import axios from 'axios';
import actions from './Actions';

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

const settingSubscription = async () => {
  const serviceWorker = await navigator.serviceWorker.getRegistrations();
  if (!serviceWorker) return;
  const subscription = await navigator.serviceWorker.ready.then(
    (registration) => {
      return registration.pushManager
        .getSubscription()
        .then(async (subscribe) => {
          if (subscribe) {
            return subscribe;
          }
          const response = await axios(
            `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/vapidPublicKey`
          );
          const vapidPublicKey = response.data.publickKey;
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        });
    }
  );
  // eslint-disable-next-line consistent-return
  return subscription;
};

const Reducer = (state, action) => {
  /* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
  switch (action.type) {
    case actions.LOGIN: {
      return {
        ...state,
        playerId: action.payload.playerId,
        playerTeam: action.payload.playerTeam,
        subscription: action.payload.subscription,
      };
    }
    case actions.LOGOUT:
      return { ...state, playerId: null, playerTeam: null, subscription: null };
    default:
      throw new Error('Unhandled action!');
  }
};

export default Reducer;

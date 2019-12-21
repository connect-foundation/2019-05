import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import { UserContext, UserActionCreator } from '../../contexts/User';
import urlBase64ToUint8Array from '../../util/convertBase64';
import { updatePlayerInfo } from '../../util/functions';
import { get, post, cookie } from '../../util/requestOptionCreator';

const REGIST_SUBSCRIPTION_REQUEST_URL = `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/registSubscription`;
const GET_VAPID_PUBLIC_KEY_REQUEST_URL = `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/vapidPublicKey`;
const AUTHENTICATE_USER_REQUEST_URL = `${process.env.REACT_APP_API_SERVER_ADDRESS}/user`;

const authenticateUser = async (token) => {
  if (!token) return null;
  const response = await axios(cookie(AUTHENTICATE_USER_REQUEST_URL, token));
  return response.data.userInfo.playerId;
};

const getVapidPublicKey = async () => {
  // eslint-disable-next-line no-return-await
  return await axios(get(GET_VAPID_PUBLIC_KEY_REQUEST_URL));
};

const setLoginUserSubscription = async (userId, subscription) => {
  // eslint-disable-next-line no-return-await
  return await axios(
    post(REGIST_SUBSCRIPTION_REQUEST_URL, { userId, subscription })
  );
};

const settingSubscription = async (userId) => {
  if (!userId) return null;
  const registration = await navigator.serviceWorker.ready;
  const response = await getVapidPublicKey();
  const vapidPublicKey = response.data.publicKey;
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  const subscription = await registration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    })
    .catch((err) => {
      console.log(err);
    });
  await setLoginUserSubscription(userId, subscription);
  return subscription;
};

const removeSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;
  const pre = await registration.pushManager.getSubscription();
  if (pre) {
    await pre.unsubscribe();
  }
};

// eslint-disable-next-line react/prop-types
const Auth = ({ children }) => {
  const [cookies] = useCookies();
  const { userState, userDispatch } = useContext(UserContext);

  const [loginState] = useAsync(authenticateUser.bind(null, cookies.jwt), []);
  const { data: playerId, error: loginError } = loginState;
  const [playerInfoState] = useAsync(updatePlayerInfo.bind(null, playerId), [
    playerId,
  ]);
  const { data: playerInfo } = playerInfoState;

  const [subscriptionState] = useAsync(
    settingSubscription.bind(null, playerId),
    [playerId]
  );
  const { data: playerSubscription } = subscriptionState;

  useEffect(() => {
    if (!playerInfo) {
      removeSubscription();
      userDispatch(UserActionCreator.logout());
      return;
    }
    userDispatch(UserActionCreator.login(playerInfo, playerSubscription));
  }, [playerSubscription]);

  if (cookies.jwt) {
    // 쿠키가 있지만, 변조되었을때
    if (loginError) {
      return <div>{children}</div>;
    }
    // 쿠키가 있지만, 완료되지 않았을때,
    if (!userState.subscription) {
      return null;
    }
  }
  return <div>{children}</div>;
};

export default Auth;

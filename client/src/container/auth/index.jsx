import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import useAsync from '../../hooks/useAsync';
import { UserContext, UserActionCreator } from '../../contexts/User';
import urlBase64ToUint8Array from '../../util/convertBase64';
import updatePlayerInfo from '../../util/functions';

const authenticateUser = async (token) => {
  if (!token) return null;
  const response = await axios(
    `${process.env.REACT_APP_API_SERVER_ADDRESS}/user`,
    {
      headers: { Authorization: token },
    }
  );
  return response.data.userInfo.playerId;
};

const getVapidPublicKey = async (userId) => {
  console.log('get key...');
  // eslint-disable-next-line no-return-await
  return await axios(
    `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/vapidPublicKey`,
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify({
        userId,
      }),
    }
  );
};

const setLoginUserSubscription = async (myId, subscription) => {
  console.log('set sub');
  // eslint-disable-next-line no-return-await
  return await axios(
    `${process.env.REACT_APP_API_SERVER_ADDRESS}/notification/registSubscription`,
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify({
        userId: myId,
        subscription,
      }),
    }
  );
};

const settingSubscription = async (userId) => {
  if (!userId) return null;
  console.log('setting!');
  console.log(userId);
  const registration = await navigator.serviceWorker.ready;
  const response = await getVapidPublicKey(userId);
  const vapidPublicKey = response.data.publicKey;
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
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
  const { userDispatch } = useContext(UserContext);

  const [loginState] = useAsync(authenticateUser.bind(null, cookies.jwt), []);
  const { data: playerId } = loginState;
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
    // playerInfo가 없을 경우 로그아웃 상태이다.
    if (!playerInfo) {
      removeSubscription();
      userDispatch(UserActionCreator.logout());
      return;
    }
    userDispatch(UserActionCreator.login(playerInfo, playerSubscription));
  }, [playerInfo, playerSubscription]);

  return <div>{children}</div>;
};

export default Auth;

// components/PushNotification.js

'use client';

import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/firebase/initFirebase';

const PushNotification = () => {
  useEffect(() => {
    // 서비스 워커 등록 및 권한 요청
    const registerServiceWorkerAndRequestPermission = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registration successful:', registration);

          const status = await Notification.requestPermission();
          if (status === 'granted') {
            console.log('Notification permission granted.');

            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
              serviceWorkerRegistration: registration, // 등록한 서비스 워커 전달
            });

            if (currentToken) {
              console.log('Current token:', currentToken);
              // 서버로 토큰을 전송하여 저장합니다.
            } else {
              console.log('No registration token available.');
            }

            onMessage(messaging, (payload) => {
              console.log('Message received. ', payload);
              // 포그라운드 메시지 처리
            });
          } else {
            console.log('Unable to get permission to notify.');
          }
        }
      } catch (error) {
        console.error(
          'An error occurred during service worker registration or permission request:',
          error,
        );
      }
    };

    registerServiceWorkerAndRequestPermission();
  }, []);

  return null;
};

export default PushNotification;

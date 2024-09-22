'use client';

import { useEffect } from 'react';
import { app } from '@/firebase/initFirebase';

const PushNotification = () => {
  useEffect(() => {
    const registerServiceWorkerAndRequestPermission = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registration successful:', registration);

          const status = await Notification.requestPermission();
          if (status === 'granted') {
            console.log('Notification permission granted.');

            // 동적으로 Firebase Messaging 모듈 가져오기
            const { getMessaging, getToken, onMessage } = await import('firebase/messaging');

            const messaging = getMessaging(app);

            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
              serviceWorkerRegistration: registration,
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

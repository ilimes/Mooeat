'use client';

import { useEffect } from 'react';
import { app } from '@/firebase/initFirebase'; // Firebase 초기화 모듈

const PushNotification = () => {
  useEffect(() => {
    const registerServiceWorkerAndRequestPermission = async () => {
      try {
        // 브라우저가 Service Worker를 지원하는지 확인
        if ('serviceWorker' in navigator) {
          // 현재 등록된 모든 서비스 워커 목록을 가져옴
          const registrations = await navigator.serviceWorker.getRegistrations();

          // 이미 등록된 서비스 워커가 없으면 등록 진행
          if (registrations.length === 0) {
            const registration = await navigator.serviceWorker.register(
              '/firebase-messaging-sw.js',
            );
            console.log('Service Worker registration successful:', registration);

            // 푸시 알림 권한 요청
            const status = await Notification.requestPermission();
            if (status === 'granted') {
              console.log('Notification permission granted.');

              // 동적으로 Firebase Messaging 모듈 가져오기
              const { getMessaging, getToken, onMessage } = await import('firebase/messaging');

              const messaging = getMessaging(app); // Firebase 앱 인스턴스에서 메시징 가져오기

              // FCM 토큰 가져오기
              const currentToken = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, // 환경 변수에서 VAPID 키 가져오기
                serviceWorkerRegistration: registration, // 서비스 워커 등록 정보 전달
              });

              if (currentToken) {
                console.log('Current token:', currentToken);
                // 서버로 토큰을 전송하여 저장하는 로직을 여기에 추가
                // 예: await sendTokenToServer(currentToken);
              } else {
                console.log('No registration token available. Request permission to generate one.');
              }

              // 포그라운드에서 메시지를 수신할 때의 처리 로직
              // onMessage(messaging, (payload) => {
              //   console.log('Message received in foreground: ', payload);
              //   // 포그라운드 메시지를 처리하는 로직 추가
              // });
            } else {
              console.log('Unable to get permission to notify.');
            }
          } else {
            console.log('Service Worker is already registered.');
          }
        }
      } catch (error) {
        console.error(
          'An error occurred during service worker registration or permission request:',
          error,
        );
      }
    };

    registerServiceWorkerAndRequestPermission(); // 서비스 워커 등록 및 권한 요청 함수 호출
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않으므로 null 반환
};

export default PushNotification;

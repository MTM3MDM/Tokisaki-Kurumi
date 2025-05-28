import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: {
        send: '전송',
        clear: '대화 지우기',
        placeholder: '메시지를 입력하세요...',
        error: '오류가 발생했습니다',
        loading: '로딩 중...'
      }
    },
    en: {
      translation: {
        send: 'Send',
        clear: 'Clear Chat',
        placeholder: 'Type a message...',
        error: 'An error occurred',
        loading: 'Loading...'
      }
    }
  },
  lng: 'ko',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n; 
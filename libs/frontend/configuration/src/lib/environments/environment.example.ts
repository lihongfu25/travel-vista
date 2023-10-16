export const environment = {
  production: false,
  tokenKey: 'jwt',
  defaultTokenStorage: 'local',
  apiUrl: 'http://localhost:3000/api',
  serverUrl: 'http://localhost:3000',
  requestTimeout: 5000,
  defaultLanguage: 'vi',
  languageLocalStorageKey: 'lang',
  availabelLanguages: ['vi', 'en'],
  firebaseConfig: {
    apiKey: 'API_KEY',
    authDomain: 'AUTH_DOMAIN',
    projectId: 'PROJECT_ID',
    storageBucket: 'STORAGE_BUCKET',
    messagingSenderId: 'MESSAGE_SENDER_ID',
    appId: 'APP_ID',
  },
};

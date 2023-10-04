import { environment } from '../environments/environment';

const getTokenFromStorage = () => {
  return (
    localStorage.getItem(environment.tokenKey) ??
    sessionStorage.getItem(environment.tokenKey)
  );
};

const clearTokenFromStorage = () => {
  localStorage.removeItem(environment.tokenKey);
  sessionStorage.removeItem(environment.tokenKey);
};

const saveTokenToStorage = (token: string) => {
  if (environment.defaultTokenStorage === 'local') {
    localStorage.setItem(environment.tokenKey, token);
  } else {
    sessionStorage.setItem(environment.tokenKey, token);
  }
};

export const getToken = () => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const token = params.get('token') || getTokenFromStorage();
  return token;
};

export const removeToken = () => {
  clearTokenFromStorage();
};

export const setToken = (token: string) => {
  saveTokenToStorage(token);
};

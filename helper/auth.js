import cookie from 'js-cookie';

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
      cookie.set(key, value, {
          expires: 1
      });
  }
};

export const removeCookie = key => {
  if (process.browser) {
      cookie.remove(key, {
          expires: 1
      });
  }
};
// get cookie
export const getCookie = key => {
  if (process.browser) {
      return cookie.get(key);
  }
};
// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
      localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = key => {
  if (process.browser) {
      localStorage.removeItem(key);
  }
};

// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  // next();
};

export const isAuth = () => {
  if (process.browser) {
    if (localStorage.getItem('HM_ON_TECH_ACCESS_TOKEN')) {
        return localStorage.getItem('HM_ON_TECH_ACCESS_TOKEN');
    } else {
        return false;
    }
  }
};

// prettier-ignore
// eslint-disable-next-line no-confusing-arrow
const parseToString = (val) => typeof val === 'object' ? JSON.stringify(val) : val;

const updateLocalStorage = (storageName, storage) => {
  const value = parseToString(storage);
  window.localStorage.setItem(storageName, value);
};

const clearLocalStorage = (storageName) => {
  window.localStorage.removeItem(storageName);
};

const getLocalStorage = (storageName) => window.localStorage.getItem(storageName);

export {
  updateLocalStorage,
  clearLocalStorage,
  getLocalStorage
};

import * as SecureStore from "expo-secure-store";

export const autoLogin = () => {
  return new Promise((resolve, reject) => {
    SecureStore.isAvailableAsync()
      .then((isAvailable) => {
        isAvailable &&
          SecureStore.getItemAsync("tokens")
            .then((tokens) => {
              resolve(JSON.parse(tokens));
            })
            .catch(reject);
      })
      .catch(reject);
  });
};

export const rememberUser = (tokens) => {
  return new Promise((resolve, reject) => {
    SecureStore.isAvailableAsync().then((isAvailable) => {
      isAvailable &&
        SecureStore.setItemAsync("tokens", JSON.stringify(tokens))
          .then(resolve)
          .catch(reject);
    });
  });
};

export const forgetUser = () => {
  return new Promise((resolve, reject) => {
    SecureStore.isAvailableAsync().then((isAvailable) => {
      isAvailable &&
        SecureStore.deleteItemAsync("tokens").then(resolve).catch(reject);
    });
  });
};

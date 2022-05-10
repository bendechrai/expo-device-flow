import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { startDeviceFlow, pollForTokens, cancelTokenPoll } from "./auth0-helpers";

import { autoLogin, forgetUser, rememberUser } from "./login-helpers";

let Auth0 = createContext();

function Auth0Provider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    autoLogin()
      .then((tokens) => {
        setTokens(tokens);
        if (jwt_decode(tokens.id_token)) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async () => {
    // Ask IdP for a new Device Flow auth, which returns the device data for polling
    const deviceData = await startDeviceFlow();
    if (deviceData) {
      setLoginData({
        user_code: deviceData.user_code,
        verification_uri: deviceData.verification_uri,
        verification_uri_complete: deviceData.verification_uri_complete,
      });

      setIsPolling(true);
      pollForTokens(deviceData)
        .then((tokens) => {
          setTokens(tokens);
          if (jwt_decode(tokens.id_token)) {
            setIsAuthenticated(true);
            rememberUser(tokens);
          }
          setIsPolling(false);
        })
        .catch((e) => {
          setIsPolling(false);
        });
    }
  };

  const getUser = () => {
    if (tokens && tokens.id_token) {
      return jwt_decode(tokens.id_token);
    }
    return null;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsPolling(false);
    cancelTokenPoll();
    forgetUser();
  };

  let value = {
    isLoading,
    isAuthenticated,
    isPolling,
    loginData,
    login,
    logout,
    getUser,
  };
  return <Auth0.Provider value={value}>{children}</Auth0.Provider>;
}

let Auth0Consumer = Auth0.Consumer;

export { Auth0, Auth0Provider, Auth0Consumer };

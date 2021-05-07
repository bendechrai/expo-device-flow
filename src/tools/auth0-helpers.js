import React, { createContext, useEffect, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

let pollTimer = null;

/**
 * Starts a Device Flow auth
 */
export const startDeviceFlow = () => {
  return new Promise((resolve, reject) => {
    fetch("https://bendechrai-demos.au.auth0.com/oauth/device/code", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: "Lr1wti77WyrfcQRvIt5zDAQGeRJNmgQq",
        scope: "openid profile",
      }),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

/**
 * Keeps polling the IdP based on Device Data until a token or error is returned
 */
export const pollForTokens = (deviceData) => {
  cancelTokenPoll();
  return new Promise((resolve, reject) => {
    if (deviceData === null) reject("Invalid device data");

    // Try to get tokens from Auth0
    fetch("https://bendechrai-demos.au.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        device_code: deviceData.device_code,
        client_id: "Lr1wti77WyrfcQRvIt5zDAQGeRJNmgQq",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.info(json);
        // If we have a token, return the whole JSON payload
        if (json.id_token) {
          resolve(json);
        }

        // So, no token? What to do?
        let delay = deviceData.interval * 1000;
        switch (json.error) {
          case "slow_down":
            delay *= 2;
          case "authorization_pending":
            pollTimer = setTimeout(() => {
              pollForTokens(deviceData).then(resolve).catch(reject);
            }, delay);
            break;
          case "expired_token":
            reject("Login timed out. Please try again.");
            break;
          case "access_denied":
            reject(
              "This device isn't authorised for that account. Please try again or contact your service provider."
            );
            break;
          case "invalid_grant":
            reject("An unspecified error occured.");
            break;
          default:
            reject("Not sure what to do with " + JSON.stringify(json));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Cancels an active pollForTokens() timer
 */
export const cancelTokenPoll = () => {
  clearTimeout(pollTimer);
  pollTimer = null;
};

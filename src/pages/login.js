import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg";

// import { getDeviceData, cancelTokenPoll, getIdToken } from "../tools/auth";
import { Auth0 } from "../tools/auth0-provider";

import { styles } from "../styles";

export default LoginPrompt = () => {
  let { isPolling, loginData, login, logout } = useContext(Auth0);

  return (
    <>
      <Text style={styles.header}>
        Welcome to your new Internet Enabled Fridge
      </Text>
      {!isPolling && (
        <>
          <Button style={styles.button} title="Start" onPress={login}>
            <Text style={styles.buttonText}>Start</Text>
          </Button>
        </>
      )}
      {isPolling && loginData && (
        <View style={styles.deviceCode}>
          <View style={styles.deviceCodePane}>
            <Text>
              To complete the login process, go to the following URL on your
              smartphone or computer
            </Text>
            <Text style={styles.highlight}>{loginData.verification_uri}</Text>
            <Text>The user code you'll be asked for is:</Text>
            <Text style={styles.highlight}>{loginData.user_code}</Text>
          </View>
          <View style={styles.deviceCodePane}>
            <Text>This can also be done by scanning this QR Code:</Text>
            <QRCode value={loginData.verification_uri_complete} size={300} />
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </>
  );
};

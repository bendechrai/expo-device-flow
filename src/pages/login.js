import React, { useContext } from "react";
import { Text, View, Button, ImageBackground, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg";

import { Auth0 } from "../tools/auth0-provider";

import { styles } from "../styles";

import fridge from "../../assets/fridge.jpg";

const LoginPrompt = () => {
  let { isPolling, loginData, login } = useContext(Auth0);

  return (
    <>
      <View style={{ width: "100%", height: "100%" }}>
        {!isPolling && (
          <ImageBackground source={require("../../assets/fridge.jpg")} style={{ width: "100%", height: "100%" }}>
            <View style={{ width: "30%", height: "40%", left: "62%", top: "15%" }}>
              <Text style={styles.header}>Welcome to your new Internet Enabled Fridge</Text>
              <>
                <Button style={styles.button} title="Start" onPress={login}>
                  <Text style={styles.buttonText}>Start</Text>
                </Button>
              </>
            </View>
          </ImageBackground>
        )}
        {isPolling && loginData && (
          <ImageBackground source={require("../../assets/fridge-zoomed.jpg")} style={{ width: "100%", height: "100%" }}>
            <View style={{ width: 250, height: "40%", left: 87, top: "0%" }}>
              <View style={styles.deviceCode}>
                <View style={styles.deviceCodePane}>
                  <Text style={styles.header}>Welcome to your new Internet Enabled Fridge</Text>
                  <Text>To complete the login process, go to the following URL on your smartphone or computer</Text>
                  <Text style={styles.highlight}>{loginData.verification_uri}</Text>
                  <Text>The user code you'll be asked for is:</Text>
                  <Text style={styles.highlight}>{loginData.user_code}</Text>
                </View>
                <View style={styles.deviceCodePane}>
                  <Text style={{ marginBottom: 20 }}>This can also be done by scanning this QR Code:</Text>
                  <QRCode value={loginData.verification_uri_complete} size={250} />
                </View>
              </View>
            </View>
          </ImageBackground>
        )}
        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default LoginPrompt;

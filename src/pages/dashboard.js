import React, { useContext } from "react";
import { Button, Image, Text, View, ImageBackground } from "react-native";

import { styles } from "../styles";
import { CamelCaseWithSpaces } from "../tools/stringHelper";

import { Auth0 } from "../tools/auth0-provider";

const Dashboard = () => {
  let { logout, getUser } = useContext(Auth0);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>
        <ImageBackground source={require("../../assets/fridge-zoomed.jpg")} style={{ width: "100%", height: "100%" }}>
          <View style={{ width: 230, height: "40%", left: 96, top: "10%" }}>
            {getUser() && (
              <>
                <Text style={styles.header}>Welcome to your new Internet Enabled Fridge</Text>
                <Text style={{ textAlign: "center", fontSize: 22, marginTop: 50, height: 100, textAlignVertical: "bottom" }}>
                  Hello {CamelCaseWithSpaces(getUser().nickname)}!
                </Text>
                <Image source={{ uri: getUser().picture }} style={{ width: 200, height: 200, left: 15, marginBottom: 125 }} />
                <Button style={styles.button} title="Logout" onPress={logout}>
                  <Text style={styles.buttonText}>Logout</Text>
                </Button>
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Dashboard;

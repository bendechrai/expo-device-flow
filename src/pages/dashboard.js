import React, { useContext } from "react";
import { Button, Image, Text, View } from "react-native";

import { styles } from "../styles";
import { CamelCaseWithSpaces } from "../tools/stringHelper";

import { Auth0 } from "../tools/auth0-provider";

const Dashboard = () => {
  let { logout, getUser } = useContext(Auth0);

  return (
    <View style={styles.container}>
      {getUser() && (
        <>
          <Text style={styles.header}>Hello {CamelCaseWithSpaces(getUser().nickname)}!</Text>
          <Image source={{ uri: getUser().picture }} style={{ width: 200, height: 200 }} />
          <Button style={styles.button} title="Logout" onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default Dashboard;

import React, { useContext } from "react";
import { SafeAreaView, Text } from "react-native";

import LoginPrompt from "./pages/login";
import Dashboard from "./pages/dashboard";

import { styles } from "./styles";

import { Auth0 } from "./tools/auth0-provider";

export default function Main() {
  const { isLoading, isAuthenticated } = useContext(Auth0);

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && (
        <>
          {!isAuthenticated && <LoginPrompt />}
          {isAuthenticated && <Dashboard />}
        </>
      )}
    </SafeAreaView>
  );
}

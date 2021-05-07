import React from "react";
import Main from "./src/main";

import { Auth0Provider } from "./src/tools/auth0-provider";

export default function App() {
  return (
    <Auth0Provider>
      <Main></Main>
    </Auth0Provider>
  );
}

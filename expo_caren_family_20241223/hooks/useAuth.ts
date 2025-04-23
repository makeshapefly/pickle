import React from "react";

import { AuthContext } from "../AuthContext";

export default () => {
  const {
    isInitialized,
    isSignedIn,
    isIntro,
    signIn,
    signOut,
  } = React.useContext(AuthContext);
  return { isInitialized, isSignedIn, isIntro, signIn, signOut };
};

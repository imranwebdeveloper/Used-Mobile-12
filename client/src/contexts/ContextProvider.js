import React from "react";
import AuthContextProvider from "./AuthContextProvider";

const ContextProvider = ({ children }) => {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
    </>
  );
};

export default ContextProvider;

import { createContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.config";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const options = {
      headers: {
        authorization: `bearer ${localStorage.getItem("usedMobileToken")}`,
      },
    };
    setLoading(true);
    fetch("https://server-imranwebdeveloper.vercel.app/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, [setUser]);

  const googleAuthHandler = () => {
    return signInWithPopup(auth, provider);
  };

  const authValue = { user, setUser, googleAuthHandler, loading, setLoading };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

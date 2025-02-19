import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken != null) {
      setUserToken(userToken);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        setUserToken,
        userToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

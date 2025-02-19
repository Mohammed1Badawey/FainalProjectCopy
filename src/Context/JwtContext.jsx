import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authContext } from './AuthContext';

export const JwtContext = createContext();
export default function JwtContextProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const { userToken } = useContext(authContext);

  function tokenDetails() {
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      setUserId(id);
    }
  }

  useEffect(() => {
    tokenDetails();
  }, [userToken]);

  return (
    <JwtContext.Provider
      value={{
        userName,
        userId,
        setUserName,
      }}
    >
      {children}
    </JwtContext.Provider>
  );
}

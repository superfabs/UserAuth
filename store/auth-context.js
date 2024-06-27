//npx expo install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState} from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {},
  });
  
  function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
  
    function authenticate(token) {
      setAuthToken(token);
      AsyncStorage.setItem('token', token); //first token is the key, second token is the value
    }
  
    function logout() {
      setAuthToken(null);
      AsyncStorage.removeItem('token'); //remove the token from the storage after logout
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken, //the !! will convert the value to a boolean, if the token is null, it will return false
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export default AuthContextProvider;


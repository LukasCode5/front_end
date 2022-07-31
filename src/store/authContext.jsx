import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isUserLoggedIn: false,
  token: '',
  userEmail: '',
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const isUserLoggedIn = !token ? false : true;

  const [userEmail, setUserEmail] = useState(null);

  function login(userToken, userEmail) {
    setToken(userToken);
    localStorage.setItem('userToken', userToken);
    setUserEmail(userEmail);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('userToken');
    setUserEmail(null);
  }

  const ctx = {
    isUserLoggedIn,
    token,
    login,
    logout,
    userEmail,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}

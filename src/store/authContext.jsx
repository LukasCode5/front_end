import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../utils';

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isUserLoggedIn: false,
  token: '',
  userEmail: '',
  handleUserId: () => {},
  userId: '',
  goToQuestion: () => {},
  updateQuestion: () => {},
  addAnswer: () => {},
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const isUserLoggedIn = !token ? false : true;

  const [userEmail, setUserEmail] = useState(null);

  const [userId, setUserId] = useState(localStorage.getItem('userId'));

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

  function handleUserId(userId) {
    localStorage.setItem('userId', userId);
    setUserId(userId);
  }

  function goToQuestion(questionId) {
    history.push(`/question/${questionId}`);
  }

  function updateQuestion(questionId) {
    history.replace(`/update/question/${questionId}`);
  }

  function addAnswer(questionId) {
    history.push(`/add/answer/question/${questionId}`);
  }

  const ctx = {
    isUserLoggedIn,
    token,
    login,
    logout,
    userEmail,
    handleUserId,
    userId,
    goToQuestion,
    updateQuestion,
    addAnswer,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}

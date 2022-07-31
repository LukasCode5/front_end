import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddAnswer from './pages/AddAnswer';
import AddQuestion from './pages/AddQuestion';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UpdateAnswer from './pages/UpdateAnswer';
import UpdateQuestion from './pages/UpdateQuestion';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <ProtectedRoute exact path={'/add/question'}>
          <AddQuestion />
        </ProtectedRoute>
        <ProtectedRoute exact path={'/add/answer'}>
          <AddAnswer />
        </ProtectedRoute>
        <Route exact path={'/register'}>
          <RegisterPage />
        </Route>
        <Route exact path={'/login'}>
          <LoginPage />
        </Route>
        <Route exact path={'/'}>
          <HomePage />
        </Route>
        <ProtectedRoute exact path={'/update/answer/:answerId'}>
          <UpdateAnswer />
        </ProtectedRoute>
        <ProtectedRoute exact path={'/update/question/:questionId'}>
          <UpdateQuestion />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

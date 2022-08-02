import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddAnswerPage from './pages/AddAnswerPage';
import AddQuestionPage from './pages/AddQuestionPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QuestionPage from './pages/QuestionPage';
import RegisterPage from './pages/RegisterPage';
import UpdateAnswerPage from './pages/UpdateAnswerPage';
import UpdateQuestionPage from './pages/UpdateQuestionPage';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <ProtectedRoute exact path={'/add/question'}>
          <AddQuestionPage />
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

        <Route exact path={'/question/:questionId'}>
          <QuestionPage />
        </Route>

        <ProtectedRoute exact path={'/add/answer/question/:questionId'}>
          <AddAnswerPage />
        </ProtectedRoute>

        <ProtectedRoute exact path={'/update/answer/:answerId/question/:questionId'}>
          <UpdateAnswerPage />
        </ProtectedRoute>

        <ProtectedRoute exact path={'/update/question/:questionId'}>
          <UpdateQuestionPage />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

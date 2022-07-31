import { Route } from 'react-router';
import { useAuthCtx } from '../../store/authContext';
import LoginForm from '../LoginForm/LoginForm';

function ProtectedRoute(props) {
  const ctx = useAuthCtx();
  const { children, ...rest } = props;
  return (
    <Route {...rest}>{ctx.isUserLoggedIn ? props.children : <LoginForm routeProtection />}</Route>
  );
}

export default ProtectedRoute;

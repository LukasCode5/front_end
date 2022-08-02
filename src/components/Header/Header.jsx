import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Container from '../UI/Container/Container';
import css from './Header.module.css';
import logo from '../../assets/img/logo.png';

function Header() {
  const ctx = useAuthCtx();

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerGroup}>
          <img className={css.logo} src={logo} alt='logo' />
          <nav className={css.navigation}>
            {ctx.userEmail && (
              <a className={css.userEmail} disabled href='/'>
                Sveiki, {ctx.userEmail}
              </a>
            )}
            <NavLink className={css.navLink} exact to={'/'}>
              Home
            </NavLink>
            {!ctx.isUserLoggedIn && (
              <>
                <NavLink className={css.navLink} to={'/login'}>
                  Login
                </NavLink>
                <NavLink className={css.navLink} to={'/register'}>
                  Register
                </NavLink>
              </>
            )}
            {ctx.isUserLoggedIn && (
              <>
                <NavLink className={css.navLink} to={'/add/question'}>
                  Add Question
                </NavLink>
                <NavLink onClick={ctx.logout} className={css.navLink} to={'/login'}>
                  Logout
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;

import { useFormik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import Notification from '../Notification/Notification';
import css from './LoginForm.module.css';
import Container from '../UI/Container/Container';

const initValues = {
  email: '',
  password: '',
};

function LoginForm({ routeProtection }) {
  const history = useHistory();
  const ctx = useAuthCtx();

  const [backErrors, setBackErrors] = useState('');
  const [successLogin, setSuccessLogin] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Check your email').required('Field required'),
      password: Yup.string()
        .min(5, 'Must be at least 5 characters long')
        .max(20, 'Can"t be longer than 20 characters')
        .required('Required field'),
    }),
    onSubmit: async (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      const loginResult = await myFetch(`${baseUrl}/users/login`, 'POST', user);
      console.log('registerResult ===', loginResult);
      if (loginResult.status === 400) {
        setSuccessLogin('');
        setBackErrors('Incorrect Email or Password');
        setShowNotification(true);
        return;
      }
      if (loginResult.status === 500) {
        setSuccessLogin('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }

      if (!loginResult.data.token) {
        setSuccessLogin('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }
      const userEmail = values.email;
      if (routeProtection) {
        setTimeout(() => ctx.login(loginResult.data.token, userEmail), 3000);
      } else {
        ctx.login(loginResult.data.token, userEmail);
      }
      values.email = '';
      values.password = '';
      setBackErrors('');
      setSuccessLogin('Login successful');
      setShowNotification(true);
      if (routeProtection) {
        return;
      }
      setTimeout(() => history.replace('/'), 3000);
    },
  });

  function rightClassesForInput(field) {
    let resultClasses = '';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? 'errorInput' : 'successInput';
    }
    return resultClasses;
  }
  function rightClassesForErrorMessage(field) {
    let resultClasses = '';
    if (formik.touched[field]) {
      resultClasses += formik.errors[field] ? 'errorMessage' : 'successMessage';
    }
    return resultClasses;
  }

  function handleHideNotification() {
    setShowNotification(false);
  }

  return (
    <div className={css.formWrapper}>
      <Container>
        <div className={css.formGroup}>
          <form onSubmit={formik.handleSubmit} className={css.form}>
            {showNotification && backErrors && (
              <Notification onClick={handleHideNotification} message={backErrors} error />
            )}
            {showNotification && successLogin && (
              <Notification onClick={handleHideNotification} message={successLogin} />
            )}
            {routeProtection && (
              <h2 className={css.usersOnly}>This Page is for logged in users only</h2>
            )}
            <h1>Login</h1>
            <div className={css.inputGroup}>
              <label htmlFor='email'>Email</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type='email'
                className={`${css.input} ${css[rightClassesForInput('email')]}`}
                name='email'
                placeholder='Enter email here...'
              />

              {formik.touched.email && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('email')]}`}>
                  {formik.errors.email ? formik.errors.email : 'Looks good'}
                </p>
              )}
            </div>

            <div className={css.inputGroup}>
              <label htmlFor='password'>Password</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type='password'
                className={`${css.input} ${css[rightClassesForInput('password')]}`}
                name='password'
                placeholder='Enter password here...'
              />
              {formik.touched.password && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('password')]}`}>
                  {formik.errors.password ? formik.errors.password : 'Looks good'}
                </p>
              )}
            </div>
            <button type='submit' className={css.buttonSubmit}>
              Login
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default LoginForm;

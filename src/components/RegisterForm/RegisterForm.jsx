import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import Notification from '../Notification/Notification';
import css from './RegisterForm.module.css';
import Container from '../UI/Container/Container';

const initValues = {
  email: '',
  password: '',
  repeat_password: '',
};

function RegisterForm() {
  const [backErrors, setBackErrors] = useState('');
  const [successRegister, setSuccessRegister] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Check your email').required('Field Required'),
      password: Yup.string()
        .min(5, 'Must be at least 5 characters long')
        .max(20, 'Can"t be longer than 20 characters')
        .required('Field Required'),
      repeat_password: Yup.string()
        .min(5, 'Must be at least 5 characters long')
        .max(20, 'Can"t be longer than 20 characters')
        .required('Field Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      const newUser = {
        email: values.email,
        password: values.password,
      };
      const registerResult = await myFetch(`${baseUrl}/users/register`, 'POST', newUser);
      console.log('registerResult ===', registerResult);
      if (registerResult.status === 400) {
        setSuccessRegister('');
        if (registerResult.data.message) {
          setBackErrors(registerResult.data.message);
        } else {
          setBackErrors('Check your input fields');
        }
        setShowNotification(true);
        return;
      }
      if (registerResult.status === 500 || registerResult.status === 404) {
        setSuccessRegister('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }
      values.email = '';
      values.password = '';
      values.repeat_password = '';
      setBackErrors('');
      setSuccessRegister('User successfully registered');
      setShowNotification(true);
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
            {showNotification && successRegister && (
              <Notification onClick={handleHideNotification} message={successRegister} />
            )}
            <h1>Registration</h1>
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
                <p
                  className={`${css.message} ${
                    css[rightClassesForErrorMessage('email').toString()]
                  }`}
                >
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
            <div className={css.inputGroup}>
              <label htmlFor='repeat_password'>Repeat password</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeat_password}
                type='password'
                className={`${css.input} ${css[rightClassesForInput('repeat_password')]}`}
                name='repeat_password'
                placeholder='Repeat your password here...'
              />
              {formik.touched.repeat_password && (
                <p
                  className={`${css.message} ${
                    css[rightClassesForErrorMessage('repeat_password')]
                  }`}
                >
                  {formik.errors.repeat_password ? formik.errors.repeat_password : 'Looks good'}
                </p>
              )}
            </div>
            <button type='submit' className={css.buttonSubmit}>
              Register
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default RegisterForm;

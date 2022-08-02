import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetchPostAuth } from '../../utils';
import Notification from '../Notification/Notification';
import css from './AddAnswerForm.module.css';
import Container from '../UI/Container/Container';
import { useHistory } from 'react-router-dom';

const initValues = {
  content: '',
};

function AddAnswerForm({ questionId }) {
  const history = useHistory();
  const ctx = useAuthCtx();
  const userToken = ctx.token;

  const [backErrors, setBackErrors] = useState('');
  const [successAdd, setSuccessAdd] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      content: Yup.string()
        .min(5, 'Must be at least 5 characters long')
        .max(600, 'Can"t be longer than 600 characters')
        .required('Field required'),
    }),
    onSubmit: async (values) => {
      const newAnswer = {
        content: values.content,
      };
      const addAnswerResult = await myFetchPostAuth(
        `${baseUrl}/questions/${questionId}/answers`,
        userToken,
        newAnswer
      );
      // console.log('addAnswerResult ===', addAnswerResult);

      if (addAnswerResult.status === 401 || addAnswerResult.status === 403) {
        ctx.logout();
        history.push('/login');
        return;
      }

      if (addAnswerResult.status === 400) {
        setSuccessAdd('');
        setBackErrors('Failed to post Answer');
        setShowNotification(true);
        return;
      }
      if (addAnswerResult.status === 500 || addAnswerResult.status === 404) {
        setSuccessAdd('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }
      values.content = '';
      setBackErrors('');
      setSuccessAdd('Answer posted successfully');
      setShowNotification(true);
      setTimeout(() => {
        history.replace(`/question/${questionId}`);
      }, 3000);
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
            {showNotification && successAdd && (
              <Notification onClick={handleHideNotification} message={successAdd} />
            )}
            <h1>Add Answer</h1>

            <div className={css.inputGroup}>
              <label htmlFor='content'>Content</label>
              <textarea
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                type='content'
                className={`${css.input} ${css[rightClassesForInput('content')]}`}
                name='content'
                placeholder='Enter content here...'
                rows={11}
              />
              {formik.touched.content && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('content')]}`}>
                  {formik.errors.content ? formik.errors.content : 'Looks good'}
                </p>
              )}
            </div>
            <button type='submit' className={css.buttonSubmit}>
              Submit
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default AddAnswerForm;

import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetchPatchAuth } from '../../utils';
import Notification from '../Notification/Notification';
import css from './UpdateQuestionForm.module.css';
import Container from '../UI/Container/Container';
import { useHistory } from 'react-router-dom';

const initValues = {
  title: '',
  content: '',
};

function UpdateQuestionForm({ questionId, qTitle, qContent }) {
  initValues.title = qTitle;
  initValues.content = qContent;

  const history = useHistory();
  const ctx = useAuthCtx();
  const userToken = ctx.token;

  const [backErrors, setBackErrors] = useState('');
  const [successAdd, setSuccessAdd] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Must be at least 5 characters long')
        .max(100, 'Can"t be longer than 100 characters')
        .required('Field required'),
      content: Yup.string()
        .min(5, 'Must be at least 5 characters long')
        .max(600, 'Can"t be longer than 600 characters')
        .required('Field required'),
    }),
    onSubmit: async (values) => {
      const updateQuestion = {
        title: values.title,
        content: values.content,
      };
      const updateQuestionResult = await myFetchPatchAuth(
        `${baseUrl}/questions/${questionId}`,
        userToken,
        updateQuestion
      );
      console.log('updateQuestionResult ===', updateQuestionResult);

      if (updateQuestionResult.status === 401 || updateQuestionResult.status === 403) {
        ctx.logout();
        history.push('/login');
        return;
      }

      if (updateQuestionResult.status === 400) {
        setSuccessAdd('');
        setBackErrors('Failed to update Question');
        setShowNotification(true);
        return;
      }
      if (updateQuestionResult.status === 500 || updateQuestionResult.status === 404) {
        setSuccessAdd('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }
      values.title = '';
      values.content = '';
      setBackErrors('');
      setSuccessAdd('Question updated successfully');
      setShowNotification(true);
      setTimeout(() => {
        history.replace('/');
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
            <h1>Update Question</h1>
            <div className={css.inputGroup}>
              <label htmlFor='title'>Title</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                type='text'
                className={`${css.input} ${css[rightClassesForInput('title')]}`}
                name='title'
                placeholder='Enter title here...'
              />

              {formik.touched.title && (
                <p className={`${css.message} ${css[rightClassesForErrorMessage('title')]}`}>
                  {formik.errors.title ? formik.errors.title : 'Looks good'}
                </p>
              )}
            </div>

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
                rows={7}
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

export default UpdateQuestionForm;

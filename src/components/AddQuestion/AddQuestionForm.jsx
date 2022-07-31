import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetchPostAuth } from '../../utils';
import Notification from '../Notification/Notification';
import css from './AddQuestionForm.module.css';
import Container from '../UI/Container/Container';

const initValues = {
  title: '',
  content: '',
};

function AddForm() {
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
        .required('Privalomas laukas'),
    }),
    onSubmit: async (values) => {
      const newQuestion = {
        title: values.title,
        content: values.content,
      };
      const addQuestionResult = await myFetchPostAuth(
        `${baseUrl}/questions`,
        userToken,
        newQuestion
      );
      console.log('addQuestionResult ===', addQuestionResult);
      if (addQuestionResult.data.error) {
        setSuccessAdd('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }

      if (addQuestionResult.status === 400) {
        setSuccessAdd('');
        setBackErrors('Failed to post Question');
        setShowNotification(true);
        return;
      }
      if (addQuestionResult.status === 500) {
        setSuccessAdd('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }
      values.title = '';
      values.content = '';
      setBackErrors('');
      setSuccessAdd('Question posted successfully');
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
            {showNotification && successAdd && (
              <Notification onClick={handleHideNotification} message={successAdd} />
            )}
            <h1>Add Question</h1>
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

export default AddForm;

import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetchPatchAuth } from '../../utils';
import Notification from '../Notification/Notification';
import css from './UpdateAnswerForm.module.css';
import Container from '../UI/Container/Container';
import { useHistory } from 'react-router-dom';

const initValues = {
  content: '',
};

function UpdateAnswerForm({ questionId, answerId, aContent }) {
  initValues.content = aContent;

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
      const updateAnswer = {
        content: values.content,
      };
      const updateAnswerResult = await myFetchPatchAuth(
        `${baseUrl}/answers/${answerId}`,
        userToken,
        updateAnswer
      );
      // console.log('updateAnswerResult ===', updateAnswerResult);

      if (updateAnswerResult.status === 401 || updateAnswerResult.status === 403) {
        ctx.logout();
        history.push('/login');
        return;
      }

      if (updateAnswerResult.status === 400) {
        setSuccessAdd('');
        setBackErrors('Failed to update Answer');
        setShowNotification(true);
        return;
      }
      if (updateAnswerResult.status === 500 || updateAnswerResult.status === 404) {
        setSuccessAdd('');
        setBackErrors('Something went wrong');
        setShowNotification(true);
        return;
      }
      values.content = '';
      setBackErrors('');
      setSuccessAdd('Answer updated successfully');
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
            <h1>Update Answer</h1>

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

export default UpdateAnswerForm;

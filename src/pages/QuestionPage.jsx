import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SingleQuestion from '../components/SingleQuestion/SingleQuestion';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetch, myFetchDeleteAuth } from '../utils';

function QuestionPage() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const token = ctx.token;
  const params = useParams();
  const questionId = +params.questionId;
  console.log('questionId ===', questionId);
  const [singleQuestion, setSingleQuestion] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  async function getQuestion() {
    const getSingleQuestionResult = await myFetch(`${baseUrl}/questions`);
    console.log('getSingleQuestionResult ===', getSingleQuestionResult);
    if (getSingleQuestionResult.status !== 200) {
      return;
    }
    const singleQuestion = getSingleQuestionResult.data.result.filter(
      (questionObj) => questionObj.id === questionId
    );
    console.log('singleQuestion ===', singleQuestion);
    setSingleQuestion(singleQuestion[0]);

    const getQuestionAnswers = await myFetch(`${baseUrl}/questions/${questionId}/answers`);
    console.log('getQuestionAnswers ===', getQuestionAnswers);
    if (getQuestionAnswers.status !== 200) {
      return;
    }
    setQuestionAnswers(getQuestionAnswers.data.result);
  }

  async function deleteQuestion() {
    const deleteQuestionResult = await myFetchDeleteAuth(
      `${baseUrl}/questions/${questionId}`,
      token
    );
    if (deleteQuestionResult.status === 401 || deleteQuestionResult.status === 403) {
      history.replace('/login');
      return;
    }
    if (deleteQuestionResult.status !== 200) {
      return;
    }

    const deleteQuestionAnswersResult = await myFetchDeleteAuth(
      `${baseUrl}/answers/${questionId}`,
      token
    );
    if (deleteQuestionAnswersResult.status === 401 || deleteQuestionAnswersResult.status === 403) {
      history.replace('/login');
      return;
    }
    history.replace('/');
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      <SingleQuestion
        questionData={singleQuestion}
        answersData={questionAnswers}
        userId={singleQuestion.user_id}
        onDelete={deleteQuestion}
      />
    </div>
  );
}

export default QuestionPage;

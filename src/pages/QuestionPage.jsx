import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleQuestion from '../components/SingleQuestion/SingleQuestion';
import { baseUrl, myFetch } from '../utils';

function QuestionPage() {
  const params = useParams();
  const questionId = +params.questionId;
  const [singleQuestion, setSingleQuestion] = useState();
  const [questionAnswers, setQuestionAnswers] = useState();

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

    const getQuestionAnswers = myFetch(`${baseUrl}/questions/${questionId}/answers`);
    if (getSingleQuestionResult.status !== 200) {
      return;
    }
    setQuestionAnswers(getQuestionAnswers.data.result);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      <SingleQuestion questionData={singleQuestion} answersData={questionAnswers} />
    </div>
  );
}

export default QuestionPage;

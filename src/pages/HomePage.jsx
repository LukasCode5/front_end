import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AnswerList from '../components/QuestionList/QuestionList';
import { baseUrl, myFetch } from '../utils';

function HomePage() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  async function getQuestions() {
    const allQuestionsResult = await myFetch(`${baseUrl}/questions`);
    console.log('allQuestionsResult ===', allQuestionsResult);
    if (allQuestionsResult.status !== 200) {
      return;
    }
    setQuestions(allQuestionsResult.data.result);

    const allAnswersResult = await myFetch(`${baseUrl}/questions/answers`);
    if (allQuestionsResult.status !== 200) {
      return;
    }
    setQuestionsAnswers(allAnswersResult.data.result);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      <AnswerList questionData={questions} answerData={questionsAnswers} />
    </div>
  );
}

export default HomePage;

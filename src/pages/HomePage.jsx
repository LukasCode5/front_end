import { useEffect, useState } from 'react';
import QuestionList from '../components/QuestionList/QuestionList';
import { baseUrl, myFetch } from '../utils';

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  async function getQuestions() {
    const allQuestionsResult = await myFetch(`${baseUrl}/questions`);
    // console.log('allQuestionsResult ===', allQuestionsResult);
    if (allQuestionsResult.status !== 200) {
      setQuestions([]);
      return;
    }
    setQuestions(allQuestionsResult.data.result);

    const allAnswersResult = await myFetch(`${baseUrl}/questions/answers`);
    if (allQuestionsResult.status !== 200) {
      setQuestionsAnswers([]);
      return;
    }
    setQuestionsAnswers(allAnswersResult.data.result);
  }

  useEffect(() => {
    getQuestions();
  }, []);
  // console.log('questionsAnswers ===', questionsAnswers);
  return (
    <div>
      <QuestionList
        questionData={questions ? questions : []}
        answerData={questionsAnswers ? questionsAnswers : []}
      />
    </div>
  );
}

export default HomePage;

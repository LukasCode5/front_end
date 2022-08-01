import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateQuestionForm from '../components/UpdateQuestionForm/UpdateQuestionForm';
import { baseUrl, myFetch } from '../utils';

function UpdateQuestionPage() {
  const params = useParams();
  const questionId = +params.questionId;
  console.log('questionId ===', questionId);

  const [question, setQuestion] = useState([]);
  const [qTitle, setquTitle] = useState('');
  const [qContent, setqContent] = useState('');

  async function getQuestion() {
    const getQuestionResult = await myFetch(`${baseUrl}/questions`);
    console.log('getQuestionResult ===', getQuestionResult);
    if (getQuestionResult.status !== 200) {
      return;
    }
    const question = getQuestionResult.data.result.filter(
      (questionObj) => questionObj.id === questionId
    );
    console.log('question ===', question);
    setQuestion(question[0]);
    setquTitle(question[0].title);
    setqContent(question[0].content);
  }
  console.log('  qTitle ===', qTitle);
  console.log('qContent ===', qContent);
  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      <UpdateQuestionForm qTitle={question.title} qContent={qContent} questionId={questionId} />
    </div>
  );
}

export default UpdateQuestionPage;

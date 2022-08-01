import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateQuestionForm from '../components/UpdateQuestionForm/UpdateQuestionForm';
import { baseUrl, myFetch } from '../utils';

function UpdateQuestionPage() {
  const params = useParams();
  const questionId = +params.questionId;
  console.log('questionId ===', questionId);

  const [question, setQuestion] = useState([]);
  const [qTitle, setQTitle] = useState('');
  const [qContent, setQContent] = useState('');

  async function getQuestion() {
    const getQuestionsResult = await myFetch(`${baseUrl}/questions`);
    console.log('getQuestionResult ===', getQuestionsResult);
    if (getQuestionsResult.status !== 200) {
      return;
    }
    const question = getQuestionsResult.data.result.filter(
      (questionObj) => questionObj.id === questionId
    );
    console.log('question ===', question);
    setQuestion(question[0]);
    setQTitle(question[0].title);
    setQContent(question[0].content);
  }
  console.log('  qTitle ===', qTitle);
  console.log('qContent ===', qContent);
  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      <UpdateQuestionForm qTitle={qTitle} qContent={qContent} questionId={questionId} />
    </div>
  );
}

export default UpdateQuestionPage;

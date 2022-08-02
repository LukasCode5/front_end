import UpdateAnswerForm from '../components/UpdateAnswerForm/UpdateAnswerForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, myFetch } from '../utils';

function UpdateAnswerPage() {
  const params = useParams();
  const answerId = +params.answerId;
  const questionId = +params.questionId;
  // console.log('answerId ===', answerId);
  // console.log('questionId ===', questionId);

  const [answer, setAnwer] = useState([]);
  const [aContent, setAContent] = useState('');

  async function getAnswer() {
    const getAnswersResult = await myFetch(`${baseUrl}/questions/${questionId}/answers`);
    // console.log('getAnswersResult ===', getAnswersResult);
    if (getAnswersResult.status !== 200) {
      return;
    }
    const answer = getAnswersResult.data.result.filter(
      (answerObj) => answerObj.question_id === questionId
    );
    // console.log('answer ===', answer);
    setAContent(answer[0].content);
  }
  // console.log('aContent ===', aContent);
  useEffect(() => {
    getAnswer();
  }, []);
  return (
    <div>
      <UpdateAnswerForm aContent={aContent} answerId={answerId} questionId={questionId} />
    </div>
  );
}

export default UpdateAnswerPage;

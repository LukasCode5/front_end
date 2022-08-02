import { useParams } from 'react-router-dom';
import AddAnswerForm from '../components/AddAnswerForm/AddAnswerForm';

function AddAnswerPage() {
  const params = useParams();
  const questionId = +params.questionId;
  // console.log('params ===', params);
  return (
    <div>
      <AddAnswerForm questionId={questionId} />
    </div>
  );
}

export default AddAnswerPage;

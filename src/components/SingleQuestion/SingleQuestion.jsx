import { useAuthCtx } from '../../store/authContext';
import AnswerList from '../AnswerList/AnswerList';
import Container from '../UI/Container/Container';
import css from './SingleQuestion.module.css';

function SingleQuestion({ questionData, answersData, userId, onDelete, onDeleteAnswer, onVote }) {
  const ctx = useAuthCtx();
  // console.log('id ===', userId);
  return (
    <div className={css.cardList}>
      <Container singleQuestion>
        <div className={css.cardListGroup}>
          <div className={`${css.questionContainer}`}>
            <div className={css.question}>
              <div className={css.questionContent}>
                <h1>{questionData.title}</h1>
                <p>{questionData.content}</p>
              </div>
              <div className={css.questionInfo}>
                {ctx.isUserLoggedIn && (
                  <button
                    onClick={() => ctx.addAnswer(questionData.id)}
                    className={css.buttonSubmit}
                  >
                    Add Answer
                  </button>
                )}
                {+ctx.userId === userId && (
                  <button
                    onClick={() => ctx.updateQuestion(questionData.id)}
                    className={css.buttonSubmit}
                  >
                    Update
                  </button>
                )}
                {+ctx.userId === userId && (
                  <button onClick={onDelete} className={css.buttonSubmit}>
                    Delete
                  </button>
                )}
                <p>
                  {questionData.updated_at
                    ? `updated at ${questionData.updated_at?.split('.')[0]}`
                    : `created at ${questionData.created_at?.split('.')[0]}`}
                </p>
              </div>
            </div>
          </div>
          <AnswerList answersData={answersData} onDelete={onDeleteAnswer} onVote={onVote} />
        </div>
      </Container>
    </div>
  );
}

export default SingleQuestion;

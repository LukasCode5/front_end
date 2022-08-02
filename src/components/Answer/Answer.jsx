import { useAuthCtx } from '../../store/authContext';
import css from './Answer.module.css';

function Answer({
  content,
  createdAt,
  updatedAt,
  answerId,
  userId,
  onDelete,
  questionId,
  votes,
  onVote,
}) {
  const ctx = useAuthCtx();
  return (
    <div className={css.answer}>
      <div className={css.infoGroup}>
        <div className={css.stats}>
          <button onClick={() => onVote(answerId, 'up')} className={css.buttonVote}>
            +
          </button>
          <p>{votes}</p>
          <button onClick={() => onVote(answerId, 'down')} className={css.buttonVote}>
            -
          </button>
        </div>
        <div className={css.content}>
          <p>{content}</p>
          <div className={css.userInfo}>
            {+ctx.userId === userId && (
              <button
                onClick={() => ctx.updateAnswer(answerId, questionId)}
                className={css.buttonSubmit}
              >
                Update
              </button>
            )}
            {+ctx.userId === userId && (
              <button onClick={() => onDelete(answerId)} className={css.buttonSubmit}>
                Delete
              </button>
            )}
            <p>
              {updatedAt
                ? `updated at ${updatedAt.split('.')[0]}`
                : `created at ${createdAt.split('.')[0]}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*  */
export default Answer;

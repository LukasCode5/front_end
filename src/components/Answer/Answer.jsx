import { useAuthCtx } from '../../store/authContext';
import css from './Answer.module.css';

function Answer({ content, answerCount, createdAt, updatedAt, id }) {
  const ctx = useAuthCtx();
  return (
    <div className={css.question}>
      <div className={css.infoGroup}>
        <div className={css.content}>
          <div className={css.userInfo}>
            <div className={css.stats}>
              <p>{answerCount} Answers</p>
            </div>
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

export default Answer;

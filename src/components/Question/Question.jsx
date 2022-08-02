import { useAuthCtx } from '../../store/authContext';
import css from './Question.module.css';

function Question({ title, answerCount, userEmail, createdAt, updatedAt, id }) {
  const ctx = useAuthCtx();
  return (
    <div className={css.question}>
      <div className={css.infoGroup}>
        <div className={css.content}>
          <h3 className={css.questionTitle}>{title}</h3>
          <div className={css.userInfo}>
            <div className={css.stats}>
              <p>{answerCount} Answers</p>
            </div>
            <p>example@gmail.comn</p>
            <p>
              {updatedAt
                ? `updated at ${updatedAt.split('.')[0]}`
                : `created at ${createdAt.split('.')[0]}`}
            </p>
            <button onClick={() => ctx.goToQuestion(id)}>View question</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;

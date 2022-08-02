import Answer from '../Answer/Answer';
import css from './AnswerList.module.css';
function AnswerList(answersData) {
  return (
    <div>
      <div className={css.answerList}>
        <div
          className={`${Array.isArray(answersData) && answersData.length > 0 ? '' : css.noCards}`}
        >
          {Array.isArray(answersData) && answersData.length > 0 ? (
            answersData.map((answerObj) => (
              <Answer
                key={answerObj.id}
                title={answerObj.title}
                createdAt={answerObj.created_at}
                updatedAt={answerObj.updated_at}
                answerVotes={answerObj.votes}
                id={answerObj.id}
              />
            ))
          ) : (
            <div className={css.cardNotification}>
              <h3 className={css.noCards}>There are no answers yet</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerList;

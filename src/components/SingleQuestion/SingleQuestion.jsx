import Question from '../Question/Question';
import Container from '../UI/Container/Container';
import css from './SingleQuestion.module.css';

function SingleQuestion({ questionData, answersData }) {
  return (
    <div className={css.cardList}>
      <Container>
        <div className={css.cardListGroup}>
          <div className={`${css.questionContainer}`}>
            <div></div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SingleQuestion;

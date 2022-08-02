import { useState } from 'react';
import Question from '../Question/Question';
import Container from '../UI/Container/Container';
import css from './QuestionList.module.css';

function QuestionList({ questionData, answerData }) {
  const questionAnswerJoin =
    questionData.length > 0
      ? questionData.map((questionObj) => {
          const answers = answerData.filter(
            (answerObj) => answerObj.question_id === questionObj.id
          );

          return { ...questionObj, answerArr: answers };
        })
      : [];

  console.log('questionAnswerJoin ===', questionAnswerJoin);

  const [options, setOptions] = useState('');
  console.log('options ===', options);
  function handleOptionValue(value) {
    setOptions(value);
  }

  const finalQuestionArr =
    options === 'answered'
      ? questionAnswerJoin.filter((questionAnswerObj) => questionAnswerObj.answerArr.length > 0)
      : options === 'unanswered'
      ? questionAnswerJoin.filter((questionAnswerObj) => questionAnswerObj.answerArr.length === 0)
      : questionAnswerJoin;

  return (
    <div className={css.cardList}>
      <Container questions>
        <div className={css.cardListGroup}>
          <h1>Questions</h1>
          <div className={css.options}>
            <button onClick={() => handleOptionValue('')}>All</button>
            <button onClick={() => handleOptionValue('answered')}>Answered</button>
            <button onClick={() => handleOptionValue('unanswered')}>Unanswered</button>
          </div>

          <div className={`${css.cardContainer}`}>
            <div
              className={`${
                Array.isArray(finalQuestionArr) && finalQuestionArr.length > 0 ? '' : css.noCards
              }`}
            >
              {Array.isArray(finalQuestionArr) && finalQuestionArr.length > 0 ? (
                finalQuestionArr.map((questionObj) => {
                  const answers = answerData.filter(
                    (answerObj) => answerObj.question_id === questionObj.id
                  );
                  const answerCount = answers.length;
                  return (
                    <Question
                      key={questionObj.id}
                      title={questionObj.title}
                      createdAt={questionObj.created_at}
                      updatedAt={questionObj.updated_at}
                      answerCount={answerCount}
                      id={questionObj.id}
                    />
                  );
                })
              ) : (
                <div className={css.cardNotification}>
                  <h3 className={css.noCards}>There are no questions yet</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default QuestionList;

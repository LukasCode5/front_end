import { useState } from 'react';
import Question from '../Question/Question';
import Container from '../UI/Container/Container';
import css from './QuestionList.module.css';

function QuestionList({ questionData, answerData }) {
  // console.log('answerData ===', answerData);
  // console.log('questionData ===', questionData);

  const questionAnswerJoin =
    questionData.length > 0
      ? questionData?.map((questionObj) => {
          const answers = answerData?.filter(
            (answerObj) => answerObj.question_id === questionObj.id
          );

          return { ...questionObj, answerArr: answers };
        })
      : [];

  // console.log('questionAnswerJoin ===', questionAnswerJoin);

  const [filterOptions, setFilterOptions] = useState('');
  // console.log('options ===', filterOptions);
  const [sortByAnswersOptions, setSortByAnswersOptions] = useState('');

  // console.log('sortByAnswersOptions ===', sortByAnswersOptions);

  function handleFilterOptionValue(value) {
    setFilterOptions(value);
  }

  function handleSortByAnsweresOption() {
    if (sortByAnswersOptions === '') {
      setSortByAnswersOptions('asc');
      return;
    }
    if (sortByAnswersOptions === 'asc') {
      setSortByAnswersOptions('desc');
      return;
    }
    if (sortByAnswersOptions === 'desc') {
      setSortByAnswersOptions('asc');
    }
  }

  const finalQuestionArrFiltered =
    filterOptions === 'answered'
      ? questionAnswerJoin?.filter((questionAnswerObj) => questionAnswerObj.answerArr.length > 0)
      : filterOptions === 'unanswered'
      ? questionAnswerJoin?.filter((questionAnswerObj) => questionAnswerObj.answerArr.length === 0)
      : questionAnswerJoin;

  const finalQuestionArrSorted =
    sortByAnswersOptions === 'asc'
      ? finalQuestionArrFiltered?.sort((a, b) =>
          a.answerArr.length > b.answerArr.length ? 1 : -1
        )
      : sortByAnswersOptions === 'desc'
      ? finalQuestionArrFiltered?.sort((a, b) =>
          b.answerArr.length > a.answerArr.length ? 1 : -1
        )
      : finalQuestionArrFiltered;

  return (
    <div className={css.cardList}>
      <Container questions>
        <div className={css.cardListGroup}>
          <h1>Questions</h1>
          <div className={css.filterOptions}>
            <h3>Filter By:</h3>
            <button onClick={() => handleFilterOptionValue('')}>All</button>
            <button onClick={() => handleFilterOptionValue('answered')}>Answered</button>
            <button onClick={() => handleFilterOptionValue('unanswered')}>Unanswered</button>
          </div>
          <div className={css.sortOptions}>
            <h3>Sort By:</h3>
            <button onClick={handleSortByAnsweresOption}>Answers</button>
          </div>

          <div className={`${css.cardContainer}`}>
            <div
              className={`${
                Array.isArray(finalQuestionArrSorted) && finalQuestionArrSorted.length > 0
                  ? ''
                  : css.noCards
              }`}
            >
              {Array.isArray(finalQuestionArrSorted) && finalQuestionArrSorted.length > 0 ? (
                finalQuestionArrSorted.map((questionObj) => {
                  const answers = answerData?.filter(
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

import css from './Container.module.css';

function Container(props) {
  return (
    <div
      className={
        css[
          `${
            props.questions
              ? 'questionsContainer'
              : props.singleQuestion
              ? 'singleQuestionContainer'
              : 'container'
          }`
        ]
      }
    >
      {props.children}
    </div>
  );
}

export default Container;

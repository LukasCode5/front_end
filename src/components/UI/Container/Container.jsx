import css from './Container.module.css';

function Container(props) {
  return (
    <div className={css[`${props.questions ? 'questionsContainer' : 'container'}`]}>
      {props.children}
    </div>
  );
}

export default Container;

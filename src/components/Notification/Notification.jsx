import css from './Notification.module.css';
function Notification({ title, message, error, onClick }) {
  return (
    <div className={`${css.notification} ${error ? css.error : css.success}`}>
      {title && (
        <h3 className={`${css.title} ${error ? css.errorMsg : css.successMsg}`}>{title}</h3>
      )}
      {message && (
        <p className={`${css.message} ${error ? css.errorMsg : css.successMsg}`}>{message}</p>
      )}
      <button onClick={onClick} className={css.button} type='button'>
        Close
      </button>
    </div>
  );
}

export default Notification;

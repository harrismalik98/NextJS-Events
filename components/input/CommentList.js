import classes from './CommentList.module.css';

function CommentList(props) {
  const {comments} = props;

  return (
    <ul className={classes.comments}>
      {comments.map(comment => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;

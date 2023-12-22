import { useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import axios from 'axios';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);


  const sendRequest = async() => {
    if(showComments)
    {
      const {data} = await axios.get(`/api/comments/${eventId}`);
      setComments(data.comments);
    }
  }

  useEffect(()=>{

    sendRequest();
  
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async(commentData) => {
    const {data} = await axios.post(`/api/comments/${eventId}`,commentData);

    sendRequest();
    console.log(data.message);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;

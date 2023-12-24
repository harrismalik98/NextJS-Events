import { useContext, useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import axios from 'axios';
import NotificationContext from '../../store/NotificationContext';

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const notificationCtx = useContext(NotificationContext);


  const sendRequest = async() => {
    if(showComments)
    {
      setIsFetchingComments(true);
      const {data} = await axios.get(`/api/comments/${eventId}`);
      setComments(data.comments);
      setIsFetchingComments(false);
    }
  }

  useEffect(()=>{

    sendRequest();
  
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async(commentData) => {

    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is being stored in our database.",
      status: "pending"
    });

    try
    {
      const {data} = await axios.post(`/api/comments/${eventId}`,commentData);
      sendRequest();

      notificationCtx.showNotification({
        title: "Success!",
        message: data.message,
        status: "success"
      });
    }
    catch(error)
    {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong! Please try again.",
        status: "error"
      });
    }
    
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;

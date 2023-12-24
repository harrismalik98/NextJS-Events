import axios from 'axios';
import classes from './NewsletterRegistration.module.css';
import { useContext, useRef } from 'react';
import NotificationContext from '../../store/NotificationContext';

function NewsletterRegistration() {

  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = async(event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending"
    });

    const postData = {email: enteredEmail};

    try
    {
      const {data} = await axios.post("/api/newsletter", postData);
      emailInputRef.current.value = "";

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
        message: error.message || "Something went wrong!",
        status: "error"
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

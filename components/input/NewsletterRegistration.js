import axios from 'axios';
import classes from './NewsletterRegistration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {

  const emailInputRef = useRef();

  const registrationHandler = async(event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    const postData = {email: enteredEmail}

    const {data} = await axios.post("/api/newsletter", postData);

    console.log(data.message);
    emailInputRef.current.value = "";

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

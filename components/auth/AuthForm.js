import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import classes from './authForm.module.css';
import createUser from '../auth/createUser';

function AuthForm() {
  const inputRefEmail = useRef();
  const inputRefPassword = useRef();

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalError, setMessageError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

  // puedo agregar validation

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const userEmail = inputRefEmail.current.value;
    const userPassword = inputRefPassword.current.value;
    setMessageError(false);
    setModalVisible(false);
    setLoginError(false);

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: userEmail,
        password: userPassword,
      });
      if (result.error) {
        setLoginError(true);
      }
      if (!result.error) {
        router.replace('/');
      }
    } else {
      // creo nuevo
      try {
        const result = await createUser(userEmail, userPassword);
        if (!result.message) {
          setMessageError(true);
        } else {
          setModalVisible(true);
        }
        console.log(result);
      } catch (err) {
        setMessageError(true);
        console.log(err);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={inputRefEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={inputRefPassword}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <h3
            className="textLogin"
            style={{ color: '#DA353F', fontSize: 'small' }}
          >
            If this is your first time in the App, create an account
          </h3>

          <h3 className={classes.messageError}>
            {loginError && ' your password or email is incorrect, try again'}
          </h3>
          <h3 className={classes.message}>
            {modalVisible && ' new user created, now go to Login!'}
          </h3>
          <h3 className={classes.messageError}>
            {modalError && 'there already exist an user with that Email'}
          </h3>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;

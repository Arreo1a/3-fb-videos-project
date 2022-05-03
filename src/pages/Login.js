import React, { useState } from "react";

import { firebaseApp } from "../fb";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  async function submitHandler(e) {
    e.preventDefault();
    const theEmail = e.target.formBasicEmail.value;
    const thePassword = e.target.formBasicPassword.value;
    console.log(theEmail, thePassword);

    if (isLoggingIn) {
      const user = await createUserWithEmailAndPassword(
        auth,
        theEmail,
        thePassword
      );
    } else {
      signInWithEmailAndPassword(auth, theEmail, thePassword);
    }
  }

  return (
    <div className="loginPage">
      <div>
        <h1>{isLoggingIn ? "Create Account" : "Login"}</h1>
        <form onSubmit={submitHandler}>
          <div className="emailFormContainer" id="formBasicEmail">
            <h3>Email Address</h3>
            <input type="email" placeholder="Enter your Email" />
          </div>
          <div className="passwordFormContainer" id="formBasicPassword">
            <h3>Password</h3>
            <input type="password" />
          </div>
          <button type="submit">
            {isLoggingIn ? "Create Account" : "Login"}
          </button>
        </form>
        <button onClick={() => signInWithRedirect(auth, googleProvider)}>
          Sign in with Google
        </button>
        <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
          {isLoggingIn
            ? "Already have an account? Sign In"
            : "Dont have an account? Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Login;

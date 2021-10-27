import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth, Providers } from "../../config/firebase";
import { createDocumentWithId } from "../../scripts/fireStore";
import logging from "../../config/logging";
import IPageProps from "../../interfaces/page";

const RegisterPage: React.FunctionComponent<IPageProps> = (props) => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError("Please make sure your passwords match.");
      return;
    }
    if (error !== "") setError("");

    setRegistering(true);

    Providers.createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        const newUser = {
          name: name,
          email: email,
          role: "Student",
          imageURL: ""
        };
        createDocumentWithId("users",result.user.uid, newUser);
        history.push("/login");
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Please enter a stronger password.");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Email already in use.");
        } else {
          setError("Unable to register.  Please try again later.");
        }
        setRegistering(false);
      });
  };

  return (
    <div id="Register">
      <div className="form-group">
        <input
          type="name"
          name="name"
          id="name"
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </div>
      <div className="form-group">
        <input
          autoComplete="new-password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <div className="form-group">
        <input
          autoComplete="new-password"
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Confirm Password"
          onChange={(event) => setConfirm(event.target.value)}
          value={confirm}
        />
      </div>
      <button
        disabled={registering}
        color="success"
        onClick={() => signUpWithEmailAndPassword()}
      >
        Sign Up
      </button>
      <small>
        <p className="m-1 text-center">
          Already have an account? <Link to="/login">Login.</Link>
        </p>
      </small>
      <ErrorText error={error} />
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth, Providers } from "../../config/firebase";
import { createDocumentWithId } from "../../scripts/fireStore";
import logging from "../../config/logging";

export default function RegisterPage(){
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
          role: "student",
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
    <div className="sign-up-form">
      <div className="form-group">
      <label htmlFor="name">Name</label>
        <input
          type="name"
          name="name"
          id="name"
          className="form-control"
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </div>
      <div className="form-group">
      <label htmlFor="email">Email id</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </div>
      <div className="form-group">
      <label htmlFor="password">Password</label>
        <input
          autoComplete="new-password"
          type="password"
          name="password"
          id="password"
          className="form-control"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <div className="form-group">
      <label htmlFor="confirm">Confirm Password</label>
        <input
          autoComplete="new-password"
          type="password"
          name="confirm"
          id="confirm"
          className="form-control"
          placeholder="Confirm Password"
          onChange={(event) => setConfirm(event.target.value)}
          value={confirm}
        />
      </div>
      <button
        className="btn btn-dark btn-register"
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

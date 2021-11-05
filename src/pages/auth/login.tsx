import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth, Providers } from "../../config/firebase";
import logging from "../../config/logging";
import { useUsers } from "../../state/UsersProvider";
import { getDocument } from "../../scripts/fireStore";

export default function LoginPage() {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setUser, setIsLogged }: any = useUsers();

  const history = useHistory();

  async function signInWithEmailAndPassword() {
    if (error !== "") setError("");

    setAuthenticating(true);

    Providers.signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        logging.info(result);
        onSuccess(result.user.uid);
        history.push("/main");
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  }

  async function onSuccess(uid: string) {
    const document = await getDocument("users", uid);
    setUser(document);
    console.log("document", document);
    setIsLogged(true);
  }

  return (
    <div className="login">
      <div className="form-group">
        <label htmlFor="email">Email address</label>
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
      <button
        className="btn btn-dark btn-login"
        disabled={authenticating}
        color="success"
        onClick={() => signInWithEmailAndPassword()}
      >
        Login
      </button>
      <small>
        <p className="m-1 text-center">
          Don't have an account? <label htmlFor="tab-2">Register here..</label>
        </p>
        <p className="m-1 text-center">
          <Link to="/forget">Forget your password?</Link>
        </p>
      </small>
      <ErrorText error={error} />
      <hr className="bg-info m-3" />
    </div>
  );
}

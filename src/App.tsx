import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./styles/App.css";
import { Spinner } from "reactstrap";
import { auth } from "./config/firebase";
import logging from "./config/logging";
import Logged from "./routes/Logged";
import Unlogged from "./routes/Unlogged";
import Navbar from "./components/Navbar";
import { useUsers } from "./state/UsersProvider";
import { getDocument } from "./scripts/fireStore";

export default function App() {
  const { isLogged, setUser, setIsLogged }: any = useUsers();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("User detected.");
        onSuccess(user.uid);
      } else logging.info("No user detected");

      setLoading(false);
    });
  }, []);

  async function onSuccess(uid: string) {
    const document = await getDocument("users", uid);
    setUser(document);
    console.log("document", document);
    setIsLogged(true);
  }

  if (loading) return <Spinner color="info" />;

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/* Refactorability: Code hierarchy -1 */}
          {/* Remember when the Prettier plugin format our code weirdly in this case in a vertical fashion when it should be 1 line, */}
          {/* It's a sign that something is wrong. In this case, isLogged should either one component or another, not multiple JSX tags */}
          {/* The solution is to return logged and put the navbar there */}
          {/* Better still, you can create a special component called Page that alwatys include the Navbar and use as a base for other pages */}
          {isLogged ? (
            <div>
              <Navbar /> <Logged />
            </div>
          ) : (
            <Unlogged />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

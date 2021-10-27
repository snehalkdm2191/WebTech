import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Spinner } from "reactstrap";
import { auth } from "./config/firebase";
import logging from "./config/logging";
import Logged from "./routes/Logged";
import Unlogged from "./routes/Unlogged";
import { useUsers } from "./state/UsersProvider";
import { getDocument } from "./scripts/fireStore";

export default function App() {
  const { user, setUser, setIsLogged }: any = useUsers();
  const { isLogged }:any = useUsers();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("User detected.");
        onSuccess(user.uid)
      } else logging.info("No user detected");

      setLoading(false);
    });
  }, []);

  async function onSuccess(uid: string) {
    const document = await getDocument("users", uid);
    setUser(document);
    console.log("document",document);
    setIsLogged(true);
  }

  if (loading) return <Spinner color="info" />;

  return (
    <div>
      <BrowserRouter>
        <Switch>{isLogged ? <Logged /> : <Unlogged />}</Switch>
      </BrowserRouter>
    </div>
  );
}

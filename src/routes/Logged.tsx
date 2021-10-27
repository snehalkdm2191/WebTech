// NPM packages
import { Route } from "react-router-dom";
import { useUsers } from "../state/UsersProvider";

// Project files
import HomePage from "../pages/home";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student";
import Course from "../pages/Course";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";

export default function Logged() {
  const { user }: any = useUsers();
  console.log("user", user);
  return (
    <>
      {user.role === "teacher" ? (
        <Route component={HomePage} exact path="/" />
      ) : (
        <Route component={Student} exact path="/" />
      )}
      <Route component={Course} path="/courses/:id" />
      <Route component={LoginPage} exact path="/login" />
      <Route component={LogoutPage} path="/logout" />
    </>
  );
}

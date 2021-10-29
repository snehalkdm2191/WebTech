// NPM packages
import { Route } from "react-router-dom";
import { useUsers } from "../state/UsersProvider";

// Project files
import HomePage from "../pages/home";
import Teacher from "../pages/Teacher";
import Student from "../pages/Student";
import Course from "../pages/Course";
import LoginPage from "../pages/auth/loginMainPage";
import LogoutPage from "../pages/auth/logout";

export default function Logged() {
  const { user }: any = useUsers();
  return (
    <>
      <Route component={HomePage} exact path="/" />
      {user.role === "teacher" ? (
        <Route component={Teacher} exact path="/main" />
      ) : (
        <Route component={Student} exact path="/main" />
      )}
      <Route component={Course} path="/courses/:id" />
      <Route component={LoginPage} exact path="/login" />
      <Route component={LogoutPage} path="/logout" />
    </>
  );
}

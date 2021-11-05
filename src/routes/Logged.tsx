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
  // Global state
  const { user }: any = useUsers(); // tip use //@ts-ignore instead of any. Ignore mean something is pending and you will come back and fix it later. :any means it literally can be any data type and that's dangerous

  // Components
  const MainComponent = user.role === "teacher" ? Teacher : Student; // Teacher and Student sounds like Object Oriented Programming classes Teacher and Student instead of React webpages. Use a better name like TeacherPage, TeacherDashboard or DashboardTeacher -1

  return (
    <>
      {/* Readability: Same as in App.jsx to avoid Prettier messing the format do as refactored here. -1 */}
      <Route component={HomePage} exact path="/" />
      <Route component={MainComponent} path="/main" />
      <Route component={Course} path="/courses/:id" />
      <Route component={LoginPage} path="/login" />
      <Route component={LogoutPage} path="/logout" />
    </>
  );
}

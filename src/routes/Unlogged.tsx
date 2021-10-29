// NPM packages
import { Route } from "react-router-dom";

// Project files
import ChangePasswordPage from "../pages/auth/change";
import ForgotPasswordPage from "../pages/auth/forgot";
import LoginPage from "../pages/auth/loginMainPage";
import logout from "../pages/auth/logout";
import HomePage from "../pages/home";
import RegisterPage from "../pages/auth/register";
import ResetPasswordPage from "../pages/auth/reset";

export default function Unlogged() {
  return (
    <>
      <Route component={HomePage} exact path="/" />
      <Route component={LoginPage} exact path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={ChangePasswordPage} path="/change" />
      <Route component={ForgotPasswordPage} path="/forget" />
      <Route component={ResetPasswordPage} path="/reset" />
      <Route component={logout} path="/logout" />
    </>
  );
}

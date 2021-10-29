import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useUsers } from "../state/UsersProvider";

export default function NavBar() {
  // Global state
  const { user } = useUsers();

  return (
    <nav className="nav">
      <a href="" className="logo">
        <img src={logo} alt="logo" />
      </a>
      {user.name !== "" ? (
        <ul className="menu">
          <li>
            <Link to="/" activeClassName="active-link">
              Welcome {user.name}
            </Link>
          </li>
          <li>
            <Link to="/logout" activeClassName="active-link">
              Logout
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
}

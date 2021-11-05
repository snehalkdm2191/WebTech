import { useUsers } from "../state/UsersProvider";
import profile from "../assets/img/profile.png";

// Looks good
export default function Profile() {
  const { user }: any = useUsers();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 img">
          {/* Please add the alt tag for accesibilty purposes */}
          <img src={profile} alt="" className="img-rounded" />
        </div>
        <div className="col-md-6 details">
          <blockquote>
            <h5 className="user-name">{user.name}</h5>
            <small className="user-email">{user.email}</small>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

//@ts-nocheck
//NPM Packages
import { FC, useState } from "react";
import { Link } from "react-router-dom";
//Local imports
import Modal from "./Modal";
import { useUsers } from "../state/UsersProvider";
import { deleteDocument } from "../scripts/fireStore";
import blankImg from "../assets/img/image-placeholder.png";

interface MyProps {
  data: object;
}
const Card: FC<MyProps> = ({ data }) => {
  const { user }: any = useUsers();
  //Local state
  const [isOpen, setIsOpen] = useState(false);

  //Methods
  async function handleDelete(event, path, id) {
    event.preventDefault();
    if (window.confirm("Are you sure ?")) {
      await deleteDocument(path, id);
      alert("Course deleted");
    }
  }

  return (
    <div className="col-md-3 col-sm-6">
      {user.role === "teacher" && (
        <Modal
          type="edit"
          data={data}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          Edit course
        </Modal>
      )}
      <div className="course-grid4">
        <div className="course-image4">
          <a href={data.imageURL}>
            {data.imageURL === "" ? (
              <>
                <img className="pic-1" src={blankImg} alt="" />
                <img className="pic-2" src={blankImg} alt="" />
              </>
            ) : (
              <>
                <img className="pic-1" src={data.imageURL} alt="" />
                <img className="pic-2" src={data.imageURL} alt="" />
              </>
            )}
          </a>
          <span className="course-new-label">{data.title}</span>
        </div>
        <div className="course-content">
          <Link className="btn btn-course-view" to={"/courses/" + data.id}>
            <h6><i class="fas fa-binoculars"></i></h6>
          </Link>
          {user.role === "teacher" && (
            <>
              <button
                className="btn btn-course-edit"
                onClick={() => setIsOpen(true)}
              >
                <h6><i class="fas fa-edit"></i></h6>
              </button>
              <button
                className="btn btn-course-delete"
                onClick={(event) => handleDelete(event, "courses", data.id)}
              >
                <h6><i class="fas fa-trash-alt"></i></h6>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

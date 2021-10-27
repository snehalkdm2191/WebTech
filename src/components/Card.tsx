//@ts-nocheck
//NPM Packages
import { FC, useState } from "react";
import { Link } from "react-router-dom";
//Local imports
import Modal from "./Modal";
import { deleteDocument } from "../scripts/fireStore";

interface MyProps {
  data: object;
}
const Card: FC<MyProps> = ({ data }) => {
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
  console.log("user.role", user.role);

  return (
    <div className="card">
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

      <h2 className="title">{data.title}</h2>
      <p className="description">{data.description}</p>
      <img src={data.imageURL} alt="img" />

      <div className="menu">
        {user.role === "teacher" && (
          <>
            <button onClick={() => setIsOpen(true)}>
              <h3>Edit</h3>
            </button>
            <button
              className="btn"
              onClick={(event) => handleDelete(event, "courses", data.id)}
            >
              <h3>Delete</h3>
            </button>
          </>
        )}

        <Link to={"/courses/" + data.id}>
          <h3>View Course</h3>
        </Link>
      </div>
    </div>
  );
};

export default Card;

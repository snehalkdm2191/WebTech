import { useHistory } from "react-router-dom";
import useFetch from "../scripts/useFetch";
import { useUsers } from "../state/UsersProvider";
import { deleteDocument } from "../scripts/fireStore";

export default function StudentList() {
  const { dispatchUsers } = useUsers();
  const users = useFetch("users", dispatchUsers);

  const history = useHistory();

  const students = users.data.filter((item) => {
    return item.role === "student";
  });

  async function handleDelete(event, path, id) {
    event.preventDefault();
    if (window.confirm("Are you sure ?")) {
      await deleteDocument(path, id);
      alert("Student deleted");
      history.push("/main");
    }
  }

  // Components
  const Students = students.map((item) => {
    return (
      <tbody key={item.id}>
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <button className="btn-student-delete" onClick={(event) => handleDelete(event, "users", item.id)}>
            <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    );
  });
  return (
    <>
      {(!users.loading && users.error) === null && (
        <table class="table student-list-table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email id</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {Students}
        </table>
      )}
    </>
  );
}

import { useState } from "react";
import useFetch from "../scripts/useFetch";
import { useUsers } from "../state/UsersProvider";
import { deleteDocument } from "../scripts/fireStore";

export default function StudentList() {
  const { dispatchUsers } = useUsers();
  const users = useFetch("users", dispatchUsers);

  const students = users.data.filter((item) => {
    return item.role === "student";
  });

  async function handleDelete(event, path, id) {
    event.preventDefault();
    if (window.confirm("Are you sure ?")) {
      await deleteDocument(path, id);
      alert("Student deleted");
    }
  }

  // Components
  const Students = students.map((item) => {
    return (
      <li key={item.id} className="student-card">
        <h3>{item.username}</h3>
        <button
          className="btn btn-delete"
          onClick={(event) => handleDelete(event, "users", item.id)}
        >
          <h4>kick out</h4>
        </button>
      </li>
    );
  });
  return (
    <>
      {(!users.loading && users.error) === null && (
        <>
          <ul className="students">{Students}</ul>
        </>
      )}
    </>
  );
}

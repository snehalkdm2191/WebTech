//NPM Packages
import { useState } from "react";
import { useHistory } from "react-router-dom";

//Local imports
import fields from "../assets/fields-edit.json";
import InputField from "../components/InputField";
import { useCourses } from "../state/CoursesProvider";
import { updateDocument } from "../scripts/fireStore";

export default function EditForm({ onClose, data }) {
  const { dispatchCourses } = useCourses();
  //Local states
  const [form, setForm] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  console.log(form);

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };
    setForm({ ...form, ...field });
  }
  async function onSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    const newCourse = { ...form };
    await updateDocument("courses", newCourse.id, newCourse);
    dispatchCourses({ type: "UPDATE_COURSE", payload: form });
    alert("Course updated");
    onClose();
    history.push("/main");
  }

  //Components
  const Fields = fields.map((item) => (
    <InputField
      key={item.key}
      options={item}
      state={form[item.key]}
      onChange={onChange}
    />
  ));

  return (
    <form className="course-form" onSubmit={onSubmit}>
      {Fields}
      <p>{errorMessage}</p>
      <button className="btn btn-main btn-140">
        <h4>Submit</h4>
      </button>
    </form>
  );
}

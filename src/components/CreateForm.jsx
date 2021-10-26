//NPM Packages
import { useState } from "react";
import { useHistory } from "react-router-dom";

//Local imports
import fields from "../assets/fields-create.json";
import InputField from "../components/InputField";
import { useCourses } from "../state/CoursesProvider";
import { createDoc } from "../scripts/fireStore";

export default function CreateForm({ onClose }) {
  const { dispatchCourses } = useCourses();

  //Local states
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageURL: "",
    content: "",
    link: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // Methods
  function onChange(key, value) {
    const field = { [key]: value };
    setForm({ ...form, ...field });
  }

  console.log(form);

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    await createDoc("courses", form);
    dispatchCourses({ type: "CREATE_COURSE", payload: form });
    alert("Course created");
    onClose();
    history.push("/");
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
    <form onSubmit={onSubmit}>
      {Fields}
      <p>{errorMessage}</p>
      <button className="btn btn-main btn-140">
        <h4>Submit</h4>
      </button>
    </form>
  );
}

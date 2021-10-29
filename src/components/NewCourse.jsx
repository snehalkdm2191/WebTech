import reactDom from "react-dom";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

export default function NewCourse({ isOpen, onClose, data, children, type }) {
    <>
        {type === "create" && <CreateForm onClose={onClose} />}
        {type === "edit" && <EditForm onClose={onClose} data={data} />}
    </>
  
}

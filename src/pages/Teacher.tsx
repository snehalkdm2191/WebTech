//@ts-nocheck
//NPM PAckages
import { useState } from "react";

//Local imports
import Modal from "../components/Modal";

export default function Teacher() {

  //Local state
  const [selection, setSelection] = useState("courses");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="page-teacher">
          <button
            className="btn btn-main btn-300"
            onClick={() => setIsOpen(true)}
          >
            <h4>New Course</h4>
          </button>
          <Modal type="create" isOpen={isOpen} onClose={() => setIsOpen(false)}>
            New course
          </Modal>
    </main>
  );
}

//@ts-nocheck
//NPM PAckages
import { useState } from "react";

//Local imports
import CoursesList from "../components/CoursesList";
import StudentList from "../components/StudentList";
import Modal from "../components/Modal";

export default function Teacher() {
  //Local state
  const [isOpen, setIsOpen] = useState(false);
  console.log("isOpen", isOpen);

  return (
    <section id="tabs">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          {/* Same as student, you could have refactor this component to TabButton and pass and json with the necceary properties -1 */}
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Course & Programs
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Students List
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="add-course-tab"
            type="button"
            role="tab"
            onClick={() => setIsOpen(true)}
          >
            Add New Course
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <CoursesList />
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <StudentList />
        </div>
      </div>
      <Modal type="create" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        New course
      </Modal>
    </section>
  );
}

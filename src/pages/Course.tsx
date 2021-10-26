//@ts-nocheck
//NPM Packages
import { useParams, Link } from "react-router-dom";

//Local imports
import { useCourses } from "../state/CoursesProvider";
import { useAuth } from "../state/AuthProvider";
import useFetch from "../scripts/useFetch";

export default function Course() {
  // Global State
  const { user } = useAuth();
  //Local state
  const { id } = useParams();
  const { dispatchCourses } = useCourses();
  const courses = useFetch("courses", dispatchCourses);
  const course = courses.data.find((item) => item.id === id);
  console.log("courses", course);

  console.log("id", id);

  return (
    <main className="page-course">
    {(!courses.loading && courses.error) === null && (
      <>
        <h2>{course.title}</h2>
        <img src={course.imageURL} alt="img" className="illustration" />
        <p className="description">{course.content}</p>

        {course.link}
        {course.file && (
          <a
            href={course.file}
            className="btn btn-third btn-file btn-180 "
            download
          >
            <h4>Download file ⬇</h4>
            {/* <Files data={course} /> */}
          </a>
        )}
        <Link
          to={"/playlist/" + id}
          className="btn btn-third btn-video btn-180"
        >
          <h4>Video playlist 🎥</h4>
        </Link>

        <Link to="/" className="btn btn-main btn-180">
          <h4>Back to courses</h4>
        </Link>
      </>
    )}
  </main>
  );
}

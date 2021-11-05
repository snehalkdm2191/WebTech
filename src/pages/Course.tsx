//@ts-nocheck
//NPM Packages
import { useParams, Link } from "react-router-dom";

//Local imports
import { useCourses } from "../state/CoursesProvider";
import useFetch from "../scripts/useFetch";
import blankImg from "../assets/img/image-placeholder.png";

export default function Course() {
  //Local state
  const { id } = useParams();
  const { dispatchCourses } = useCourses();
  const courses = useFetch("courses", dispatchCourses);
  const course = courses.data.find((item) => item.id === id);
  console.log("courses", course);

  console.log("id", id);

  // Nesting -1 You need half of the divs you have here if you write your own modern CSS instead of using Bootstap, similar frameworks o even copying the techniques from other frameworks by hand.
  return (
    <div className="container view-course-container">
      {(!courses.loading && courses.error) === null && (
        <div class="card view-course-card">
          <div class="container-fliud">
            <div class="wrapper row">
              <div class="preview col-md-6">
                <div class="preview-pic tab-content">
                  <div class="tab-pane active" id="pic-1">
                    {course.imageURL === "" ? (
                      <img src={blankImg} alt="img" />
                    ) : (
                      <img src={course.imageURL} alt="img" />
                    )}
                  </div>
                </div>
              </div>
              <div class="details col-md-6">
                <h3 class="course-title">{course.title}</h3>
                <p class="course-description">{course.description}</p>
                <p class="course-description">{course.content}</p>

                <a href={course.links} target="_blank" ClassName="active-link">
                  <h5 class="course-title">Click here to view video</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//NPM Packages
import { useState } from "react";

//Local Files
import useFetch from "../scripts/useFetch";
import { useCourses } from "../state/CoursesProvider";
import Card from "./Card";

export default function CoursesList() {
  const { dispatchCourses } = useCourses();
  const courses = useFetch("courses", dispatchCourses);

  //Components
  const Courses = courses.data.map((item) => {
    return <Card key={item.id} data={item} />;
  });

  return (
    <>
        <section className="cards">{Courses}</section>
    </>
  );
}

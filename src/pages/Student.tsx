//@ts-nocheck
//NPM PAckages
import { useState } from "react";

//Local imports
import { useAuth } from "../state/AuthProvider";
import CoursesList from "../components/CoursesList";

export default function Student() {
  // Global state
  const { user } = useAuth();

  return (
    <main className="page-teacher">
     <CoursesList />
    </main>
  );
}

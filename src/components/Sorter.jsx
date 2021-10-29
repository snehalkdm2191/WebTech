import SortButton from "./SortButton";

export default function Sorter({ hook, typeOfUser }) {
  return (
    <section className="section-sorter text-center">
      <SortButton target="courses" hook={hook}>
        Current program
      </SortButton>
      {typeOfUser === "teacher" && (
        <SortButton target="students" hook={hook}>
          Students
        </SortButton>
      )}
      {typeOfUser === "student" && (
        <SortButton target="profile" hook={hook}>
          Profile
        </SortButton>
      )}
    </section>
  );
}

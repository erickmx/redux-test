import React from "react";
import { arrayOf, shape, number, string, func } from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, handleDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href="http://pluralsight.com/courses"
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={`/course/${course.slug}`}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDeleteClick(course)}
                type="button"
              >
                Delete
              </button>
            </td>
            <td />
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  handleDeleteClick: func.isRequired,
  courses: arrayOf(
    shape({
      id: number.isRequired,
      slug: string.isRequired,
      title: string.isRequired,
      authorId: number.isRequired,
      category: string.isRequired,
      authorName: string.isRequired
    })
  ).isRequired
};

export default CourseList;

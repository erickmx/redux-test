import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  func,
  arrayOf,
  shape,
  string,
  number,
  objectOf,
  any
} from "prop-types";
import * as courseActions from "@actions/courseActions";
import * as authorActions from "@actions/authorActions";
import { newCourse } from "@tools/mockData";
import { Spinner } from "@components";
import CourseForm from "./CourseForm";

const ManageCoursePage = ({
  loadCourses,
  loadAuthors,
  saveCourse,
  courses,
  authors,
  history,
  course
}) => {
  const [courseState, setCourse] = useState({ ...course });
  const [savingState, setSaving] = useState(false);
  const [errorsState, setErrors] = useState({});

  console.log("====================================");
  console.log(setErrors);
  console.log("====================================");

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(err => {
        // eslint-disable-next-line no-alert
        alert(`Loading Courses Failed, ${err}`);
      });
    } else {
      setCourse({ ...course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        // eslint-disable-next-line no-alert
        alert(`Loading authors Failed, ${err}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };

  const isValidForm = () => {
    const { title, authorId, category } = courseState;
    const newErrors = {};
    if (!title) newErrors.title = "Title is Required";
    if (!authorId) newErrors.author = "Author is Required";
    if (!category) newErrors.category = "Category is Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!isValidForm()) return;

    setSaving(true);
    saveCourse(courseState)
      .then(() => {
        toast.success("Course Saved");
        history.push("/courses");
      })
      .catch(err => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
    return false;
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      authors={authors}
      course={courseState}
      errors={errorsState}
      saving={savingState}
      onSave={handleSubmit}
      onChange={handleChange}
    />
  );
};

const getCourseBySlug = (courses, slug) =>
  courses.find(course => course.slug === slug);

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { slug }
    }
  } = ownProps;

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  saveCourse: courseActions.saveCourse,
  loadAuthors: authorActions.loadAuthors
};

ManageCoursePage.propTypes = {
  history: objectOf(any.isRequired).isRequired,
  loadAuthors: func.isRequired,
  loadCourses: func.isRequired,
  saveCourse: func.isRequired,
  course: shape({
    id: number,
    slug: string,
    title: string,
    authorId: number,
    category: string
  }).isRequired,
  authors: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired
    }).isRequired
  ).isRequired,
  courses: arrayOf(
    shape({
      id: number.isRequired,
      slug: string.isRequired,
      title: string.isRequired,
      authorId: number.isRequired,
      category: string.isRequired
    }).isRequired
  ).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);

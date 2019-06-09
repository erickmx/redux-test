import * as courseApi from "@services/courseApi";
import {
  CREATE_COURSE,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS
} from "../types/coursesTypes";

export const createCourse = course => ({
  type: CREATE_COURSE,
  course
});

const loadCoursesSuccess = courses => ({
  type: LOAD_COURSES_SUCCESS,
  courses
});

const createCourseSuccess = course => ({
  type: CREATE_COURSE_SUCCESS,
  course
});

const updateCourseSuccess = course => ({
  type: UPDATE_COURSE_SUCCESS,
  course
});

// thunks

export const loadCourses = () => dispatch => {
  return courseApi
    .getCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(err => {
      throw err;
    });
};

export const saveCourse = course => {
  return (dispatch, getState) => {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(err => {});
  };
};

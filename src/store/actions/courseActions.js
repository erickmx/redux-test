import * as courseApi from "@services/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import {
  CREATE_COURSE,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC
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

const deleteCourseOptimistic = course => ({
  type: DELETE_COURSE_OPTIMISTIC,
  course
});

// thunks

export const loadCourses = () => dispatch => {
  dispatch(beginApiCall());
  return courseApi
    .getCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(err => {
      dispatch(apiCallError());
      throw err;
    });
};

export const saveCourse = course => {
  return (dispatch, getState) => {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(err => {
        dispatch(apiCallError());
        throw err;
      });
  };
};

export const deleteCourse = course => dispatch => {
  dispatch(deleteCourseOptimistic(course));
  return courseApi.deleteCourse(course.id);
};

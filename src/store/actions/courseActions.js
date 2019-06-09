import * as courseApi from "@services/courseApi";
import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from "../types/coursesTypes";

export const createCourse = course => ({
  type: CREATE_COURSE,
  course
});

const loadCoursesSuccess = courses => ({
  type: LOAD_COURSES_SUCCESS,
  courses
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

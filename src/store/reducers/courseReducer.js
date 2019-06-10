import {
  CREATE_COURSE,
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC
} from "../types/coursesTypes";

const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COURSE:
    case CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case LOAD_COURSES_SUCCESS:
      return action.courses;
    case DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
    default:
      return state;
  }
};

export default courseReducer;

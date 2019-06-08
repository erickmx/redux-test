import { CREATE_COURSE } from "../types/coursesTypes";

const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COURSE:
      return [...state, { ...action.course }];
    default:
      return state;
  }
};

export default courseReducer;

import { CREATE_COURSE } from "../types/coursesTypes";

export const createCourse = course => ({
  type: CREATE_COURSE,
  course
});

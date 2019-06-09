import { handleResponses, handleErrors } from "@utils/api";

const BASE_URL = `http://localhost:3001/courses`;

export const getCourses = () => {
  return fetch(BASE_URL)
    .then(handleResponses)
    .catch(handleErrors);
};

export const saveCourses = course => {
  const { id } = course;
  return fetch(`${BASE_URL}/${id || ""}`, {
    method: id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course)
  })
    .then(handleResponses)
    .catch(handleErrors);
};

export const deleteCourse = courseId => {
  return fetch(`${BASE_URL}/${courseId}`, {
    method: "DELETE"
  })
    .then(handleResponses)
    .catch(handleErrors);
};

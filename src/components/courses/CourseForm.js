import React from "react";
import {
  objectOf,
  arrayOf,
  string,
  number,
  shape,
  bool,
  func
} from "prop-types";
import { SelectInput, TextInput } from "@components";

const CourseForm = ({
  course,
  onSave,
  authors,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? "Edit" : "Add"} Course</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />
      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId || ""}
        defaultOption="Select Author"
        options={authors.map(author => ({
          value: author.id,
          text: author.name
        }))}
        onChange={onChange}
        error={errors.author}
      />
      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "save"}
      </button>
    </form>
  );
};

CourseForm.propTypes = {
  errors: objectOf(string),
  onChange: func.isRequired,
  onSave: func.isRequired,
  saving: bool,
  course: shape({
    id: number,
    slug: string,
    title: string,
    authorId: number,
    category: string
  }),
  authors: arrayOf(
    shape({ id: number.isRequired, name: string.isRequired }).isRequired
  ).isRequired
};

CourseForm.defaultProps = {
  saving: false,
  errors: {},
  course: {
    id: 0,
    slug: "",
    title: "",
    authorId: 0,
    category: ""
  }
};

export default CourseForm;

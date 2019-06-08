import React, { Component } from "react";
import { func, arrayOf, shape, string } from "prop-types";
import { connect } from "react-redux";
import * as courseActions from "@actions/courseActions";

class CoursesPage extends Component {
  state = {
    course: {
      title: ""
    }
  };

  handleChange = ({ target: { value: title } }) => {
    this.setState(prevState => ({
      course: { ...prevState.course, title }
    }));
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const {
      props: { createCourse },
      state: { course }
    } = this;
    createCourse(course);
    this.setState(prevState => ({
      course: { ...prevState.course, title: "" }
    }));
    return false;
  };

  render() {
    const { course } = this.state;
    const { courses } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={course.title} />
        <input type="submit" value="save" />
        {courses.map(c => (
          <div key={c.title}>{c.title}</div>
        ))}
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
};

CoursesPage.propTypes = {
  createCourse: func.isRequired,
  courses: arrayOf(
    shape({
      title: string.isRequired
    }).isRequired
  ).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);

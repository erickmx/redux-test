import React, { Component } from "react";

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
    return false;
  };

  render() {
    const { course } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={course.title} />
        <input type="submit" value="save" />
      </form>
    );
  }
}

export default CoursesPage;

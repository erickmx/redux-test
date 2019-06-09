import React, { Component } from "react";
import { func, arrayOf, shape, string, objectOf } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as courseActions from "@actions/courseActions";
import * as authorActions from "@actions/authorActions";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  componentDidMount() {
    const {
      actions: { loadCourses, loadAuthors },
      courses,
      authors
    } = this.props;

    if (courses.length === 0) {
      loadCourses().catch(err => {
        // eslint-disable-next-line no-alert
        alert(`Loading Courses Failed, ${err}`);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        // eslint-disable-next-line no-alert
        alert(`Loading authors Failed, ${err}`);
      });
    }
  }

  render() {
    const { courses } = this.props;
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={courses} />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => ({
            ...course,
            authorName: state.authors.find(
              author => author.id === course.authorId
            ).name
          })),
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
};

CoursesPage.propTypes = {
  actions: objectOf(func.isRequired).isRequired,
  authors: objectOf(func.isRequired).isRequired,
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

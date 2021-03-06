import React, { Component } from "react";
import {
  func,
  arrayOf,
  shape,
  string,
  objectOf,
  number,
  bool
} from "prop-types";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as courseActions from "@actions/courseActions";
import * as authorActions from "@actions/authorActions";
import { Spinner } from "@components/common";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  };

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

  handleClick = () => {
    this.setState({ redirectToAddCoursePage: true });
  };

  handleDeleteCourse = course => {
    const {
      actions: { deleteCourse }
    } = this.props;
    deleteCourse(course)
      .then(() => {
        toast.success("Course deleted.");
      })
      .catch(err => {
        toast.error(`Delete failed. ${err}`, { autoClose: false });
      });
  };

  render() {
    const { courses, loading } = this.props;
    const { redirectToAddCoursePage } = this.state;
    return (
      <>
        {redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={this.handleClick}
              type="button"
            >
              Add Course
            </button>
            <CourseList
              handleDeleteClick={this.handleDeleteCourse}
              courses={courses}
            />
          </>
        )}
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
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
};

CoursesPage.propTypes = {
  actions: objectOf(func.isRequired).isRequired,
  loading: bool.isRequired,
  authors: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired
    }).isRequired
  ).isRequired,
  courses: arrayOf(
    shape({
      id: number.isRequired,
      slug: string.isRequired,
      title: string.isRequired,
      authorId: number.isRequired,
      category: string.isRequired,
      authorName: string.isRequired
    }).isRequired
  ).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);

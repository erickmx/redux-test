import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Header,
  HomePage,
  AboutPage,
  CoursesPage,
  PageNotFound,
  ManageCoursePage
} from "@components";

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/courses" component={CoursesPage} />
        <Route exact path="/course/:slug" component={ManageCoursePage} />
        <Route exact path="/course" component={ManageCoursePage} />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;

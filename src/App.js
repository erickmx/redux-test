import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  Header,
  PageNotFound,
  CoursesPage
} from "@components";

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/courses" component={CoursesPage} />
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;

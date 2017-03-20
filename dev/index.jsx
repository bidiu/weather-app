import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";
import { App } from "./containers/app.jsx";
import { WeatherPage } from "./containers/weather-page.jsx";
import { AboutPage } from "./containers/about-page.jsx";
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';

window.$ = $;
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* IndexRoute component obviously is only for routing home/index page */}
      <IndexRoute component={WeatherPage}/>
      <Route path="about" component={AboutPage}/>
    </Route>
  </Router>,
  document.getElementById("container")
);

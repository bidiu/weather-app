import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";
import { App, Home, Contact } from "./containers/app.jsx";
import { WeatherPage } from "./containers/weather-page.jsx";
import $ from 'jquery';

window.$ = $;

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* IndexRoute component obviously is only for routing home/index page */}
      <IndexRoute component={WeatherPage}/>
      <Route path="about" component={Contact}/>
    </Route>
  </Router>,
  document.getElementById("container")
);

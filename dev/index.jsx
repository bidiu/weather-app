import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";
import { App, Home, Contact } from "./containers/app.jsx";
import { WeatherPage } from "./containers/weather-page.jsx";
import $ from 'jquery';

window.$ = $;

ReactDOM.render(
  <Router history={hashHistory}>
    {/*
      * routing configuration --> mapping url to views/components.
      * since all urls CONTAINS '/', so App component will always be visible.
      */}
    <Route path="/" component={App}>
      {/* IndexRoute component obviously is only for routing home/index page */}
      <IndexRoute component={WeatherPage}/>
      {/*
        * Following is nested router nested inside '/' router, matching nested components
        * via 'this.props.children'.
        *
        * For nested router, URL will be concatenated, like: '/' + 'stuff',
        * however, nested router could explicitly use absoute url, like: '/stuff'.
        *
        * Still, quite a few to learn about router :P
        *
        * Not 'match' I think.
        */}
      <Route path="about" component={Contact}/>
    </Route>
  </Router>,
  document.querySelector("#container")
);

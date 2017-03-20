import React from "react";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";
import { NavBar } from "../components/common/navbar.jsx";
import { Footer } from "../components/common/footer.jsx";

export const App = React.createClass({
  render: function() {
    var links = [{
      url: "/",
      text: "Weather"
    },{
      url: "/about",
      text: "About"
    }];
    return (
      <div>
        <NavBar links={links}/>
        <div id="contentContainer">
          {this.props.children}
        </div>
        <Footer
          copyright={"\u00A9 2017 Weather App, Ottawa"}
          links={links}/>
      </div>
    );
  }
});

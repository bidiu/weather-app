import React from "react";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";
import { NavBar } from "../components/common/navbar.jsx";
import { Footer } from "../components/common/footer.jsx";

export const Contact = React.createClass({
  render: function() {
      return (
        <div>
          <h2>About</h2>
          <p>Cras facilisis urna ornare ex volutpat, et convallis erat elementum. Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
          <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
        </div>
      );
    }
});

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

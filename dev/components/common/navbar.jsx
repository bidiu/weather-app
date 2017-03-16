import React from "react";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";

// navigation bar, needs external CSS
export const NavBar = React.createClass({
  render: function() {
    const navStyle = {
      backgroundColor: "#222",
      fontSize: "14px",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: Number.MAX_SAFE_INTEGER,
      margin: 0,
      padding: "0 10px"
    };
    const ulStyle = {
      overflow: "auto",
      width: 800,
      margin: "0 auto",
      padding: 0
    };
    const liStyle = {
      float: "left",
      listStyleType: "none",
      margin: "0 10px",
      padding: 0,
    };
    const linkTags = this.props.links.map((link) => {
      const url = link.url;
      return (
        <li style={liStyle} key={url}>
          {
            url === "/" ?
            <IndexLink to="/" activeClassName="active">{link.text}</IndexLink> :
            <Link to={url} activeClassName="active">{link.text}</Link>
          }
        </li>
      );
    });
    return (
      <nav style={navStyle}>
        <ul style={ulStyle}>
          {linkTags}
        </ul>
      </nav>
    );
  }
});

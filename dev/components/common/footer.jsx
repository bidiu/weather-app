import React from "react";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";

export const Footer = React.createClass({
  render: function() {
    const linkTags = this.props.links.map((link) => {
      return (
        <li className="footer-links-li" key={link.url}>
          {
            link.url === "/" ?
            <IndexLink to="/" activeClassName="footer-link-active">{link.text}</IndexLink> :
            <Link to={link.url} activeClassName="footer-link-active">{link.text}</Link>
          }
        </li>
      );
    });
    linkTags.reverse();

    return (
      <footer>
        <div>
          <div className="footer-copyright">
            {this.props.copyright}
          </div>
          <div className="footer-links-div">
            <ul className="footer-links-ul">
              {linkTags}
            </ul>
          </div>
        </div>
      </footer>
    );
  }
});

import React from "react";
import { transColor } from "../../utils/helpers.jsx";

export const Buttonify = React.createClass({
  componentDidMount: function() {
    // __this is the component
    // 'this' will be the target element
    const __this = this;
    $(this.__btn).hover(function(e) {
      $(this).css("WebkitFilter", "drop-shadow(1px 1px 1px #000)");
      $(this).css("filter", "drop-shadow(1px 1px 1px #000)");
    }, function(e) {
      $(this).css("WebkitFilter", "drop-shadow(0 0 1px #222)");
      $(this).css("filter", "drop-shadow(0 0 1px #222)");
    });
    $(this.__btn).mousedown(function(e) {
      $(this).css("background-color", transColor(__this.props.backgroundColor, -0.4));
    });
    $(this.__btn).mouseup(function(e) {
      $(this).css("background-color", __this.props.backgroundColor);
    });
    $(this.__btn).click(function(e) {
      e.preventDefault();
      __this.props.clickHandler(e);
    });
  },
  render: function() {
    const btnStyle = {
      WebkitFilter: "drop-shadow(0 0 1px #222)",
      filter: "drop-shadow(0 0 1px #222)",
      width: this.props.width || auto,
      height: this.props.height || auto,
      margin: this.props.margin || 0,
      padding: this.props.padding || 0,
      opacity: this.props.opacity || "1",
      display: this.props.display || "inline-block",
      borderRadius: this.props.borderRadius || 0,
      MozBorderRadius: this.props.borderRadius || 0,
      WebkitBorderRadius: this.props.borderRadius || 0,
      borderWidth: this.props.borderWidth || 0,
      backgroundColor: this.props.backgroundColor || "#aaa",
      color: this.props.color || "#000",
      fontWeight: this.props.fontWeight || "normal",
      fontSize: this.props.fontSize || "inherit"
    };
    return (
      <button type={this.props.type} style={btnStyle} className="btn"
        ref={(el) => this.__btn = el}>
        {this.props.children}
      </button>
    );
  }
});

import React from "react";
import { Z_INDEX } from "../../utils/helpers.jsx";

const HEIGHT = 3;

export const ProgressBar = React.createClass({
  render: function() {
    const backgroundStyle = {
      height: `${HEIGHT}px`,
      width: "100%",
      backgroundColor: this.props.backgroundColor,
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: Z_INDEX.progressBar
    };
    const foregroundStyle = {
      height: "100%",
      width: `${this.props.progress}%`,
      backgroundColor: this.props.foregroundColor
    };
    if (this.props.visible) {
      return (
        <div style={backgroundStyle}>
          <div style={foregroundStyle}></div>
        </div>
      );
    }
    return null;
  }
});

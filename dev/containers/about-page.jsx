import React from 'react';
import { AutoCompleteWrapper } from '../components/autocomplete.jsx';

export const AboutPage = React.createClass({
  render: function() {
    const divStyle = {
      margin: "60px 50px 0 50px"
    };
    return (
      <div style={divStyle}>
        <AutoCompleteWrapper/>
      </div>
    );
  }
});

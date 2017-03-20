import React from 'react';
import { AutoCompleteWrapper } from '../components/autocomplete.jsx';
import { Showcase } from "./showcase.jsx";

export const AboutPage = React.createClass({
  render: function() {
    return (
      <div>
        <Showcase
          offset="46px" padding="10px" width="780px" height="360px"
          backgroundImage="url(/images/showcase-about.jpg)"
          showMainArea={false} showForm={false} coverRatio="0.1"/>
      </div>
    );
  }
});

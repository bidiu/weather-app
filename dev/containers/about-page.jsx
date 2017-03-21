import React from 'react';
import { AutoCompleteWrapper } from '../components/autocomplete.jsx';
import { Showcase } from './showcase.jsx';
import { MarkdownRender } from '../components/common/markdown-render.jsx';

// to be replaced when building the project
const aboutDoc = '#{ ABOUT_DOC_TO_BE_REPLACED }';

export const AboutPage = React.createClass({
  render: function() {
    const containerStyle = {
      width: 740,
      margin: '0 auto',
      padding: '20px 30px 30px 36px'
    };
    return (
      <div>
        <Showcase
          offset='46px' padding='10px' width='780px' height='360px'
          backgroundImage='url(/images/showcase-about.jpg)'
          showMainArea={false} showForm={false} coverRatio='0.1'/>
        <div style={containerStyle}>
          <MarkdownRender mode='markdown' markdown={aboutDoc}/>
        </div>
      </div>
    );
  }
});

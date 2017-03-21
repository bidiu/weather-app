import React from 'react';
import md5 from 'js-md5';
import { ProgressBarWrapper } from './pb-wrapper.jsx';
import { Buttonify } from './button.jsx'

const RENDER_API_ENDPOINT = 'https://api.github.com/markdown';

// invoke github's API to render markdown document
export const MarkdownRender = React.createClass({
  getInitialState: function() {
    return {
      isActivated: false,
      renderedContent: '<div></div>',
      retryBtn: null
    };
  },
  componentDidMount: function() {
    this.requestRender();
  },
  retryBtnClickHandler: function() {
    this.requestRender();
  },
  requestRender: function() {
    const c_this = this;
    $.ajax({
      url: RENDER_API_ENDPOINT,
      contentType: 'application/json;charset=UTF-8',
      method: 'POST',
      data: JSON.stringify({
        text: c_this.props.markdown,
        mode: c_this.props.mode
      }),
      beforeSend: () => {
        c_this.setState({
          isActivated: true,
          renderedContent: '<div>Markdown document is being rendered by Github...</div>',
          retryBtn: null
        });
      },
      success: (data) => {
        c_this.setState({
          isActivated: false,
          renderedContent: data,
          retryBtn: null
        });
      },
      error: () => {
        c_this.setState({
          isActivated: false,
          renderedContent: '<div>Need Internet to render the Markdown text here</div>',
          retryBtn: (
            <Buttonify clickHandler={this.retryBtnClickHandler}>
              Retry
            </Buttonify>
          )
        });
      }
    });
  },
  render: function() {
    const barStyle = {
      backgroundColor: '#222',
      foregroundColor: '#a1dce3'
    };
    return (
      <div>
        <ProgressBarWrapper style={barStyle} isActivated={this.state.isActivated}/>
        <div dangerouslySetInnerHTML={{ __html: this.state.renderedContent }}>
        </div>
        <div>
          {this.state.retryBtn}
        </div>
      </div>
    );
  }
});

import React from 'react';
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
          renderedContent: '<div>Need Internet to render the Markdown text here.</div>',
          retryBtn: (
            <div>
              <Buttonify clickHandler={this.retryBtnClickHandler}
                width='72px' height='36px' opacity='1'
                borderRadius="2px" backgroundColor="#00bcd6" type="button"
                margin="10px 0" color="#fff" fontWeight="normal" fontSize="14px">
                Retry
              </Buttonify>
            </div>
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
    const style = {
      width: '100%',
      backgroundColor: '#f9f9f9',
      borderRadius: '4px',
      MozBorderRadius: '4px',
      WebkitBorderRadius: '4px',
      MozBoxShadow: '0px 0px 4px #ababab',
      WebkitBoxShadow: '0px 0px 4px #ababab',
      boxShadow: '0px 0px 4px #ababab'
    };
    const contentStyle = {
      padding: '20px',
      minHeight: '220px'
    };
    const footerStyle = {
      overflow: 'auto',
      padding: '0 10px 0 0',
      backgroundColor: '#eee',
      height: '50px',
      lineHeight: '50px',
      color: '#777',
      fontSize: '12px'
    };
    if (this.props.style) Object.assign(style, this.props.style);
    if (this.props.footerStyle) Object.assign(footerStyle, this.props.footerStyle);
    if (this.props.contentStyle) Object.assign(contentStyle, this.props.contentStyle);
    return (
      <div style={style}>
        <ProgressBarWrapper style={barStyle} isActivated={this.state.isActivated}/>
        <div style={contentStyle}>
          <div dangerouslySetInnerHTML={{ __html: this.state.renderedContent }}
            className='markdown-body'>
          </div>
          {this.state.retryBtn}
        </div>
        <div style={footerStyle}>
          <div style={{ float: 'right' }}>
            Markdown document is rendered with {'\u2764'} by&nbsp;
            <a href="https://github.com/" target="_blank"
              style={{ textDecoration: 'none' }}>
              Github
            </a>.
          </div>
        </div>
      </div>
    );
  }
});

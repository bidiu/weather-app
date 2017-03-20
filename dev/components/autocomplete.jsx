import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const WIDTH = 220;

export const AutoCompleteWrapper = React.createClass({
  getInitialState: function() {
    return {
      dataSource: [],
    };
  },
  getData: function(inputValue, success, error) {
    $.ajax({
      url: `/cities/${inputValue}`,
      success: (data, textStatus) => {
        success(data);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        if (error) error(jqXHR, textStatus, errorThrown);
      }
    });
  },
  onUpdateInput: function(inputValue) {
    this.getData(inputValue, (data) => {
      this.setState({
        dataSource: data
      });
    });
    this.props.onUpdateInput(inputValue);
  },
  onNewRequest: function() {
    this.__autoComplete.focus();
  },
  render: function() {
    const textFieldStyle = {
      width: `${WIDTH}px`
    };
    const listStyle = {
      width: `${WIDTH}px`
    };
    // console.log(this.props.inputValue);
    return (
      <MuiThemeProvider>
        <AutoComplete
          id={`autocomplete-${Math.round(Math.random() * 1000)}`}
          dataSource={this.state.dataSource}
          onUpdateInput={this.onUpdateInput}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText="city name goes here"
          searchText={this.props.inputValue}
          textFieldStyle={textFieldStyle}
          onNewRequest={this.onNewRequest}
          listStyle={listStyle}
          ref={(el) => this.__autoComplete = el}/>
      </MuiThemeProvider>
    );
  }
});

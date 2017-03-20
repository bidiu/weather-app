import React from "react";
import { Buttonify } from "./common/button.jsx";
import { AutoCompleteWrapper } from './autocomplete.jsx';

export const LocationForm = React.createClass({
  render: function() {
    const formStyle = {
      float: "right",
      margin: this.props.margin,
      padding: "10px",
      width: 220,
      height: 260,
      backgroundColor: "#fff",
      borderRadius: "4px",
      MozBorderRadius: "4px",
      WebkitBorderRadius: "4px",
      MozBoxShadow: "0px 0px 4px #33e7ff",
      WebkitBoxShadow: "0px 0px 4px #33e7ff",
      boxShadow: "0px 0px 4px #33e7ff",
      color: "#555"
    };
    const containerStyle = {
      width: "100%"
    };
    const textStyle = {
      margin: "10px 0 0 0"
    };
    const delimiterStyle = {
      margin: "20px 0",
      backgroundColor: "#ccc",
      width: "100%",
      height: "1px"
    };
    const cityName = this.props.cityName;
    return (
      <form style={formStyle} action="#">
        <div style={containerStyle}>
          <div>
            <div className="location-form-text" style={textStyle}>
              Check the weather in
            </div>
            {/* <input name="cityName" type="text" style={inputStyle} value={cityName}
              placeholder="city name goes here" onChange={this.props.cityInputChgHandler}/> */}
            <AutoCompleteWrapper onUpdateInput={this.props.cityInputChgHandler}/>
            <Buttonify display="block" width="100%" height="36px" opacity="1"
              borderRadius="2px" backgroundColor="#00bcd6" type="submit"
              margin="10px 0" color="#fff" fontWeight="normal" fontSize="14px"
              clickHandler={this.props.weatherThereBtnHandler}>
              Get Weather There
            </Buttonify>
          </div>
          <div style={delimiterStyle}></div>
          <div>
            <div className="location-form-text" style={textStyle}>
              or get weather near me
            </div>
            <Buttonify display="block" width="100%" height="36px" opacity="1"
              borderRadius="2px" backgroundColor="#00bcd6" type="button"
              margin="10px 0" color="#fff" fontWeight="normal" fontSize="14px"
              clickHandler={this.props.myWeatherBtnHandler}>
              Get My Weather
            </Buttonify>
          </div>
        </div>
      </form>
    );
  }
});

import React from "react";
import { Buttonify } from "./common/button.jsx";

export const LocationForm = React.createClass({
  render: function() {
    const formStyle = {
      float: "right",
      margin: this.props.margin,
      padding: "20px",
      width: 180,
      height: 230,
      backgroundColor: "rgba(95, 95, 95, 0.6)",
      borderRadius: "16px",
      MozBorderRadius: "16px",
      WebkitBorderRadius: "16px",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      color: "#fff",
      textShadow: "0 0 8px #aaa"
    };
    const containerStyle = {
      width: 160,
      margin: "0 auto"
    };
    const textStyle = {
      margin: "10px 0"
    };
    const inputStyle = {
      display: "block",
      width: 152,
      height: 32,
      opacity: "1",
      borderRadius: "5px",
      MozBorderRadius: "5px",
      WebkitBorderRadius: "5px",
      borderWidth: 0,
      padding: "0 0 0 8px",
      margin: "10px 0",
      WebkitFilter: "drop-shadow(4px 4px 2px #555)",
      filter: "drop-shadow(4px 4px 2px #555)",
    };
    const cityName = this.props.cityName;
    return (
      <form style={formStyle} action="#">
        <div style={containerStyle}>
          <div>
            <div className="location-form-text" style={textStyle}>
              Check the weather &#64;
            </div>
            <input name="cityName" type="text" style={inputStyle} value={cityName}
              placeholder="city name goes here" onChange={this.props.cityInputChgHandler}/>
            <Buttonify display="block" width="160px" height="32px" opacity="1"
              borderRadius="5px" backgroundColor="rgb(255, 141, 0)" type="submit"
              margin="10px 0" color="#333" fontWeight="bold" fontSize="14px"
              clickHandler={this.props.weatherThereBtnHandler}>
              Get Weather There
            </Buttonify>
          </div>
          <hr style={{ margin: "20px 0" }}/>
          <div>
            <div className="location-form-text" style={textStyle}>
              Get weather near me
            </div>
            <Buttonify display="block" width="160px" height="32px" opacity="1"
              borderRadius="5px" backgroundColor="rgb(255, 141, 0)" type="button"
              margin="10px 0" color="#333" fontWeight="bold" fontSize="14px"
              clickHandler={this.props.myWeatherBtnHandler}>
              Get My Weather
            </Buttonify>
          </div>
        </div>
      </form>
    );
  }
});

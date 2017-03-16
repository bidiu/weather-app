import React from "react";
import { toCelsius, toKelvin, toTitleCase, isCoordStr } from "../utils/helpers.jsx"

export const MainTile = React.createClass({
  // extract coordinate,
  // if failed, return null,
  // have to extract because the GPS location is similar to google maps's url
  // structre, which I stipulated
  extractCoord: function(queryParams) {
    for (let propertyName in queryParams) {
      var vals = isCoordStr(propertyName);
      if (vals) {
        return {
          lon: parseFloat(vals[0]),
          lat: parseFloat(vals[1])
        };
      }
    }
    return null;
  },
  // extract internal key - "@23.23,24.24".
  // which is weather data's identity consisting of coordinate
  // if failed, return null
  extract__key: function(queryParams) {
    for (let propertyName in queryParams) {
      if (isCoordStr(propertyName)) {
        return propertyName;
      }
    }
    return null;
  },
  // get the weather data this tile will show,
  // if __key (from URL query parameters) is invalid or null,
  // or cannot find weather data cooresponding to that __key,
  // this method simply return a empty object
  getWeatherData: function(queryParams) {
    const __key = this.extract__key(queryParams);
    if (!__key || !isCoordStr(__key)) return {};
    const dataList = this.props.weatherDataList;
    for (let data of dataList) {
      if (data.__key === __key) return data;
    }
    return {};
  },
  render: function() {
    const tailStyle = {
      float: this.props.float,
      margin: this.props.margin || 0,
      padding: this.props.padding || 0,
      width: this.props.width || "auto",
      height: this.props.height || "auto",

      backgroundColor: "rgba(95, 95, 95, 0.6)",
      borderRadius: "16px",
      MozBorderRadius: "16px",
      WebkitBorderRadius: "16px",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",

      color: this.props.color || "inherit",
      textShadow: this.props.textShadow || "0 0 0 #000"
    };
    if (this.props.float) tailStyle.float = this.props.float;

    // weather data's internal id (key)
    const queryParams = this.props.queryParams;
    const weatherData = this.getWeatherData(queryParams);
    return (
      <div className="main-tail" style={tailStyle}>
        Hello, world.
      </div>
    );
  }
});

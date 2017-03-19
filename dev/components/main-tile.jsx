import React from "react";
import {
  toCelsius, toKelvin, toTitleCase, isCoordStr,
  toKmPerH, constrainTextLen, formatUTC } from "../utils/helpers.jsx"

const DESC_LEN = 24;

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
  parseSuntime: function(utc) {
    const date = new Date(utc * 1000);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour<10 ? "0"+hour : hour}:${minute<10 ? "0"+minute : minute}`;
  },
  render: function() {
    // weather data's internal id (key)
    const queryParams = this.props.queryParams;
    const weatherData = this.getWeatherData(queryParams);

    const tileStyle = {
      float: this.props.float,
      margin: this.props.margin || 0,
      padding: this.props.padding || 0,
      width: this.props.width || "auto",
      height: this.props.height || "auto",
      color: this.props.color || "inherit",
      textShadow: this.props.textShadow || "0 0 0 #000"
    };
    if (this.props.float) {
      tileStyle.float = this.props.float;
    }
    if (weatherData.__geo) {
      tileStyle.backgroundImage = "url(/images/gps.png)";
      tileStyle.backgroundSize = "28px 28px";
      tileStyle.backgroundRepeat = "no-repeat";
      tileStyle.backgroundPosition = "88% 10%";
    }
    const row1Style = {
      overflow: "auto",
      width: "100%",
    };
    const imgDivStyle = {
      float: "left",
    };
    const imgStyle = {
      width: 100,
      height: 100
    };
    const tempDivStyle = {
      float: "left",
      height: 100,
      margin: "0 0 0 24px",
      fontSize: "56px",
      minWidth: "120px",
      textAlign: "center"
    };
    const cDegreeStyle = {
      fontSize: "52px"
    };
    const minMaxDivStyle = {
      fontSize: "16px"
    };
    const row2Style = {
      margin: "12px 0 0 0",
      fontSize: "14px",
      overflow: "auto",
      width: "100%"
    };
    const windMoreStyle = {
      float: "left",
      width: 134
    };
    const windMoreChildDivStyle = {
      margin: "0 0 10px 0"
    };
    const descMoreStyle = {
      float: "left",
      height: 68,
      padding: "0 0 0 12px",
      margin: "0 0 10px 0",
      borderLeftWidth: "1px",
      borderLeftStyle: "solid"
    };
    const descStyle = {
      fontSize: "20px",
      padding: "4px 0 0 0"
    };
    const suntimeStyle = {
      padding: "16px 0 0 0"
    };
    const cityCountryStyle = {
      marginTop: "32px",
      fontSize: "32px"
    };
    const timestampStyle = {
      marginTop: "4px",
      fontSize: "12px"
    };

    // prepare description
    var description = (weatherData.weather && weatherData.weather.length > 0) ?
        toTitleCase(weatherData.weather[0].description) : "Search a city to show.";
    description = constrainTextLen(description, DESC_LEN);
    // prepare city country
    var cityCountry = "";
    if (weatherData.name) {
      cityCountry += weatherData.name;
      if (weatherData.sys && weatherData.sys.country) {
        cityCountry += (", " + weatherData.sys.country);
      }
    } else {
      cityCountry = null;
    }

    return (
      <div className="maintile" style={tileStyle}>
        <div className="maintile-row1" style={row1Style}>
          <div className="maintile-img" style={imgDivStyle}>
            <img src="/images/sunny.png" alt="sunny icon" title="sunny icon" style={imgStyle}/>
          </div>
          <div className="maintile-temp" style={tempDivStyle}>
            {
              weatherData.main ?
              toCelsius(weatherData.main.temp) :
              "--"
            }<span style={cDegreeStyle}>&deg;C</span>
            <hr style={{ margin: "0 0 10px 0" }}/>
            <div className="maintile-minmax-temp" style={minMaxDivStyle}>
              {
                (weatherData.main && weatherData.main.temp_min) ?
                toCelsius(weatherData.main.temp_min) : "--"
              }&deg;&nbsp;&nbsp;~&nbsp;&nbsp;{
                (weatherData.main && weatherData.main.temp_max) ?
                toCelsius(weatherData.main.temp_max) : "--"
              }&deg;
            </div>
          </div>
        </div>
        <div className="maintile-row2" style={row2Style}>
          <div className="maintile-wind-more" style={windMoreStyle}>
            <div style={windMoreChildDivStyle}>
              Wind:&nbsp;&nbsp;{
                (weatherData.wind && weatherData.wind.speed) ?
                toKmPerH(weatherData.wind.speed) : "--"
              } km&#47;h
            </div>
            <div style={windMoreChildDivStyle}>
              Visibility:&nbsp;&nbsp;{
                weatherData.visibility ? weatherData.visibility : "--"
              } m
            </div>
            <div style={windMoreChildDivStyle}>
              Humidity:&nbsp;&nbsp;{
                (weatherData.main && weatherData.main.humidity) ?
                weatherData.main.humidity : "--"
              }&#37;
            </div>
          </div>
          <div className="maintile-desc-more" style={descMoreStyle}>
            <div style={descStyle}>
              {description}
            </div>
            <div style={suntimeStyle}>
              <span style={{ display: "inline-block", width: "108px" }}>
                Sunrise:&nbsp;&nbsp;{
                  (weatherData.sys && weatherData.sys.sunrise) ?
                      this.parseSuntime(weatherData.sys.sunrise) : "--:--"
                }
              </span>
              <span>
                Sunset:&nbsp;&nbsp;{
                  (weatherData.sys && weatherData.sys.sunset) ?
                      this.parseSuntime(weatherData.sys.sunset) : "--:--"
                }
              </span>
            </div>
          </div>
        </div>
        <div className="maintile-row3">
          <div className="cityCountry" style={cityCountryStyle}>
            {cityCountry}
          </div>
          <div className="dataTimestamp" style={timestampStyle}>
            {
              weatherData.dt ? formatUTC(weatherData.dt) : null
            }
          </div>
        </div>
      </div>
    );
  }
});

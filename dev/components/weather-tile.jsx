import React from "react";
import { toCelsius, toKelvin, toTitleCase } from "../utils/helpers.jsx"

export const TilesContainer = React.createClass({
  render: function() {
    const containerStyle = {
      width: 740,
      overflow: "auto",
      margin: "0 auto",
      padding: "30px"
    };
    const tiles = this.props.weatherDataList.map((weatherData, i) =>
      <WeatherTile weatherData={weatherData}
        key={weatherData.__key}/>
    );
    return (
      <div className="tiles-container" style={containerStyle}>
        {tiles}
      </div>
    );
  }
});

const CITY_NAME_LEN = 14;

export const WeatherTile = React.createClass({
  componentWillUnmount: function() {
    // TODO
    console.log("Tile Unmount!");
  },
  render: function() {
    const weatherData = this.props.weatherData;
    const tileStyle = {
      height: 240,
      width: 200,
      color: "#fff",
      padding: "10px 10px 5px 10px",
      textAlign: "center",
      float: "left",
      backgroundColor: "#aaa",
      WebkitFilter: "drop-shadow(0px 0px 5px #666)",
      filter: "drop-shadow(0px 0px 5px #666)",
      borderRadius: "4px",
      MozBorderRadius: "4px",
      WebkitBorderRadius: "4px",
      margin: "0 13px 39px 13px"
    };
    if (weatherData.__geo) {
      tileStyle.backgroundImage = "url(dev/images/gps.png)";
      tileStyle.backgroundSize = "20px 20px";
      tileStyle.backgroundRepeat = "no-repeat";
      tileStyle.backgroundPosition = "8px 8px";
    }
    const imgStyle = {
      display: "block",
      margin: "5px auto",
      width: 100,
      height: 100
    };
    const cityStyle = {
      textWeight: "bold",
      fontSize: "24px"
    };
    var cityName = (weatherData.weather && weatherData.name) ?
        toTitleCase(weatherData.name) : "————";
    if (cityName.length > CITY_NAME_LEN) {
      cityName = cityName.substring(0, CITY_NAME_LEN - 3) + "...";
    }

    return (
      <a href="#">
        <div className="weather-tile" style={tileStyle}>
          <p className="tile-temperature">
            Temperature:&nbsp;&nbsp;{
              weatherData.main ?
              toCelsius(weatherData.main.temp) :
              "--"
            } &deg;C
          </p>
          <p className="tile-image">
            <img src="dev/images/snow.png" alt="snow icon" title="snow icon" style={imgStyle}/>
          </p>
          <p className="tile-description">
            {
              (weatherData.weather && weatherData.weather.length > 0) ?
              toTitleCase(weatherData.weather[0].description) : "Description not Available"
            }
          </p>
          <p className="tile-city" style={cityStyle}>
            {cityName}
          </p>
        </div>
      </a>
    );
  }
});

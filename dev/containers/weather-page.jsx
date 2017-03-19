import React from "react";
import { hashHistory } from "react-router";
import { Showcase } from "./showcase.jsx";
import { TilesContainer } from "../components/weather-tile.jsx";
import { getCurrentPos } from "../utils/geolocation.jsx";
import { API_KEY, CUR_WEATHER_ENDPOINT } from "../utils/weather-api.jsx";

const INITIAL_TILE_NUM = 3;

export const WeatherPage = React.createClass({
  getInitialState: function() {
    const dummpyData = {
      __dummy: true
    };
    return {
      weatherDataList: new Array(INITIAL_TILE_NUM).fill(dummpyData),
      __dummyCnt: INITIAL_TILE_NUM,
      cityInput: ''
    };
  },
  addToDataList: function(data) {
    const weatherDataList = this.state.weatherDataList;
    var index = -1;
    const exist = weatherDataList.some((el, i) =>
      (el.__key === data.__key || el.__geo && el.__geo === data.__geo) ?
      (index = i, true) : false
    );
    if (exist) {
      // city already been searched
      weatherDataList[index] = data;
    } else if (this.state.__dummyCnt > 0) {
      weatherDataList.pop();
      weatherDataList.unshift(data);
      this.state.__dummyCnt--;
    } else {
      weatherDataList.unshift(data);
    }
    return weatherDataList;
  },
  cityInputChgHandler: function(e) {
    this.setState({
      cityInput: e.target.value
    });
  },
  weatherThereBtnHandler: function(e) {
    const city = this.state.cityInput.trim();
    if (city.length > 0) {
      this.setState({ cityInput: "" });
      $.ajax({
        url: `${CUR_WEATHER_ENDPOINT}?q=${city}&APPID=${API_KEY}`,
        success: (data, textStatus) => {
          data.__key = data.coord ? ("@" + data.coord.lat + "," + data.coord.lon) : data.name;
          data.__geo = false;
          const weatherDataList = this.addToDataList(data);
          hashHistory.push(`/?${data.__key}`);
          this.setState({
            weatherDataList: weatherDataList,
            keyJustFetched: data.__key
          });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 404 || jqXHR.status === 502) {
            alert("Cannot find any weather data of your specified city.");
          } else {
            alert("Failed to fetch weather data.");
          }
        }
      });
    }
  },
  myWeatherBtnHandler: function(e) {
    getCurrentPos((coord) => {
      $.ajax({
        url: `${CUR_WEATHER_ENDPOINT}?lat=${coord.latitude}&lon=${coord.longitude}&APPID=${API_KEY}`,
        success: (data, textStatus) => {
          data.__key = data.coord ? ("@" + data.coord.lat + "," + data.coord.lon) : data.name;
          data.__geo = true;
          const weatherDataList = this.addToDataList(data);
          hashHistory.push(`/?${data.__key}`);
          this.setState({
            weatherDataList: weatherDataList,
            keyJustFetched: data.__key
          });
        },
        error: function() {
          alert("Failed to fetch weather data.");
        }
      });
    });
  },
  focusSwitchedCallback: function() {
    this.setState({
      keyJustFetched: null
    });
  },
  componentWillUnmount: function() {
    // TODO
    console.log("WeatherPage Unmount!");
  },
  render: function() {
    return (
      <div>
        <Showcase
          offset="46px" padding="10px" width="780px" height="360px"
          backgroundImage="url(/images/showcase-default.jpg)"
          cityName={this.state.cityInput}
          coverRatio="0.1" myWeatherBtnHandler={this.myWeatherBtnHandler}
          cityInputChgHandler={this.cityInputChgHandler}
          weatherThereBtnHandler={this.weatherThereBtnHandler}
          weatherDataList={this.state.weatherDataList}
          queryParams={this.props.location.query}/>
        <TilesContainer weatherDataList={this.state.weatherDataList}
          keyJustFetched={this.state.keyJustFetched}
          focusSwitchedCallback={this.focusSwitchedCallback}/>
      </div>
    );
  }
});

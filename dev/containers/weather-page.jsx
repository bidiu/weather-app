import React from "react";
import { hashHistory } from "react-router";
import { ProgressBar } from "../components/common/progress-bar.jsx"
import { Showcase } from "./showcase.jsx";
import { TilesContainer } from "../components/weather-tile.jsx";
import { getCurrentPos } from "../utils/geolocation.jsx";
import { API_KEY, CUR_WEATHER_ENDPOINT } from "../utils/weather-api.jsx";

const INITIAL_TILE_NUM = 3;
/* following is progress bar related */
const START_INTERVAL = 10;
const FINISH_INTERVAL = 1;
const STOP_PROGRESS = 75;

export const WeatherPage = React.createClass({
  getInitialState: function() {
    const dummpyData = {
      __dummy: true
    };
    return {
      weatherDataList: new Array(INITIAL_TILE_NUM).fill(dummpyData),
      __dummyCnt: INITIAL_TILE_NUM,
      cityInput: '',
      // following is progress related
      progress: 0,
      visible: false
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
  cityInputChgHandler: function(inputValue) {
    this.setState({
      cityInput: inputValue
    });
  },
  // return increased progress
  increaseProgress: function(amount) {
    const nextProgress = this.state.progress + amount;
    this.setState({
      progress: nextProgress
    });
    return nextProgress;
  },
  startProgressBar: function() {
    if (this.state.visible) return false;
    this.setState({
      visible: true
    });
    this.timerId = setInterval(() => {
      const progress = this.increaseProgress(0.1);
      if (progress >= STOP_PROGRESS) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }, START_INTERVAL);
    return true;
  },
  finishProgressBar: function() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(() => {
      const progress = this.increaseProgress(1);
      if (progress >= 100) {
        clearInterval(this.timerId);
        this.timerId = null;
        this.setState({
          visible: false,
          progress: 0
        });
      }
    }, FINISH_INTERVAL);
  },
  weatherThereBtnHandler: function(e) {
    const city = this.state.cityInput.trim();
    if (city.length > 0) {
      const triggered = this.startProgressBar();
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
          if (triggered) this.finishProgressBar();
        },
        error: (jqXHR, textStatus, errorThrown) => {
          if (triggered) this.finishProgressBar();
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
    const triggered = this.startProgressBar();
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
          if (triggered) this.finishProgressBar();
        },
        error: () => {
          if (triggered) this.finishProgressBar();
          alert("Failed to fetch weather data.");
        }
      });
    }, (code) => {
      if (triggered) this.finishProgressBar();
    });
  },
  focusSwitchedCallback: function() {
    this.setState({
      keyJustFetched: null
    });
  },
  componentWillUnmount: function() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  },
  render: function() {
    return (
      <div>
        <ProgressBar backgroundColor="#222" foregroundColor="#a1dce3"
          progress={this.state.progress} visible={this.state.visible}/>
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

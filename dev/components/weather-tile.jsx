import React from "react";
import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from "react-router";
import { toCelsius, toKelvin, toTitleCase, isCoordStr, constrainTextLen } from "../utils/helpers.jsx"

export const TilesContainer = React.createClass({
  getInitialState() {
    return {
      __tiles: []
    }
  },
  focusGotCallback: function(__key) {
    for (let tile of this.state.__tiles) {
      if (tile.__key !== __key) {
        tile.blurCallback();
      }
    }
  },
  render: function() {
    const containerStyle = {
      width: 740,
      overflow: "auto",
      margin: "0 auto",
      padding: "30px"
    };
    const tiles = this.props.weatherDataList.map((weatherData, i) =>
      <WeatherTile weatherData={weatherData} {...this.props}
        __tiles={this.state.__tiles}
        focusGotCallback={this.focusGotCallback}
        key={weatherData.__key ? weatherData.__key : i.toString()}/>
    );
    return (
      <div className="tiles-container" style={containerStyle}>
        {tiles}
      </div>
    );
  }
});

const DESC_LEN = 20;
const CITY_NAME_LEN = 14;

export const WeatherTile = React.createClass({
  getInitialState: function() {
    return {
      focused: false,
      divClass: "weather-tile"
    };
  },
  componentDidMount: function() {
    const __key = this.props.weatherData.__key;
    const __tiles = this.props.__tiles;
    __tiles.push({
      __key: __key,
      blurCallback: this.blurCallback,
      focusCallback: this.becomeFocus
    });
    if (isCoordStr(__key)) {
      this.becomeFocus(true);
    }
    // __this is the component
    // 'this' will be the target element
    const __this = this;
    $(this.__div).click(function(e) {
      if (!isCoordStr(__key) || __this.isFocused()) {
        // current tile is a dummy tile or focused
        return;
      }
      __this.props.focusSwitchedCallback();
      __this.becomeFocus(false);
    });
    $(this.__div).hover(function(e) {
      if (__this.isFocused() || __this.isDummy()) return;
      __this.setState({
        divClass: "weather-tile-hover"
      });
    }, function(e) {
      if (! __this.isFocused()) {
      //   __this.setState({
      //     divClass: "weather-tile-active"
      //   });
      // } else {
        __this.setState({
          divClass: "weather-tile"
        });
      }
    });
  },
  componentWillReceiveProps(nextProps) {
    const __key = this.props.weatherData.__key;
    const keyRecv = nextProps.keyJustFetched;
    if (!this.isFocused() && __key && (__key === keyRecv)) {
      this.becomeFocus(false);
    }
  },
  componentWillUnmount: function() {
    const __key = this.props.weatherData.__key
    if (! isCoordStr(__key)) {
      // current tile is a dummy tile
      return;
    }
    const __tiles = this.props.__tiles;
    for (let i = 0; i < __tiles.length; i++) {
      if (__tiles[i].__key === __key) {
        __tiles.splice(i, 1);
        return;
      }
    }
  },
  blurCallback: function() {
    if (this.isFocused()) {
      this.setState({
        focused: false,
        divClass: "weather-tile"
      });
    }
  },
  becomeFocus: function(newlyMnted) {
    console.log(this.props.weatherData.name + " trying to be focused");
    if (! newlyMnted) {
      $("html body").animate({
        scrollTop: 0
      }, 100);
    }
    this.setState({
      focused: true,
      divClass: "weather-tile-active"
    });
    this.props.focusGotCallback(this.props.weatherData.__key);
  },
  isFocused: function() {
    return this.state.focused;
  },
  isDummy: function() {
    return ( this.props.weatherData.__key ? false : true );
  },
  render: function() {
    const weatherData = this.props.weatherData;
    const tileStyle = {
      height: 240,
      width: 200,
      color: "#fff",
      textShadow: "0 0 8px #888",
      padding: "10px 10px 5px 10px",
      textAlign: "center",
      float: "left",
      backgroundColor: "#ccc",
      borderRadius: "4px",
      MozBorderRadius: "4px",
      WebkitBorderRadius: "4px",
      margin: "0 13px 36px 13px"
    };
    if (weatherData.__geo) {
      tileStyle.backgroundImage = "url(dev/images/gps-black.png)";
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
      <Link to={
        (weatherData.__key && isCoordStr(weatherData.__key)) ?
        `/?${weatherData.__key}` : null
      } activeClassName="active-tile">
        <div className={this.state.divClass} style={tileStyle}
          ref={(el) => this.__div = el}>
          <p className="tile-temperature">
            {
              weatherData.main ?
              toCelsius(weatherData.main.temp) :
              "--"
            } &deg;C
          </p>
          <p className="tile-image">
            <img src="dev/images/default.png" alt="default icon" title="default icon" style={imgStyle}/>
          </p>
          <p className="tile-description">
            {
              (weatherData.weather && weatherData.weather.length > 0) ?
              constrainTextLen(toTitleCase(weatherData.weather[0].description), DESC_LEN) :
              "Search a city to show"
            }
          </p>
          <p className="tile-city" style={cityStyle}>
            {cityName}
          </p>
        </div>
      </Link>
    );
  }
});

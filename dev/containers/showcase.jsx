import React from "react";
import { MainTile } from "../components/main-tile.jsx";
import { LocationForm } from "../components/location-form.jsx";

export const Showcase = React.createClass({
  render: function() {
    const outerStyle = {
      width: "100%",
      margin: this.props.offset + " 0 0 0",
      padding: "0px",
      backgroundImage: this.props.backgroundImage,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    };
    const coverStyle = {
      width: "100%",
      height: "100%",
      backgroundColor: `rgba(0, 0, 0, ${this.props.coverRatio})`,
    };
    const innerStyle = {
      width: this.props.width,
      height: this.props.height,
      margin: "0 auto",
      padding: this.props.padding
    };

    return (
      <div style={outerStyle}>
        <div style={coverStyle}>
          <div style={innerStyle}>
            <MainTile float="left" margin="24px 0 0 30px" padding="20px 10px"
              width="460px" height="272px" color="#fff" textShadow="0 0 12px #333"
              queryParams={this.props.queryParams} weatherDataList={this.props.weatherDataList}/>
            <LocationForm margin="40px 30px 0 0"
              cityName={this.props.cityName}
              cityInputChgHandler={this.props.cityInputChgHandler}
              weatherThereBtnHandler={this.props.weatherThereBtnHandler}
              myWeatherBtnHandler={this.props.myWeatherBtnHandler}/>
          </div>
        </div>
      </div>
    );
  }
});

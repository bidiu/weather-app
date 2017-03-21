import React from 'react';
import { ProgressBar } from './progress-bar.jsx';

// progress bar wrapper, easier to use than bare ProgressBar,
// but less flexible

const START_INTERVAL = 10;
const FINISH_INTERVAL = 1;
const STOP_PROGRESS = 75;

export const ProgressBarWrapper = React.createClass({
  getInitialState: function() {
    return {
      progress: 0,
      visible: false
    };
  },
  increaseProgress: function(amount) {
    const nextProgress = this.state.progress + amount;
    this.setState({
      progress: nextProgress
    });
    return nextProgress;
  },
  startProgressBar: function() {
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
  componentDidMount: function() {
    if (this.props.isActivated) {
      this.startProgressBar();
    }
  },
  componentWillReceiveProps: function(nextProps) {
    const curProps = this.props;
    if (curProps.isActivated === nextProps.isActivated) return;
    if (!curProps.isActivated && nextProps.isActivated) {
      this.startProgressBar();
    } else {
      this.finishProgressBar();
    }
  },
  render: function() {
    return (
      <ProgressBar backgroundColor={this.props.style.backgroundColor}
        foregroundColor={this.props.style.foregroundColor}
        progress={this.state.progress} visible={this.state.visible}/>
    );
  }
});

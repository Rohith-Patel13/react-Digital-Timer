// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isStartButtonClicked: false,
    timerLimitValue: 25,
    min: 25,
    sec: 0,
    timeLeft: 59,
    defaultPage: true,
  }

  componentDidUpdate() {
    const {min, sec} = this.state
    if (min === 0 && sec === 0) {
      clearInterval(this.secondsUniqueId)
      this.setState({
        isStartButtonClicked: false,
        timerLimitValue: 25,
        min: 25,
        sec: 0,
        timeLeft: 59,
        defaultPage: true,
      })
    }
  }

  StartNdPauseClicked = () => {
    this.setState(prevState => ({
      isStartButtonClicked: !prevState.isStartButtonClicked,
      defaultPage: false,
    }))

    const {isStartButtonClicked, min, timerLimitValue} = this.state

    if (!isStartButtonClicked) {
      if (min === timerLimitValue) {
        this.setState(prevState => ({
          min: prevState.min - 1,
          sec: prevState.timeLeft,
        }))
      } else {
        this.setState(prevState => ({
          min: prevState.min,
          sec: prevState.timeLeft,
        }))
      }

      this.secondsUniqueId = setInterval(() => {
        const {sec} = this.state
        if (sec === 0) {
          this.setState(prevState => ({
            timeLeft: 60,
            min: prevState.min - 1,
          }))
        }
        this.setState(prevState => ({
          sec: prevState.timeLeft - 1,
          timeLeft: prevState.timeLeft - 1,
        }))
      }, 1000)
    }

    if (isStartButtonClicked) {
      clearInterval(this.secondsUniqueId)
    }
  }

  decrementClicked = () => {
    const {defaultPage, timerLimitValue} = this.state
    if (defaultPage && timerLimitValue > 0) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue - 1,
        min: prevState.min - 1,
      }))
    }
  }

  incrementClicked = () => {
    const {defaultPage} = this.state
    if (defaultPage) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue + 1,
        min: prevState.min + 1,
      }))
    }
  }

  resetBtnClicked = () => {
    clearInterval(this.secondsUniqueId)
    this.setState({
      isStartButtonClicked: false,
      timerLimitValue: 25,
      min: 25,
      sec: 0,
      timeLeft: 59,
      defaultPage: true,
    })
  }

  functionToTimerEnds = () => {
    clearInterval(this.secondsUniqueId)
    this.setState({
      isStartButtonClicked: false,
      timerLimitValue: 25,
      min: 25,
      sec: 0,
      timeLeft: 59,
      defaultPage: true,
    })
  }

  render() {
    console.log('render')
    const {isStartButtonClicked, timerLimitValue, min, sec} = this.state

    const startOrPause = isStartButtonClicked
      ? {
          imgUrl: 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
          altText: 'pause icon',
          text: 'Pause',
          timerStatus: 'Running',
        }
      : {
          imgUrl: 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
          altText: 'play icon',
          text: 'Start',
          timerStatus: 'Paused',
        }
    const {imgUrl, altText, text, timerStatus} = startOrPause
    const seconds = sec.toString()
    const renderSec = () => {
      if (seconds.length === 1) {
        return `0${seconds}`
      }
      return seconds
    }

    const timerLimitValueStr = timerLimitValue.toString()
    const renderTimerLimitValue = () => {
      if (timerLimitValueStr.length === 1) {
        return `0${timerLimitValueStr}`
      }
      return timerLimitValueStr
    }

    const minutes = min.toString()
    const renderMin = () => {
      if (minutes.length === 1) {
        return `0${minutes}`
      }
      return minutes
    }

    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="bgImageMain">
          <div className="bgImage">
            <div className="whiteColoredBg">
              <h1 className="timer">
                {renderMin()}:{renderSec()}
              </h1>
              <p>{timerStatus}</p>
            </div>
          </div>
          <div className="clockContainer">
            <div className="startAndPauseContainer">
              <div className="startContainer">
                <button
                  type="button"
                  className="btnStartNdPause"
                  onClick={this.StartNdPauseClicked}
                >
                  <img src={imgUrl} alt={altText} className="imageIcon" />
                </button>
                <button
                  type="button"
                  className="btnStartNdPause"
                  onClick={this.StartNdPauseClicked}
                >
                  {text}
                </button>
              </div>
              <div className="resetContainer">
                <button
                  type="button"
                  className="btnStartNdPause"
                  onClick={this.resetBtnClicked}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="imageIcon"
                  />
                </button>
                <button
                  type="button"
                  className="btnStartNdPause"
                  onClick={this.resetBtnClicked}
                >
                  Reset
                </button>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="increaseDecreaseContainer">
              <button
                type="button"
                className="incrementNdDecrement"
                onClick={this.decrementClicked}
              >
                -
              </button>
              <div className="numberContainer">
                <p>{renderTimerLimitValue()}</p>
              </div>
              <button
                type="button"
                className="incrementNdDecrement"
                onClick={this.incrementClicked}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

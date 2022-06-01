import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: '00',
    timeLimit: 25,
    isStart: false,
    isDisabled: false,
  }

  onTimerStartedOrPaused = () => {
    const {isStart} = this.state

    if (isStart) {
      this.setState({isDisabled: true})
      this.timer = setInterval(() => this.tick(), 1000)
    } else {
      clearInterval(this.timer)
    }
  }

  onToggleTimer = async () => {
    // TODO: some error is here. Need to solve it on next start! (start and pause after timer stops with 00:00)
    const {minutes} = this.state
    console.log({minutes})
    await this.setState(prevState => ({
      isStart: !prevState.isStart,
      minutes: prevState.minutes === '00' ? 25 : prevState.minutes,
    }))
    this.onTimerStartedOrPaused()
  }

  tick = () => {
    const {minutes, seconds} = this.state

    let minutesValue = parseInt(minutes)
    let secondsValue = parseInt(seconds) - 1

    if (minutesValue === 0 && secondsValue === 0) {
      clearInterval(this.timer)
      minutesValue = `0${minutesValue}`
      secondsValue = `0${secondsValue}`
      this.setState(prevState => ({
        isStart: !prevState.isStart,
        timeLimit: 25,
        isDisabled: false,
      }))
    } else {
      if (secondsValue === -1 && minutesValue !== 0) {
        minutesValue -= 1
        secondsValue = 59
      }

      if (secondsValue < 10 && minutesValue < 10) {
        minutesValue = `0${minutesValue}`
        secondsValue = `0${secondsValue}`
      } else if (minutesValue < 10 && secondsValue === 60) {
        minutesValue = `0${minutesValue}`
        secondsValue = `0${0}`
      } else if (secondsValue >= 10 && minutesValue < 10) {
        minutesValue = `0${minutesValue}`
        secondsValue = `${secondsValue}`
      } else if (secondsValue >= 10 && minutesValue >= 10) {
        minutesValue = `${minutesValue}`
        secondsValue = `${secondsValue}`
      } else if (secondsValue < 10 && minutesValue >= 10) {
        minutesValue = `${minutesValue}`
        secondsValue = `0${secondsValue}`
      }
    }
    this.setState({minutes: `${minutesValue}`, seconds: `${secondsValue}`})
  }

  onDecreaseTimeLimit = () => {
    const {minutes} = this.state

    let minutesValue = minutes !== 0 && minutes !== '00' ? minutes - 1 : 0

    minutesValue = minutesValue < 10 ? `0${minutesValue}` : `${minutesValue}`

    this.setState(prevState => ({
      timeLimit: prevState.timeLimit !== 0 ? prevState.timeLimit - 1 : 0,
      minutes: minutesValue,
    }))
  }

  onIncreaseTimeLimit = () => {
    const {minutes} = this.state

    let minutesValue = parseInt(minutes) + 1

    minutesValue = minutesValue < 10 ? `0${minutesValue}` : `${minutesValue}`

    this.setState(prevState => ({
      timeLimit: prevState.timeLimit + 1,
      minutes: minutesValue,
    }))
  }

  onReset = async () => {
    await this.setState({
      minutes: 25,
      seconds: '00',
      timeLimit: 25,
      isStart: false,
      isDisabled: false,
    })
    this.onTimerStartedOrPaused()
  }

  render() {
    const {isStart, minutes, seconds, timeLimit, isDisabled} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="main-container">
          <div className="timer-container">
            <div className="timer-display-container">
              <h1 className="time">
                {minutes}:{seconds}
              </h1>
              <p className="timer-status-description">
                {isStart ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-control-container">
            <div className="controlling-buttons-container">
              <button
                type="button"
                className="start-stop-reset-button"
                onClick={this.onToggleTimer}
              >
                {isStart ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="start-stop-reset-icon"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="start-stop-reset-icon"
                  />
                )}
                <p className="start-stop-description">
                  {isStart ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                type="button"
                className="start-stop-reset-button"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="start-stop-reset-icon"
                />
                <p className="start-stop-description">Reset</p>
              </button>
            </div>
            <p className="timer-limit-description">Set Timer limit</p>
            <div className="time-change-container">
              <button
                type="button"
                className="time-change-button"
                onClick={this.onDecreaseTimeLimit}
                disabled={isDisabled}
              >
                -
              </button>
              <p className="time-limit-display">{timeLimit}</p>
              <button
                type="button"
                className="time-change-button"
                onClick={this.onIncreaseTimeLimit}
                disabled={isDisabled}
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

import React from 'react';
import ReactDOM from 'react-dom';

let timer;

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    // sessionLength, breakLength and lengthModifier in minutes.
    // sessionTimeLeft and breakTimeLeft [minutes, seconds].
    this.state = { sessionLength: 1,
                   breakLength: 1,
                   sessionRunning: false,
                   breakRunning: false,
                   sessionTimeLeft: '01:00',
                   breakTimeLeft: '01:05'
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeTimerDuration = this.changeTimerDuration.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
    this.runTimerSession = this.runTimerSession.bind(this);
    this.stopTimerSession = this.stopTimerSession.bind(this);
    this.runTimerBreak = this.runTimerBreak.bind(this);
    this.stopTimerBreak = this.stopTimerBreak.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;
    const maxDuration = 60;
    const minDuration = 1;
    const doIncrement = true;
    const sessionLength = this.state.sessionLength;
    const breakLength = this.state.breakLength;

    if (id === "session-increment") {
      this.changeTimerDuration('sessionLength', sessionLength, maxDuration, 
        doIncrement);
    } else if (id === "session-decrement") {
      this.changeTimerDuration('sessionLength', sessionLength, minDuration, 
        !doIncrement);
    } else if (id === "break-increment") {
      this.changeTimerDuration('breakLength', breakLength, maxDuration, 
        doIncrement);
    } else if (id === "break-decrement") {
      this.changeTimerDuration('breakLength', breakLength, minDuration, 
        !doIncrement);
    } else if (id === "start_stop") {
      if (!this.state.sessionRunning && !this.state.breakRunning) {
        this.setState({ sessionRunning: true });
        this.runTimerSession();
      } else if (this.state.sessionRunning) {
        this.stopTimerSession();
      } else if (this.state.breakRunning) {
        this.stopTimerBreak();
      }
    } else if (id === "reset") {
      this.restartTimer();
    } 
  }

  changeTimerDuration(name, timerDuration, limit, doIncrement) {
    // Not clean. Same code, != conditionals. Verbose.
    const lengthModifier = doIncrement ? 1 : -1;
    // const timerRunning = name === 'sessionLength' ? 
    //  this.state.sessionRunning : this.state.breakRunning;

    if (doIncrement) {
      timerDuration < limit ?
        this.setState(prevState => 
          ({ [name]: 
            prevState[name] + lengthModifier }))
        :
        this.setState({ [name]: limit });
    } else {
      timerDuration > limit ?
        this.setState(prevState => 
          ({ [name]: 
            prevState[name] + lengthModifier }))
        :
        this.setState({ [name]: limit });
    }
    // update timeLefts in accord with sessionLength and breakLength.
    this.setState(prevState => 
      ({ sessionTimeLeft: prevState.sessionLength < 10 ?
          '0' + prevState.sessionLength.toString() + ':00'
          :
          prevState.sessionLength.toString() + ':00',
         breakTimeLeft: prevState.breakLength < 10 ?
           '0' + prevState.breakLength.toString() + ':00'
           :
           prevState.breakLength.toString() + ':00' })
      );
  }

  // I should combine runTimerSession and runTimerBreak in one runTimer function.
  // Same with stopTimerSession and stopTimerBreak.
  runTimerSession() {
    // extract minutes and seconds from time left.
    let minutes = this.state.sessionTimeLeft.split(':').map(n => Number(n))[0];
    let seconds = this.state.sessionTimeLeft.split(':').map(n => Number(n))[1];
    
    // if neccesary restore break time left.
    
    // if 00:00 then stop the session timer and start the break.
    if (minutes === 0 && seconds === 0) {
      this.setState({ sessionRunning: false,
                      breakRunning: true,
                      sessionTimeLeft: '00:00'
      });
      this.runTimerBreak();
    } else if (minutes >= 0) {
      // let the ternary operator attack begin!
      minutes = (seconds === 0) ? minutes - 1 : minutes;
      seconds = (seconds - 1 < 0 ) ? 59 : seconds - 1;
      let secondsString = seconds < 10 ? '0' + seconds.toString() 
        : seconds.toString();
      let minutesString = minutes < 10 ? '0' + minutes.toString() 
        : minutes.toString();
      let updatedTimeLeft = minutesString + ':' + secondsString;
      this.setState({ sessionTimeLeft: updatedTimeLeft });
      timer = setTimeout(this.runTimerSession, 1000);
    }
  }

  runTimerBreak() {
    // extract minutes and seconds from time left.
    let minutes = this.state.breakTimeLeft.split(':').map(n => Number(n))[0];
    let seconds = this.state.breakTimeLeft.split(':').map(n => Number(n))[1];
    
    // if 00:00 then stop the break timer and start the session.
    if (minutes === 0 && seconds === 0) {
      this.setState({ sessionRunning: true,
                      breakRunning: false,
                      breakTimeLeft: '00:00'
      });
      this.runTimerSession();
    } else if (minutes >= 0) {
      // let the ternary operator attack begin!
      minutes = (seconds === 0) ? minutes - 1 : minutes;
      seconds = (seconds - 1 < 0 ) ? 59 : seconds - 1;
      let secondsString = seconds < 10 ? '0' + seconds.toString() 
        : seconds.toString();
      let minutesString = minutes < 10 ? '0' + minutes.toString() 
        : minutes.toString();
      let updatedTimeLeft = minutesString + ':' + secondsString;
      this.setState({ breakTimeLeft: updatedTimeLeft });
      timer = setTimeout(this.runTimerBreak, 1000);
    }
  }

  stopTimerSession() {
    this.setState({ sessionRunning: false });
    clearTimeout(timer);
  }


  stopTimerBreak() {
    this.setState({ breakRunning: false})
    clearTimeout(timer);
  }

  restartTimer() {
    this.setState({ sessionLength: 25,
                    breakLength: 5,
                    sessionRunning: false,
                    breakRunning: false,
                    sessionTimeLeft: '25:00',
                    breakTimeLeft: '05:00'
      });
  }

  render() {
    return (
      <div>
        <Display 
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
          sessionTimeLeft={this.state.sessionTimeLeft}
          breakTimeLeft={this.state.breakTimeLeft}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

function Display(props) {
  let timerToDisplay = props.sessionTimeLeft === '00:00' ? 
    props.breakTimeLeft : props.sessionTimeLeft;

  return (
    <div>
      <div id="session-label">
        Session Length
        <div id="session-length">
          {props.sessionLength}
        </div>
      </div>

      <div id="break-label">
        Break Length
        <div id="break-length">
          {props.breakLength}
        </div>
      </div>

      <div id="timer-label">
        Session
        <div id="time-left">
          {timerToDisplay}
        </div>
      </div>

      <div className="buttons-container">
        <button id="session-increment" onClick={props.handleClick}>
          session increment
        </button>
        <button id="session-decrement" onClick={props.handleClick}>
          session decrement
        </button>
        <button id="break-increment" onClick={props.handleClick}>
          break increment
        </button>
        <button id="break-decrement" onClick={props.handleClick}>
          break decrement
        </button>
        <button id="start_stop" onClick={props.handleClick}>
          start/stop
        </button>
        <button id="reset" onClick={props.handleClick}>
          reset
        </button>
      </div>
    </div>
  );
}


//======================================================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
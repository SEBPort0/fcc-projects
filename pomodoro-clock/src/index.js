import React from 'react';
import ReactDOM from 'react-dom';

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    // sessionLength, breakLength and lengthModifier in minutes.
    // sessionTimeLeft and breakTimeLeft [minutes, seconds].
    this.state = { sessionLength: 25,
                   breakLength: 5,
                   sessionRunning: false,
                   breakRunning: false,
                   sessionTimeLeft: '25:00',
                   breakTimeLeft: '05:00'
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeTimerDuration = this.changeTimerDuration.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;
    const maxDuration = 60;
    const minDuration = 1;
    const doIncrement = true;

    if (id === "session-increment") {
      this.changeTimerDuration('sessionLength', this.state.sessionLength, 
        maxDuration, doIncrement);
    } else if (id === "session-decrement") {
      this.changeTimerDuration('sessionLength', this.state.sessionLength, 
        minDuration, !doIncrement);
    } else if (id === "break-increment") {
      this.changeTimerDuration('breakLength', this.state.breakLength, 
        maxDuration, doIncrement);
    } else if (id === "break-decrement") {
      this.changeTimerDuration('breakLength', this.state.breakLength,
        minDuration, !doIncrement);
    } else if (id === "start_stop") {
      // start the timer.
      let timer = setInterval(this.runTimer, 1000);

      if (!this.state.sessionRunning) {
        this.setState({ sessionRunning: true });
      } else {
        // stop the timer.
        this.setState({ sessionRunning: false });
        clearInterval(timer); 
      }
    } else if (id === "reset") {
      this.reset();
    } 
  }

  changeTimerDuration(name, timerDuration, limit, doIncrement) {
    // Not clean. Same code, != conditionals. Verbose.
    const lengthModifier = doIncrement ? 1 : -1;

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
      ({ sessionTimeLeft: prevState.sessionLength.toString() + ':00',
         breakTimeLeft: prevState.breakLength.toString() + ':00' }));
  }
  
  runTimer() {
     return undefined;
  }

  reset() {
    this.setState({ sessionLength: 25,
                    breakLength: 5,
                    sessionRunning: false,
                    breakRunning: false,
                    sessionTimeLeft: '25:00',
                    breakTimeLeft: '5:00'
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
          {props.sessionTimeLeft}
        </div>
      </div>

      <div className="buttons-container">
        <button id="session-increment" onClick={props.handleClick}>
          session-increment
        </button>
        <button id="session-decrement" onClick={props.handleClick}>
          session-decrement
        </button>
        <button id="break-increment" onClick={props.handleClick}>
          break-increment
        </button>
        <button id="break-decrement" onClick={props.handleClick}>
          break-decrement
        </button>
        <button id="start_stop" onClick={props.handleClick}>
          start_stop
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
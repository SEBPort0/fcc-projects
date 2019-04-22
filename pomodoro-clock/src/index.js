import React from 'react';
import ReactDOM from 'react-dom';

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sessionLength: 25,
                   breakLength: 5,
                   lengthModifier: 1,
                   timerRunning: false,
                   timeLeft: '25:00'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;
    const maxDuration = 60;
    const minDuration = 1;
    const increment = true;

    if (id === "session-increment") {
      this.changeDuration('sessionLength', this.state.sessionLength, 
        maxDuration, increment);
    } else if (id === "session-decrement") {
      this.changeDuration('sessionLength', this.state.sessionLength, 
        minDuration, !increment);
    } else if (id === "break-increment") {
      this.changeDuration('breakLength', this.state.breakLength, 
        maxDuration, increment);
    } else if (id === "break-decrement") {
      this.changeDuration('breakLength', this.state.breakLength,
        minDuration, !increment);
    } else if (id === "reset") {
      this.reset();
    } 
  }

  changeDuration(timerName, timerLength, limitLength, increment) {
    // Not clean. Same code, != conditionals. Verbose.
    if (increment) {
      timerLength < limitLength ?
        this.setState(prevState => 
          ({ [timerName]: 
            prevState[timerName] + prevState.lengthModifier }))
        :
        this.setState({ [timerName]: limitLength });
    }
    else {
      timerLength > limitLength ?
        this.setState(prevState => 
          ({ [timerName]: 
            prevState[timerName] - prevState.lengthModifier }))
        :
        this.setState({ [timerName]: limitLength });
    }
  }

  reset() {
    this.setState({ sessionLength: 25,
                      breakLength: 5,
                      timerRunning: false,
                      timeLeft: '25:00'
      });
  }

  render() {
    return (
      <div>
        <Display 
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
          timeLeft={this.state.timeLeft}
          handleClick={this.handleClick}
        />
        <Clock />
      </div>
    );
  }

}

function Clock(props) {
  return null;
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
          {props.timeLeft}
        </div>
      </div>

      <div className="timer-buttons">
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
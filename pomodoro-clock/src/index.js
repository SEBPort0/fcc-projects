import React from 'react';
import ReactDOM from 'react-dom';

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sessionLength: 25,
                   breakLength: 5,
                   sessionIncrement: 1,
                   breakIncrement: 1,
                   sessionDecrement: 1,
                   breakDecrement: 1,
                   sessionRunning: false,
                   breakRunning: false
    };


  }

  render() {
    return (
      <div>
        <Display 
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
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

    </div>
  );
}


//======================================================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
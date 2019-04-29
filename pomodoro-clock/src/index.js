import React from 'react';
import ReactDOM from 'react-dom';

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    // [breakLength, sessionLength] = minutes.
    // [timeLeft] = seconds.
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'session',
      timeLeft: 25 * 60,
      isTimerRunning: false,
      timerInterval: null, 
      audioUrl: 'http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav'
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeTimerDuration = this.changeTimerDuration.bind(this);
    this.countdownTimer = this.countdownTimer.bind(this);
    this.checkTimer = this.checkTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  
  handleClick(event) {
    const increment = true;
    
    if(this.state.isTimerRunning) { 
      return null; 
    }
    this.setState({ timerLabel: 'session' });
    switch(event.target.id) {
      case "break-decrement":
        this.changeTimerDuration('breakLength', this.state.breakLength, 
          !increment);
        break;
      case "break-increment":
        this.changeTimerDuration('breakLength', this.state.breakLength, 
          increment);
        break;
      case "session-decrement":
        this.changeTimerDuration('sessionLength', this.state.sessionLength, 
          !increment);
        break;
      case "session-increment":
        this.changeTimerDuration('sessionLength', this.state.sessionLength, 
          increment);
        break;
    }
  }

  changeTimerDuration(timerName, timerLength, increment) {
    const lengthModifier = increment ? 1 : -1;
    const limit = increment ? 60 : 1;

    if(this.state[timerName] !== limit) { 
      this.setState(prevState => ({ 
        [timerName]: prevState[timerName] + lengthModifier
      }));
      this.setState(prevState => ({
        timeLeft: prevState.sessionLength * 60
      }));
    }
  }
  
  countdownTimer() {
    if(!this.state.isTimerRunning) {
      this.setState({
        isTimerRunning: true,
        timerInterval: setInterval(this.checkTimer, 1000)
      });
    } else {
      this.setState({
        isTimerRunning: false,
        timerInterval: clearInterval(this.state.timerInterval)
      });
    }
  }
  
  checkTimer() {
    if(this.state.timeLeft === 0) {
      this.beep.play();
      let timerLabel = this.state.timerLabel === 'session' ? 
        'break' : 'session';
      let timeLeft = this.state.timerLabel === 'session' ? 
        this.state.breakLength * 60 : this.state.sessionLength * 60;

      this.setState({
        timerLabel,
        timeLeft
      });
    } else {
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1
      }));
    }
  }
  
  resetTimer() {
    this.beep.pause();
    this.beep.currentTime = 0;
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'session',
      timeLeft: 25 * 60,
      isTimerRunning: false,
      timerInterval: clearInterval(this.state.timerInterval)
    });
  }
  
  render() {
    return (
      <div>
        <Display timeLeft={this.state.timeLeft}
                 breakLength={this.state.breakLength}
                 sessionLength={this.state.sessionLength}
                 timerLabel={this.state.timerLabel}
                 handleClick={this.handleClick}
                 countdownTimer={this.countdownTimer}
                 resetTimer={this.resetTimer}
        />
        <audio id="beep" 
               ref={(audio) => {this.beep = audio}} 
               src={this.state.audioUrl}
               type="audio/mpeg" 
        />
      </div>
    );
  }
}

function Display(props) {
  let minutes = Math.floor(props.timeLeft / 60);
  let seconds = props.timeLeft % 60;

  minutes = minutes < 10 ? '0' + minutes.toString() : minutes;
  seconds = seconds < 10 ? '0' + seconds.toString() : seconds;
    
  return (
    <div>
      <p id="break-label">Break Length</p>
      <h3 id="break-length">{props.breakLength}</h3>
      <button id="break-decrement" 
              type="button" 
              onClick={props.handleClick}
      >
        break decrement
      </button>
      <button id="break-increment" 
              type="button" 
              className="plus-minus" 
              onClick={props.handleClick}
      >
        break increment 
      </button>
     
      <p id="session-label">session Length</p>
      <h3 id="session-length">{props.sessionLength}</h3>
      <button id="session-decrement" 
              type="button"  
              onClick={props.handleClick}
      >
        session decrement
      </button>
      <button id="session-increment" 
              type="button"  
              onClick={props.handleClick}
      >
        session increment
      </button>
      
      <p id="timer-label">{props.timerLabel}</p>
      <p id="time-left">{ minutes + ':' + seconds}</p>
      
      <button id="start_stop" 
              type="button" 
              onClick={props.countdownTimer}
      >
        start / stop
      </button>
      <button id="reset" 
              type="button" 
              onClick={props.resetTimer}
      >
        reset
      </button>
    </div>
  );

}


//======================================================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
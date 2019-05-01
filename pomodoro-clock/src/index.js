import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    // [breakLength, sessionLength] = minutes.
    // [timeLeft] = seconds.
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: 'Session',
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
    this.setState({ timerLabel: 'Session' });
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
      let timerLabel = this.state.timerLabel === 'Session' ? 
        'Break' : 'Session';
      let timeLeft = this.state.timerLabel === 'Session' ? 
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
      timerLabel: 'Session',
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
        <Signature />
      </div>
    );
  }
}

function Display(props) {
  let minutes = Math.floor(props.timeLeft / 60);
  let seconds = props.timeLeft % 60;
  let minusIcon = <i className="fas fa-minus"></i>
  let plusIcon = <i className="fas fa-plus"></i>
  let startStopIcon = <div>
                        <i className="fas fa-play"></i>
                        <i className="fas fa-stop"></i>
                      </div>
  let resetIcon = <i class="fas fa-sync-alt"></i>

  minutes = minutes < 10 ? '0' + minutes.toString() : minutes;
  seconds = seconds < 10 ? '0' + seconds.toString() : seconds;
    
  return (
    <div>
      <div className="timeleft">
          <span id="timer-label">{props.timerLabel}</span>
          <div id="time-left">{ minutes + ':' + seconds}</div>
      </div>

      <div className="container">
        <div id="break-label">Break Length</div>
        <div id="break-length">{props.breakLength}</div>
        <button className="btn"
                id="break-increment" 
                type="button"  
                onClick={props.handleClick}
        >
          {plusIcon}
        </button>
        <button className="btn"
                id="break-decrement" 
                type="button" 
                onClick={props.handleClick}
        >
          {minusIcon}
        </button>
        
        <div id="session-label">Session Length</div>
        <div id="session-length">{props.sessionLength}</div>
        <button className="btn"
                id="session-increment" 
                type="button"  
                onClick={props.handleClick}
        >
          {plusIcon}
        </button>
        <button className="btn"
                id="session-decrement" 
                type="button"  
                onClick={props.handleClick}
        >
          {minusIcon}
        </button>
        <button className="btn"
                id="start_stop" 
                type="button" 
                onClick={props.countdownTimer}
        >
          {startStopIcon}
        </button>
        <button className="btn"
                id="reset" 
                type="button" 
                onClick={props.resetTimer}
        >
          {resetIcon}
        </button>

      </div>
    </div>
  );
}

function Signature(props) {
  return (
    <footer className='sebport0-signature'>
        By <i className='fab fa-github' />
      <a href='https://github.com/sebport0' target='_blank'>
        sebport0
      </a>
    </footer>
  

//======================================================================

ReactDOM.render(<PomodoroClock />, document.getElementById("root"));
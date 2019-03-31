import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //detect key press events.
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  
  playSound() {
    // get sound relative to the key pressed from the audio tag.
    const sound = document.getElementById(this.props.keyId);
    // get pad relative to the name of the audio played.
    const pad = document.getElementById(this.props.name);
    

    pad.style.backgroundColor = "orange";
    sound.play();
    setTimeout(() => {pad.style.backgroundColor = "#5CD85A";}, 150);
    this.props.updateDisplay(this.props.name);
  }

  handleKeyPress(event) {
    //DrumPad knows it's own key so there is no need to check for 
    //every key. 
      if(event.key.toUpperCase() === this.props.keyId) {
        this.playSound();
      }
  }

  handleClick(event) {
    this.playSound();
  }

  render() {
    return(
      <div>
        <div 
          className="drum-pad"
          id={this.props.name}
          onClick={this.handleClick}
          onKeyPress={this.handleKeyPress}
        >
          <audio 
            className='clip' 
            id={this.props.keyId} 
            src={this.props.src}
          >
          </audio>
          {this.props.keyId}
        </div>
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.updateDisplay = this.updateDisplay.bind(this)
    this.pads = [ {name: "Heater 1",
                    key: "q",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},

                   {name: "Heater 2",
                    key: "w",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},

                   {name: "Heater 3",
                    key: "e",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},

                   {name: "Heater 4",
                    key: "a",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},

                   {name: "Clap",
                    key: "s",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},

                   {name: "Open HH",
                    key: "d",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},

                   {name: "Kick n' Hat",
                    key: "z",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},

                   {name: "Kick",
                    key: "x",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},

                   {name: "Closed HH",
                    key: "c",
                    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
    ];
    this.state = {display: ""}
    this.drumPads= [0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => 
      <DrumPad 
               key={n}
               name={this.pads[n].name}
               keyId={this.pads[n].key.toUpperCase()}
               src={this.pads[n].soundSource}
               updateDisplay={this.updateDisplay}
      />);
  }

  updateDisplay(name) {
    this.setState({display: name});
  }

  render() {
    return(
      <div>
        <div className="title">
          <i className="fas fa-drum"></i> 
          DRUM MACHINE
        </div>
        <div className="grid-container">
          {this.drumPads}
        </div>
        <div 
            className="display" 
            id="display"
        >
          {this.state.display}
        </div>
        <footer>
          By <i className="fab fa-github"></i>
             <a 
                href="https://github.com/sebport0"
                target="_blank"
              >
                sebport0
              </a>
        </footer>
      </div>
      
    );
  }
}

//-----------------------------------------------------------------------

ReactDOM.render(<DrumMachine />, document.getElementById("drum-machine"));
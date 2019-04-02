import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Key(props) {
	return(
		<button 
			type="button"
			id={props.id}
		>
			{props.id}
		</button>
	);
}

class Keyboard extends React.Component {
	constructor(props) {
		super(props);
		this.numbers = [
							0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
					 		10, 11, 12, 13, 14, 15, 16
		];
		this.symbols = [
							"0", "1", "2", "3", "4", "5",
							"6", "7", "8", "9", "=",
							"+", "-", "x", "/", 
							".", "AC"
		];
		this.keys = this.numbers.map(num => 
			<Key 
				key={num}
				id={this.symbols[num]}
			/>);
	}
	
	render() {
		return(
			<div className="keyboard">
				{this.keys}
			</div>
		);
	}	
}

function Display(props) {
	return(
		<div 
			id="display"
			className="display"
		>
			<div className="display-output">
				{props.output}
			</div>
			<div className="display-input">
				{props.input}
			</div>
		</div>
	);
}

function Processor(props) {
	return(null);
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
						input: "",
					  	output: 0,
					  	equation: ""
		};
	}

	reset() {
		console.log("reset!")
		this.setState({
						input: "", 
						ouput: 0
		});
	}	

	render() {
		return(
			<div>
				<Keyboard />
				<Display 
					input={this.state.input} 
					output={this.state.output}
				/>
			</div>
		);
	}
}

//-----------------------------------------------------------------------

ReactDOM.render(<Calculator />, document.getElementById("root"));
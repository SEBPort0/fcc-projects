import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Key(props) {
	return(
		<button 
			type="button"
			id={props.id}
			value={props.value}
			onClick={props.onClick}
		>	
			{props.value}
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
		this.symbols = [	"+", "-", "*", "/",
							"0", "1", "2", "3", "4", "5",
							"6", "7", "8", "9", "=", 
							".", "AC"
		];
		this.ids = [	"add", "subtract", "multiply", "divide",
						"zero", "one", "two", "three", "four", "five",
						"six", "seven", "eight", "nine", "equals",
						"decimal", "clear"
		];
		this.keys = this.numbers.map(num => 
			<Key 
				key={num}
				value={this.symbols[num]}
				id={this.ids[num]}
				onClick={this.props.handleClick}
			/>);
	}

	render() {
		return(
			<div className="keyboard-container">
				<div className="keyboard-keys">
					{this.keys}
				</div>
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
			<div className="display-formula">
				{props.formula}
			</div>
			{props.current}
		</div>
	);
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleEquals = this.handleEquals.bind(this);
		this.handleDecimal = this.handleDecimal.bind(this);
		this.state = {	current: "0",
					  	formula: "",
						ans: "",
						lastClicked: ""
		};
	}

	handleClick(event) {
		const {id, value} = event.target;

		if(id === "clear") {
			this.handleClear();
		} else if(id === "equals") {
			this.handleEquals();
		} else {
			this.setState(prevState => ({ 
				current: value,
				formula: prevState.formula + value,
				ans: prevState.ans, 
				lastClicked: id
			}));
		}
	}

	handleClear() {
		this.setState({ current: "0",
					  	formula: "",
						ans: "",
						lastClicked: "clear"
		});
	}

	handleEquals() {
		const answer = String(eval(this.state.formula));

		this.setState({ current: answer,
						formula: answer,
						ans: answer,
						lastClicked: "equals"
		});
	}

	handleDecimal() {
		return undefined;
	}

	render() {
		return(
			<div className="calculator">
				<Display 
					formula={this.state.formula}
					current={this.state.current}	
				/>
				<Keyboard handleClick={this.handleClick}/>
			</div>
		);
	}
}

//-----------------------------------------------------------------------

ReactDOM.render(<Calculator />, document.getElementById("root"));
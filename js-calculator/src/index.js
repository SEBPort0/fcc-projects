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
		this.handleDecimal = this.handleDecimal.bind(this);
		this.state = {	current: "0",
					  	formula: "",
						ans: "",
						lastClicked: ""
		};
	}

	handleClick(event) {
		const numbers = [	"one", "two", "three", "four", "five",
							"six", "seven", "eight", "nine", "zero"
		];
		const operators = [	"add", "subtract", "multiply", "divide"	];
		const {id, value} = event.target;

		this.setState(prevState => ({ current: value }));
		if(id === "clear") {
			this.handleClear();
		} else if(id === "equals") {
			this.setState({ ans: eval(this.state.formula) });
			this.setState({ formula: "" });
			this.setState(prevState => ({ current: prevState.ans }));
		} else if(id === "decimal") {
			this.handleDecimal();
		} else {
			this.setState(prevState => ({ formula: 
				prevState.formula + value }));
		}
		this.setState({ lastClicked: value });

	}

	handleClear() {
		this.setState({ current: "0",
					  	formula: "",
						ans: "",
						lastClicked: ""
		});
	}

	handleDecimal() {
		return undefined;
	}

	render() {
		return(
			<div className="calculator">
				<Display 
					current={this.state.current}
					formula={this.state.formula}
				/>
				<Keyboard handleClick={this.handleClick}/>
			</div>
		);
	}
}

//-----------------------------------------------------------------------

ReactDOM.render(<Calculator />, document.getElementById("root"));
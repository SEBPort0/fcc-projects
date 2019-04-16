import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleEquals = this.handleEquals.bind(this)
    this.handleOperators = this.handleOperators.bind(this)
    this.handleDecimal = this.handleDecimal.bind(this)
    this.state = { current: '0',
      formula: '',
      ans: '',
      lastClicked: '',
      decimal: false
    }
  }

  handleClick (event) {
    const { id, value } = event.target
    const operators = ['add', 'subtract', 'multiply', 'divide']

    if (id === 'clear') {
      this.handleClear()
    } else if (id === 'equals') {
      this.handleEquals()
      // two or more operators consecutively entered.
    } else if (operators.includes(this.state.lastClicked) &&
        operators.includes(id)) {
      this.handleOperators(this.state.lastClicked, id)
    } else if (id === 'decimal') {
      if (!this.state.decimal) {
        this.setState(prevState => ({
          current: prevState.current + value,
          formula: prevState.formula + value,
          lastClicked: 'decimal',
          decimal: true
        }))
      }
    } else {
      this.setState(prevState => ({
        current: (prevState.current === '0'
          ? value : prevState.current + value),
        formula: prevState.formula + value,
        ans: prevState.ans,
        lastClicked: id
      }))
      if (operators.includes(id)) {
        this.setState({ decimal: false })
      }
    }
  }

  handleClear () {
    this.setState({ current: '0',
      formula: '',
      ans: '',
      lastClicked: 'clear',
      decimal: false
    })
  }

  handleEquals () {
    const answer = String(eval(this.state.formula))

    this.setState({ current: answer,
      formula: answer,
      ans: answer,
      lastClicked: 'equals',
      decimal: false
    })
  }

  handleOperators (lastClicked, id) {
    // not the best way.
    const operators = { add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/'

    }
    const newFormula = this.state.formula.replace(
      operators[lastClicked], operators[id])

    this.setState({ formula: newFormula,
      current: newFormula,
      lastClicked: id,
      decimal: false
    })
  }

  handleDecimal () {
    return undefined
  }

  render () {
    return (
      <div>
        <div className='calculator'>
          <Display current={this.state.current} />
          <Keyboard handleClick={this.handleClick} />
        </div>

        <Signature />
      </div>
    )
  }
}

function Key (props) {
  return (
    <button
      type='button'
      id={props.id}
      value={props.value}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

class Keyboard extends React.Component {
  constructor (props) {
    super(props)
    this.numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16
    ]
    this.symbols = [ '+', '-', '*', '/',
      '0', '1', '2', '3', '4', '5',
      '6', '7', '8', '9', '=',
      '.', 'AC'
    ]
    this.ids = [ 'add', 'subtract', 'multiply', 'divide',
      'zero', 'one', 'two', 'three', 'four', 'five',
      'six', 'seven', 'eight', 'nine', 'equals',
      'decimal', 'clear'
    ]
    this.keys = this.numbers.map(num =>
      <Key
        key={num}
        value={this.symbols[num]}
        id={this.ids[num]}
        onClick={this.props.handleClick}
      />)
  }

  render () {
    return (
      <div className='keyboard-container'>
        <div className='keyboard-keys'>
          {this.keys}
        </div>
      </div>
    )
  }
}

function Display (props) {
  return (
    <div
      id='display'
      className='display'
    >
      {props.current}
    </div>
  )
}

function Signature (props) {
  return (
    <footer className='sebport0-signature'>
        By <i className='fab fa-github' />
      <a
        href='https://github.com/sebport0'
        target='_blank'
      >
            sebport0
      </a>
    </footer>
  )
}

// ---------------------------------------------------------------------

ReactDOM.render(<Calculator />, document.getElementById('root'))

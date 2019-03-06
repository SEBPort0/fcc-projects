import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
                   quote: "",
                   author: "" 
                 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  getRandQuote() {
    const apiUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"; 
    fetch(apiUrl)
          .then(response => response.json())
          .then(results => {
            const randPick = Math.floor(Math.random() * results.quotes.length);
            const randQuote = results.quotes[randPick].quote; 
            const randAuthor = results.quotes[randPick].author;
            this.setState({quote: randQuote, author: randAuthor});
    })
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.getRandQuote();
  }
  
  
  componentDidMount() {
    this.getRandQuote();
  }
  
  render() {
    return(
      <div>
        <main>
          <div class="container">
            <div id="text">
              <h2>{this.state.quote}</h2>
            </div>

            <div id="author">
              <p> - {this.state.author}</p>
            </div>
          </div>
          <div class="buttons">
            <button type="button"
                    id="new-quote" 
                    onClick={this.handleSubmit}
            >
              New Quote
            </button>
            <a id="tweet-quote" 
               href={`https://twitter.com/intent/tweet/?text=
                      ${this.state.quote} - ${this.state.author}`} 
               target="_blank"
               title="Tweet this!"
               class="fa fa-twitter"
            >
            </a>
          </div>
        </main>
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById("quote-box"));
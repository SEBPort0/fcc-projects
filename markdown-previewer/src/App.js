import React from 'react';
import marked from 'marked';
import './index.css';

// global. This the text to show in #editor and #preview when the app starts.
const firstLoadText = `# Example of an h1 header 

## Example of an h2 header   

\`<div></div>\`

**bold text**

[link](https://www.freecodecamp.com)

\`\`\`
do foo: 
  multiline code
\`\`\`

- a list  
  - list item 

> block quote

![React Logo w/ Text](https://goo.gl/Umyytc)`;

// If breaks: true, add <br> on a single line break.
marked.setOptions({breaks: true});

class App extends React.Component {
  constructor(props) {
    super(props)
    this.rawMarkUp = this.rawMarkUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { text: firstLoadText };
  }
  
  rawMarkUp() {
    /*
     * Converts the text on the editor to html.
     * @return transformed text to modify 
     *         dangerouslySetInnerHTML attribute of preview.
    */ 
    const text = this.state.text
    let rawMarkUp = marked(text, {sanitize: true});
    return {__html: rawMarkUp};
  }
  
  handleChange(event) {
    const {value} = event.target;
    this.setState({ text: value });
  }
  
  render() { 
    return(
      <div>
        <br />
        <textarea 
          id="editor"
          onChange={this.handleChange}
          defaultValue={this.state.text}
        />
        <br /><br />
        <div
          id="preview"
          dangerouslySetInnerHTML={this.rawMarkUp()}
        >  
        </div>
        <footer className="footer">
          <p>
            By <i className="fab fa-github"></i>
                <a 
                href="https://github.com/sebport0"
                target="_blank"
                >
                sebport0
               </a>
          </p>
        </footer>
      </div>
    );
  }
} 

export default App;
import React from 'react';
import data from './data.json';
import './App.css';

let correct_word = data[Math.floor(Math.random() * data.length)].toLowerCase()
const post = [
'|-------:-- ',
'        : ',
'',
'',
'',
'',
''
]
const head = [
  '|-------:--',
  '( )',
  '        ',
  '',
  '',
  '',
  '',
]
const body = [
'|-------:--',
'( )',
'       | ',
'',
'',
'',
'',
]
const arm_1 = [
"|-------:--",
"( )",
"/|",
"",
"",
"",
"",
]
const arm_2 = [
"|-------:--",
"( )",
"/|\\",
"     ",
"",
"",
"",
]
const leg_1 = [
"|-------:--",
"( )",
"/|\\",
"/",
"",
"",
"",]
const leg_2 = [
"|-------:--",
"( )",
"/|\\",
"/ \\",
"",
"",
"",
]

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {wrong: 0,
                  word: "_ ".repeat(correct_word.length),
                  already: [],
                  str: "",
                  v: "",};
    this.disabled = false;
    this.len = 0;
    this.handle = this.handle.bind(this);
    this.reset = this.reset.bind(this);
    this.Change = this.Change.bind(this);
  }

  string() {
    if (!this.state.word.includes("_")) {
      this.setState({ str: "You won! Click the reset button to try again." });
      this.disabled = true;
    }
    if (this.state.wrong === 6) {
      this.setState({ str: `You lost... The correct word was ${correct_word}. Click the reset button to try again.` });
      this.disabled = true;
    }
    switch (this.state.wrong){
      case 0:
        return post;
      case 1:
        return head;
      case 2:
        return body;
      case 3:
        return arm_1;
      case 4:
        return arm_2;
      case 5:
        return leg_1;
      default:
        return leg_2;
    }
  }
  
  reset() {
    this.setState({wrong: 0,
      word: "_ ".repeat(correct_word.length),
      already: [],
      str: "",
      v: "",})
    this.len = 0;
    correct_word = data[Math.floor(Math.random() * data.length)];
    this.disabled = false;
  }
  
  handle(e) {
    const regex = new RegExp("[A-Za-z]+");
    if (e.key === "Enter"){
      if (this.state.str.length > 0) {
        this.setState({ str: ""});
      }
      if (e.target.value === "") {
        this.setState({ str: "Actually put something in this time..." });
        this.setState({ v: "" });
        return ;
      }
      else if (this.state.already.includes(e.target.value)) {
        this.setState({ str: "Try a word or letter that hasn't been used before"});
        this.setState({ v: "" });
        return ;
      }
      else if (!regex.test(e.target.value)) {
        this.setState({ str: "Try inputting letters or words without any special characters or numbers" });
        this.setState({ v: "" });
        return ;
      }
      this.setState({ v: "" })
      this.setState({ already: this.state.already + e.target.value});
      if (e.target.value.length === 1) {
        if (correct_word.includes(e.target.value)) {
          let indexes = [];
          let i = [];
          indexes = correct_word.split("").map((item, index) => {i = item === e.target.value ? Number(index): ""; return i;});
          const Regex = new RegExp("[_ ]");
          let already_guessed = [];
          let y = 0;
          let word = this.state.word.split(" ").slice(0, -1);
          console.log(word)
          for (let x of word) {
            if (!Regex.test(x)) {
              already_guessed.push(y);
            }
            y = y + 1;
          };
          console.log(already_guessed);
          let total = indexes + already_guessed;
          this.setState({ word: correct_word.split("").map((item, index) =>  total.includes(index) ? item + " ": "_ ").join("")});
        }
        else {
          this.setState({ wrong: this.state.wrong + 1 });
          this.setState({ str: "You got it wrong... Better luck next time!" });
        }
      }
      else {
        if (e.target.value === correct_word) {
          this.setState({ str: "You won! Click the reset button to try again." });
          this.disabled = true;
        }
        else {
          this.setState({ str: "You got it wrong... Better luck next time!"});
          this.setState({ wrong: this.state.wrong + 1});
        }
      }
    }
      
  }

  Change(e) {
    this.setState({ v: e.target.value})
  }

  render() {
    const hung = this.string();
    let i;
    let hang = [];
    for (i=0;i<hung.length;i++){
      hang.push(i ? <p>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hung[i]}</p>: <p>{hung[i]}</p>);
    }
    return (
      <div id='center'>
        <button onClick={this.reset} class="button button2" style={{textAlign: "left", }}>Reset</button>
        <div id="flex" style={{fontSize: 90, }}>{hang}</div>
        <p style={{fontSize: 90, position: 'absolute', bottom: 130, right: 50,}}>{this.state.word}</p>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <p style={{color: "red", margin: 43}}>{this.state.str}</p>
        <div id='already'>
          <ul>
          </ul>
        </div>
        <div id='input'>
          <input disabled={this.disabled}
                 value={this.state.v}
                 ref={this.input}
                 maxLength="21"
                 minLength="1"
                 spellCheck="false"
                 autoComplete="off"
                 type="text"
                 className="form__input"
                 id="name" 
                 placeholder="Guess a word or letter"
                 onKeyDown={this.handle}
                 onChange={this.Change}
            />
        </div>
      </div>
    )
  }
}
export default Game;

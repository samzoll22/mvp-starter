import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import DefineWord from './components/DefineWord.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      words: []
    }
    this.define = this.define.bind(this);
  }

  componentDidMount () {
    $.ajax({
      method: 'GET',
      url: '/words',
    })
    .then(data => {
      console.log('Received data back from server', data);
        this.setState({
          words: data
      });
    })
    .catch(error => {
      console.error('Error receiving data back from server', error);
    });
  }

  define (word) {
    console.log('define function invoked with ', word);
    let data = JSON.stringify({ word: word });
    $.ajax({
      method: 'POST',
      url: '/words',
      data: data,
      headers: { 'content-type': 'application/json'},
    })
    .then(data => {
      console.log('Received definition of searched word from server.', data);
      this.setState({
        words: data
      });
    })
    .catch(error => {
      console.error('Error receiving definition of searched word from server.', error);
    });
    // $.post('/words', data, (error, data) => {
    //   if (error) {
    //     console.error('Error receiving definition of looked up word.', error);
    //   } else {
    //     console.log('Received definition of word from server.', data);
    //   }
    // }, 'application/json');
  }

  render () {
    return (
      <div>
        <h1>My Words</h1>
        <DefineWord define={this.define}/>
        <List words={this.state.words}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
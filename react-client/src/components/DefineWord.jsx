import React from 'react';
import $ from 'jquery';

class DefineWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState ({
      word: event.target.value
    });
  }

  handleSubmit (event) {
    console.log('handleSubmit was invoked with ', this.state.word);
    this.props.define(this.state.word);
    this.setState({
      word: ''
    })
    event.preventDefault();
  }

  render () {
    return (
      <form>
        <input onChange={this.handleChange} value={this.state.word} placeholder='search a word'></input>
        <button onClick={this.handleSubmit}>Search word</button>
      </form>
    )
  }
}

export default DefineWord;
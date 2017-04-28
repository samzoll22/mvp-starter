import React from 'react';

const Word = (props) => {
  console.log('Props in Word component, defintion: ', props.packet.definition);
  console.log('Props in Word component, example: ', props.packet.example);
  if (typeof props.packet.example === 'object') {
    props.packet.example = props.packet.example.text;
  }
  if (!props.packet.example) {
    return (
      <div>
        <div>Definition: {props.packet.definition}</div>
        <br></br>
      </div>
    )
  } else {
    return (
      <div>
        <div>Definition: {props.packet.definition}.</div>
        <div>Example: {props.packet.example}.</div>
        <br></br>
      </div>
    ) 
  }
};

export default Word;
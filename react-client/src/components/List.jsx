import React from 'react';
import ListWord from './ListWord.jsx';

const List = (props) => {
  let operatingWord;
  let word;
  if(props.words.length === 1) {
    operatingWord = 'is';
    word = 'word';
  } else {
    operatingWord = 'are';
    word = 'words';
  }
  return (
    <div>
      <h4> List Component </h4>
      There {operatingWord} { props.words.length } {word}.
      { props.words.map((word, i) => <ListWord word={word} key={i}/>) }
    </div>
  )
}

export default List;
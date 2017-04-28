import React from 'react';
import Category from './Category.jsx';

const ListWord = (props) => (
  <div>
    <div className="word">{props.word.id}</div>
    {props.word.lexicalCategories.map((lexicalCategory, j) => 
      <Category category={lexicalCategory} key={j} />
    )}
    <br></br>
  </div>
)

export default ListWord;
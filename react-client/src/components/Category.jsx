import React from 'react';
import Word from './Word.jsx';

const Category = (props) => (
    <div>{props.category.type}
    {props.category.entry.map((packet, k) =>
      <Word packet={packet} key={k} />
    )}
    </div>
);

export default Category;
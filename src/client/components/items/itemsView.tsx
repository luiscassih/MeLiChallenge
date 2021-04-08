import React, { useState } from 'react';
import Header from "../common/header";
import "./itemsStyles.scss";

interface Props {
  items: string[]
}
export default (props : Props) => {
  const [test, setTest] = useState(2);
  const [items, setItems] = useState(props.items)
  const up = () => {
    setTest(test + 1 )
  };
  
  const renderList = () => {
    const eList :JSX.Element[] = [];
    items.forEach((i, index) => {
      eList.push(<li className="item" key={index}>{i}</li>);
    });
    return eList;
  }

  const add = () => setItems([...items, "jsdajsd"]);
  
  return (
    <div className="items">
      <Header />
      <div>ITEMS {test}</div>
      <button onClick={up}>+</button>
      <ul>{renderList()}</ul>
      <button onClick={add}>ADD</button>
    </div>
  )
}
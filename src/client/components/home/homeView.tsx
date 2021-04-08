import React, { useState } from 'react';
import Header from "../common/header";
import "./homeStyles.scss";

export default () => {
  const [test, setTest] = useState(12);
  const up = () => {
    setTest(test + 1 )
  };
  
  return (
    <div className="home">
      <Header />
      <div className="emptyText" style={{marginTop: 50}}>Ingresa un texto para buscar productos.</div>
    </div>
  )
}
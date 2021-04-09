import React from 'react';
import Header from "../common/header";
import "./homeStyles.scss";

export default () => {
  return (
    <div className="home">
      <Header />
      <div className="emptyText" style={{marginTop: 50}}>Ingresa un texto para buscar productos.</div>
    </div>
  )
}
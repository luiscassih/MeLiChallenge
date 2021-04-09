import React from "react";
import Header from "../common/header";

export default () => {
  return (
    <div className="home">
      <Header />
      <div className="emptyText" style={{marginTop: 50}}>Producto o sitio no encontrado.</div>
    </div>
  )
}
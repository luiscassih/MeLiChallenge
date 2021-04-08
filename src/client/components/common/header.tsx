import React from "react";
import LogoImg from "@/client/assets/icons/Logo_ML_53x36.png";
import SearchImg from "@/client/assets/icons/ic_Search_18x18.png";
import './headerStyles.scss';

export default () => {
  return (
    <header>
      <a href="/" className="logoLink"><img src={LogoImg} /></a>
      <div className="searchBox">
        <input type="text" name="search" id="searchBox" placeholder="Nunca dejes de buscar" />
        <button><img src={SearchImg} /></button>
      </div>
    </header>
  )
};
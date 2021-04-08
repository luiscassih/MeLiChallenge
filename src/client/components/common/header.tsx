import React, { ChangeEvent, useState } from "react";
import LogoImg from "@/client/assets/icons/Logo_ML_53x36.png";
import SearchImg from "@/client/assets/icons/ic_Search_18x18.png";
import './headerStyles.scss';

interface Props {
  searchQuery?: string
}
export default (props: Props) => {
  const [searchQuery, setSearchQuery] = useState(props.searchQuery || "");
  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    // do a debounce here, also pre-search dynamic recommendations
    setSearchQuery(ev.target.value);
  }
  return (
    <header>
      <div className="header-content">
        <a href="/" className="logoLink"><img src={LogoImg} alt="Mercado Libre" title="Mercado Libre Argentina" /></a>
        <form className="searchBox" action={"/items"} method="GET">
          <input
            type="text" 
            name="search" 
            id="searchBox" 
            placeholder="Nunca dejes de buscar"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <button type="submit"><img src={SearchImg} /></button>
        </form>
      </div>
    </header>
  )
};
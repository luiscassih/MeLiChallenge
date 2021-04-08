import React, { useState } from 'react';
import { ItemsProps } from '.';
import Header from "../common/header";
import "./itemsStyles.scss";
import BreadcrumbIcon from "@/client/assets/icons/breadcrumb.svg";

export default (props : ItemsProps) => {
  const [resultItems, setResultItems] = useState(props.items);
  const [resultCategories, setResultCategories] = useState(props.categories);
  
  const renderItems = () => {
    const items :JSX.Element[] = [];
    resultItems.forEach((i, index) => {
      items.push(
        <li className="item-container" key={index}>
          <div className="item-content">
            <div className="item-photo"><a href=""></a></div>
            <div className="item-data">
              <div className="item-price">
                <p>$ 1.980</p>
                <div className="item-shipping"></div>
              </div>
              <div className="item-title"><a href="">Apple Ipod Touch 5g 16gb Negro Igual A Nuevo Completo Unico!</a></div>
            </div>
            <div className="item-location">Capital Federal</div>
          </div>
        </li>
      );
    });
    if (resultItems.length == 0) {
      items.push(<li className="items-empty-results" key={0}>No hubo resultados para esa b&uacute;squeda, intenta nuevamente.</li>);
    }
    return items;
  }

  const renderResultCategories = () => {
    const categories :JSX.Element[] = [];
    resultCategories.forEach((cat, index) => {
      categories.push(
        <li key={index}>
          <a href="#">{cat}</a>
          {(index < resultCategories.length - 1) && <div className="category-breadcrumb"><BreadcrumbIcon /></div>}
        </li>
      );
    });
    return categories;
  }
  
  return (
    <div className="items">
      <Header searchQuery={props.searchQuery}/>
      <div className="items-container">
        <div className="items-content">
          <ul className="items-categories">
            {renderResultCategories()}
          </ul>
          <ul className="items-list">
            {renderItems()}
          </ul>
        </div>
      </div>
    </div>
  )
}
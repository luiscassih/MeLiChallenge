import React, { useState } from 'react';
import { Breadcrumb, ItemsProps } from '.';
import Header from "../common/header";
import "./itemsStyles.scss";
import Breadcrumbs from "./components/breadcrumbs";

export default (props : ItemsProps) => {
  const [resultItems, setResultItems] = useState(props.items);
  const [resultCategories, setResultCategories] = useState(props.categories);
  
  const renderItems = () => {
    const items :JSX.Element[] = [];
    resultItems.forEach((i, index) => {
      items.push(
        <li className="item-container" key={index}>
          <div className="item-content">
            <div className="item-photo"><a href="/items/15"></a></div>
            <div className="item-data">
              <div className="item-price">
                <p>$ 1.980</p>
                <div className="item-shipping"></div>
              </div>
              <div className="item-title"><a href="/items/15">Apple Ipod Touch 5g 16gb Negro Igual A Nuevo Completo Unico!</a></div>
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

  const breadcrumbItems: Breadcrumb[] = [];
  resultCategories.forEach(category => {
    breadcrumbItems.push({
      link: "/items?search=" + category,
      title: category
    });
  });
  
  return (
    <div className="items">
      <Header searchQuery={props.searchQuery}/>
      <div className="items-container">
        <div className="items-content">
          <Breadcrumbs items={breadcrumbItems}/>
          <ul className="items-list">
            {renderItems()}
          </ul>
        </div>
      </div>
    </div>
  )
}
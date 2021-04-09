import React, { useState } from 'react';
import { Breadcrumb, ItemsDetailProps } from '.';
import Header from "../common/header";
import Breadcrumbs from './components/breadcrumbs';
import "./itemsStyles.scss";

export default (props: ItemsDetailProps) => {
  const [resultItem, setResultItem] = useState(props.item);
  const [resultCategories, setResultCategories] = useState(props.categories);

  const breadcrumbItems: Breadcrumb[] = [];
  resultCategories.forEach(category => {
    breadcrumbItems.push({
      link: "/items?search=" + category,
      title: category
    });
  });
  return (
    <div className="items-detail">
      <Header />
      <div className="item-container">
        <div className="item-content">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="item-data">
            <div className="item-photo"></div>
            <div className="item-panel">
              <div className="item-stats">Nuevo - 234 vendidos</div>
              <div className="item-title">Deco Reverse Sombrero Oxford</div>
              <div className="item-price">$ 1.980</div>
              <button className="item-buy-button">Comprar</button>
            </div>
            <div className="item-description">
              <span>Descripci&oacute;n del producto</span>
              <p>asdsadasdasdasd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
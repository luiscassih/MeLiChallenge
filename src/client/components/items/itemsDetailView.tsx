import React, { useState } from 'react';
import { Breadcrumb, ItemsDetailProps, ItemDetail } from '.';
import Header from "../common/header";
import Breadcrumbs from './components/breadcrumbs';
import "./itemsStyles.scss";
import { StringUtils } from "@/lib/utils";

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
            <div className="item-photo"><img src={resultItem.picture}/></div>
            <div className="item-panel">
              <div className="item-stats">{resultItem.condition === 'new' ? 'Nuevo' : 'Usado'} - {resultItem.sold_quantity} vendidos</div>
              <div className="item-title">{resultItem.title}</div>
              <div className="item-price">$ {resultItem.price.amount}<span>{StringUtils.parsePriceDecimals(resultItem.price.decimals)}</span></div>
              <button className="item-buy-button">Comprar</button>
            </div>
            <div className="item-description">
              <span>Descripci&oacute;n del producto</span>
              <p>{resultItem.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
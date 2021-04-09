import React, { useState } from 'react';
import { Breadcrumb, ItemsProps } from '.';
import Header from "../common/header";
import Breadcrumbs from "./components/breadcrumbs";
import FreeShippingImg from "@/client/assets/icons/free_shipping_36x36.png";
import "./itemsStyles.scss";
import { StringUtils } from '@/lib/utils';

export default (props : ItemsProps) => {
  const [resultItems, setResultItems] = useState(props.items);
  const [resultCategories, setResultCategories] = useState(props.categories);
  
  const renderItems = () => {
    const items :JSX.Element[] = [];
    resultItems.forEach((i, index) => {
      items.push(
        <li className="item-container" key={index}>
          <div className="item-content">
            <div className="item-photo"><a href={"/items/" + i.id}><img src={i.picture} /></a></div>
            <div className="item-data">
              <div className="item-price">
                $ {i.price.amount}<span>{StringUtils.parsePriceDecimals(i.price.decimals)}</span>
                {i.free_shipping && <div className="item-freeshipping"><img title="Env&iacute;o gratis!" src={FreeShippingImg}/></div>}
              </div>
              <div className="item-title"><a href={"/items/" + i.id}>{i.title}</a></div>
            </div>
            <div className="item-location">{i.state_name}</div>
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
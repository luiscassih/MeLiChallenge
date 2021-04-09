import React from "react";
import { Breadcrumb } from "../";
import BreadcrumbIcon from "@/client/assets/icons/breadcrumb.svg";
import "./breadcrumbsStyles.scss";


interface Props {
  items: Breadcrumb[]
}
export default (props: Props) => {
  const render = () => {
    const items :JSX.Element[] = [];
    props.items.forEach((item, index) => {
      items.push(
        <li key={index}>
          <a href={item.link}>{item.title}</a>
          {(index < props.items.length - 1) && <div className="breadcrumb-separator"><BreadcrumbIcon /></div>}
        </li>
      );
    });
    return items;
  }
  return (
    <ul className="breadcrumbs">
      {render()}
    </ul>
  )
}
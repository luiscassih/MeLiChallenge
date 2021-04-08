import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import HomeView from "../home/homeView";
import ItemsView from "../items/itemsView";
const Router = ( props :any) => (
  <BrowserRouter >
    <Switch> 
      <Route path="/items">{React.createElement(ItemsView, props)}</Route>
      <Route path="/">{React.createElement(HomeView, props)}</Route>
    </Switch>
  </BrowserRouter>
)
export default Router;
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/router/router';
import "./global.scss";

const initialProps = (window as any)._initialProps || {};
const App = () => (
  <Router {...initialProps}/>
)
ReactDOM.hydrate(<App />, document.getElementById("app"));
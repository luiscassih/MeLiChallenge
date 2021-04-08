import React from 'react';
import { renderToString } from "react-dom/server";
interface Props {
    component :any,
    props :Object,
    head :string
}
const renderHtml = ({component, props, head} : Props) => {
    const rendered = renderToString(React.createElement(component, props));
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    ${head}
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="/styles/app.css" />
    <link rel="icon" href="/favicon.svg">
</head>
<body>
    <div id="app">${rendered}</div>
    <script>window._initialProps=${JSON.stringify(props)}</script>
    <script src="/vendor.js"></script>
    <script src="/client.js"></script>
</body>
</html>
`
};

export default renderHtml;
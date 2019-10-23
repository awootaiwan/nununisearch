import React from "react";
import ReactDOM from "react-dom";
import ErrorAlert from "./components/erroralert/ErrorAlert";
// import Suggestion from "./components/suggestion/suggestion";
// import ProductList from "./components/product/ProductList";
// import ProductTag from "./components/productTag/productTag";

import "./sidenav.js";


const App = props => (
  <React.Fragment>
    {props.errcode === 0 ? (
      props.children
    ) : (
      <ErrorAlert errmsg={props.errmsg} />
    )}
  </React.Fragment>
);

ReactDOM.render(
  <App errcode={1} errmsg={'sdaf'}>
    <h1>hihi</h1>
  </App>,
  document.getElementById('siteSearch')
);

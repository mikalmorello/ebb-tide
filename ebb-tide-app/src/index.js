import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/index.js";  
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";


// Variables
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// APP
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
document.getElementById('app'));

serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/index.js";  
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();

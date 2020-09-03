import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom'

import { createStore,compose,applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ThunkMiddleware from 'redux-thunk'

import rootReducer from './Reducers/'


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// let el = compose(applyMiddleware(ThunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__());
let redux_dev = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();  

let store;
if(redux_dev!==undefined){
  store = createStore(rootReducer,compose(applyMiddleware(ThunkMiddleware),redux_dev));
}
else{
  store = createStore(rootReducer,applyMiddleware(ThunkMiddleware));
}


ReactDOM.render(
  <React.StrictMode>
  	<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

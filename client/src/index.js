import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
=======

import { createStore,compose,applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ThunkMiddleware from 'redux-thunk'

import rootReducer from './Reducers/'


>>>>>>> dev
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// let el = compose(applyMiddleware(ThunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer,compose(applyMiddleware(ThunkMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

console.log(store);


ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
  	<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
>>>>>>> dev
  </React.StrictMode>,
  document.getElementById('root'),

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

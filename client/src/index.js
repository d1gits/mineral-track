// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'
//
// import './css/main.css'
// import './css/flexboxgrid.css'
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './App';
import Signout from './components/Auth/Signout/Signout';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/Auth/Require_auth';
import Home from './components/Home';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { SET_ADMIN_PRIVILEGES } from './actions/types';
import jwt_decode from 'jwt-decode';


import './css/main.css'
import './css/flexboxgrid.css'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
// update application state with token information if needed
if (token) {
  // update authentication flag
  store.dispatch({ type: AUTH_USER, payload: user });

  // update admin privileges if needed
  let decoded_token = jwt_decode(token);
  if (decoded_token.role === 'admin') {
    store.dispatch({ type: SET_ADMIN_PRIVILEGES });
  }

}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signout" component={Signout} />
        <Route path="dashboard" component={RequireAuth(Dashboard)} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));

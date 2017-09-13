import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise'
import reducer from '../reducers/';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(promise)
  )
);

export default store;
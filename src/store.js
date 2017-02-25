import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore } from 'react-router-redux'; // hook up Router to Redux
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';

export const store = createStore(rootReducer, /* preloadedState, */ composeWithDevTools(
    applyMiddleware(thunk),
  ));

export const history = syncHistoryWithStore(browserHistory, store); // make browserHistory accessible in the store

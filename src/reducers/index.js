import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { HeroReducer } from './hero';

export const rootReducer = combineReducers(
  {
    hero: HeroReducer,
    routing: routerReducer
  }
)

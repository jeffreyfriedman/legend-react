import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { HeroReducer } from './hero';
import { ObstaclesReducer } from './obstacles';

export const rootReducer = combineReducers(
  {
    hero: HeroReducer,
    obstacles: ObstaclesReducer,
    routing: routerReducer
  }
)

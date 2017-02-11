import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { HeroReducer } from './hero';
import { AssetsReducer } from './assets';
import { ObstaclesReducer } from './obstacles';

export const rootReducer = combineReducers(
  {
    hero: HeroReducer,
    assets: AssetsReducer,
    obstacles: ObstaclesReducer,
    routing: routerReducer
  }
)

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { HeroReducer } from './hero';
import { ObstaclesReducer } from './obstacles';
import { NpcReducer } from './npc';
import { EnemyReducer } from './enemy';

export const rootReducer = combineReducers(
  {
    hero: HeroReducer,
    obstacles: ObstaclesReducer,
    npcs: NpcReducer,
    enemies: EnemyReducer,
    routing: routerReducer
  }
)

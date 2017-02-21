import gotSword1 from '../assets/images/sprites/link/sprites_79.png';
import * as helpers from '../lib/helpers';

import {
  heroSpriteLeftArray,
  heroSpriteRightArray,
  heroSpriteUpArray,
  heroSpriteDownArray,
  swordAttackArray1
} from '../assets/images/sprites/link/animation.js';

const defaultState = {
  coordinates: {
    x: 200,
    y: 200
  },
  pixelsWidth: 16,
  pixelsHeight: 22,
  lastMove: 'down',
  currentSprite: heroSpriteDownArray[0][0],
  currentSpriteIndex: 0,
  spriteArrayIndex: 0,
  action: {
    index: 0,
    direction: '',
    swingingSword: false
  },
  stats: {
    health: 100
  },
  weapons: {
    sword: false
  },
  gotItem: false,
  lockUpgrade: false
}

export const HeroReducer = (state = defaultState, action) => {
  let newState = {...state};
  switch (action.type) {
    case 'INITIALIZE_HERO':
      return action.hero

    case 'CELEBRATE_ITEM':
      if (!state.lockUpgrade) {
        newState.gotItem = true;
        newState.lockUpgrade = true;
        newState.currentSprite = gotSword1;
        newState.spriteArrayIndex += 1; // advance to next set of character sprites
      }
      return newState;

    case 'ADJUST_HERO_COORDINATES':
      newState.coordinates = action.newCoordinates;
      newState.lastMove = action.lastMove;

      switch (action.lastMove) {
        case 'down':
          let downSpriteIndex = state.currentSpriteIndex;
          if (downSpriteIndex !== -1 && (downSpriteIndex + 1) < heroSpriteDownArray[state.spriteArrayIndex].length) {
            newState.currentSpriteIndex += 1;
            newState.currentSprite = heroSpriteDownArray[state.spriteArrayIndex][downSpriteIndex + 1];
          } else {
            newState.currentSpriteIndex = 0;
            newState.currentSprite = heroSpriteDownArray[state.spriteArrayIndex][0];
          }
          break;

        case 'up':
          let upSpriteIndex = state.currentSpriteIndex;
          if (upSpriteIndex !== -1 && (upSpriteIndex + 1) < heroSpriteUpArray[state.spriteArrayIndex].length) {
            newState.currentSpriteIndex += 1;
            newState.currentSprite = heroSpriteUpArray[state.spriteArrayIndex][upSpriteIndex + 1];
          } else {
            newState.currentSpriteIndex = 0;
            newState.currentSprite = heroSpriteUpArray[state.spriteArrayIndex][0];
          }
          break;

        case 'right':
          let rightSpriteIndex = state.currentSpriteIndex;
          if (rightSpriteIndex !== -1 && (rightSpriteIndex + 1) < heroSpriteRightArray[state.spriteArrayIndex].length) {
            newState.currentSpriteIndex += 1;
            newState.currentSprite = heroSpriteRightArray[state.spriteArrayIndex][rightSpriteIndex + 1];
          } else {
            newState.currentSpriteIndex = 0;
            newState.currentSprite = heroSpriteRightArray[state.spriteArrayIndex][0];
          }
          break;

        case 'left':
          let leftSpriteIndex = state.currentSpriteIndex;
          if (leftSpriteIndex !== -1 && (leftSpriteIndex + 1) < heroSpriteLeftArray[state.spriteArrayIndex].length) {
            newState.currentSpriteIndex += 1;
            newState.currentSprite = heroSpriteLeftArray[state.spriteArrayIndex][leftSpriteIndex + 1];
          } else {
            newState.currentSpriteIndex = 0;
            newState.currentSprite = heroSpriteLeftArray[state.spriteArrayIndex][0];
          }
          break;

        case 'swordAttack':
          if (state.lastMove !== 'swordAttack') {
            newState.action.direction = state.lastMove;
          }

          if (state.weapons.sword) {
            let actionArray;
            if (state.action.direction === 'down') actionArray = swordAttackArray1[0];
            else if (state.action.direction === 'up') actionArray = swordAttackArray1[1];
            else if (state.action.direction === 'left') actionArray = swordAttackArray1[2];
            else if (state.action.direction === 'right') actionArray = swordAttackArray1[3];

            let swingSpriteIndex = state.currentSpriteIndex;
            if (swingSpriteIndex !== -1 && (swingSpriteIndex + 1) < actionArray.length) {
              newState.action.swingingSword = true;
              newState.currentSpriteIndex += 1;
              newState.currentSprite = actionArray[swingSpriteIndex + 1];
            } else {
              newState.action.swingingSword = false;
            }
          }
          break;

        default:
          break;
      }
      return newState;

    case 'RESET_HERO_SPRITE':
      if (state.gotItem) {
        helpers.wait(2000);
        newState.gotItem = false;
        newState.lockUpgrade = false;
        newState.weapons.sword = true;
        newState.currentSprite = heroSpriteDownArray[state.spriteArrayIndex][0];
      }
      if (!state.action.swingingSword) {
        let resetDirection;
        if (state.lastMove === 'swordAttack') {
          resetDirection = state.action.direction;
          newState.lastMove = state.action.direction;
        }
        if (state.lastMove === 'up' || resetDirection === 'up') newState.currentSprite = heroSpriteUpArray[state.spriteArrayIndex][0];
        if (state.lastMove === 'down' || resetDirection === 'down') newState.currentSprite = heroSpriteDownArray[state.spriteArrayIndex][0];
        if (state.lastMove === 'left' || resetDirection === 'left') newState.currentSprite = heroSpriteLeftArray[state.spriteArrayIndex][0];
        if (state.lastMove === 'right' || resetDirection === 'right') newState.currentSprite = heroSpriteRightArray[state.spriteArrayIndex][0];
        newState.currentSpriteIndex = 0;
      }
      return newState;

    default:
      return state;
  }
}

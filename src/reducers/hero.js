import gotSword1 from '../assets/images/sprites/link/sprites_79.png';

import {
  heroSpriteLeftArray,
  heroSpriteRightArray,
  heroSpriteUpArray,
  heroSpriteDownArray
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
  stats: {
    health: 100
  },
  weapons: {
    sword: false
  },
  gotItem: false,
  lockUpgrade: false
}

const wait = (ms) => {
  let d = new Date();
  let d2 = null;
  do { d2 = new Date(); }
  while(d2 - d < ms);
}

export const HeroReducer = (state = defaultState, action) => {
  let newState = Object.assign({}, state);
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

        default:
          break;
      }
      return newState;

    case 'RESET_HERO_SPRITE':
      if (state.gotItem) {
        wait(2000);
        newState.gotItem = false;
        newState.lockUpgrade = false;
        newState.weapons.sword = true;
        newState.currentSprite = heroSpriteDownArray[state.spriteArrayIndex][0];
      }
      if (state.lastMove === 'up') newState.currentSprite = heroSpriteUpArray[state.spriteArrayIndex][0];
      if (state.lastMove === 'down') newState.currentSprite = heroSpriteDownArray[state.spriteArrayIndex][0];
      if (state.lastMove === 'left') newState.currentSprite = heroSpriteLeftArray[state.spriteArrayIndex][0];
      if (state.lastMove === 'right') newState.currentSprite = heroSpriteRightArray[state.spriteArrayIndex][0];
      newState.currentSpriteIndex = 0;
      return newState;

    default:
      return state;
  }
}

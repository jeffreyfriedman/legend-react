import heroSpriteDown from '../assets/images/sprites/Zelda3Sheet1_250.png';
import heroSpriteRight from '../assets/images/sprites/Zelda3Sheet1_251.png';
import heroSpriteUp from '../assets/images/sprites/Zelda3Sheet1_252.png';
import heroSpriteLeft from '../assets/images/sprites/Zelda3Sheet1_253.png';
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
  sprite: heroSpriteDown,
  stats: {
    health: 100
  }
}

export const HeroReducer = (state = defaultState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'INITIALIZE_HERO':
      return action.hero

    case 'ADJUST_HERO_COORDINATES':
      newState.coordinates = action.newCoordinates;
      newState.lastMove = action.lastMove;
      switch (action.lastMove) {
        case 'down':
          let downSpriteIndex = heroSpriteDownArray.indexOf(state.sprite);
          if (downSpriteIndex !== -1 && (downSpriteIndex + 1) < heroSpriteDownArray.length) {
            newState.sprite = heroSpriteDownArray[downSpriteIndex + 1];
          } else {
            newState.sprite = heroSpriteDownArray[0];
          }
          break;

        case 'up':
          let upSpriteIndex = heroSpriteUpArray.indexOf(state.sprite);
          if (upSpriteIndex !== -1 && (upSpriteIndex + 1) < heroSpriteUpArray.length) {
            newState.sprite = heroSpriteUpArray[upSpriteIndex + 1];
          } else {
            newState.sprite = heroSpriteUpArray[0];
          }
          break;

        case 'right':
          let rightSpriteIndex = heroSpriteRightArray.indexOf(state.sprite);
          if (rightSpriteIndex !== -1 && (rightSpriteIndex + 1) < heroSpriteRightArray.length) {
            newState.sprite = heroSpriteRightArray[rightSpriteIndex + 1];
          } else {
            newState.sprite = heroSpriteRightArray[0];
          }
          break;

        case 'left':
          let leftSpriteIndex = heroSpriteLeftArray.indexOf(state.sprite);
          if (leftSpriteIndex !== -1 && (leftSpriteIndex + 1) < heroSpriteLeftArray.length) {
            newState.sprite = heroSpriteLeftArray[leftSpriteIndex + 1];
          } else {
            newState.sprite = heroSpriteLeftArray[0];
          }
          break;

        default:
          break;
      }
      return newState;

    case 'RESET_HERO_SPRITE':
      if (state.lastMove === 'up') newState.sprite = heroSpriteUp;
      if (state.lastMove === 'down') newState.sprite = heroSpriteDown;
      if (state.lastMove === 'left') newState.sprite = heroSpriteLeft;
      if (state.lastMove === 'right') newState.sprite = heroSpriteRight;
      return newState;

    default:
      return state;
  }
}

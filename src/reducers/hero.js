import heroSpriteDown from '../assets/images/sprites/Zelda3Sheet1_250.png';
import heroSpriteRight from '../assets/images/sprites/Zelda3Sheet1_251.png';
import heroSpriteUp from '../assets/images/sprites/Zelda3Sheet1_252.png';
import heroSpriteLeft from '../assets/images/sprites/Zelda3Sheet1_253.png';

const defaultState = {
  coordinates: {
    x: 6,
    y: 6
  },
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
          newState.sprite = heroSpriteDown;
          break;

        case 'up':
          newState.sprite = heroSpriteUp;
          break;

        case 'right':
          newState.sprite = heroSpriteRight;
          break;

        case 'left':
          newState.sprite = heroSpriteLeft;
          break;

        default:
          break;
      }
      return newState

    default:
      return state
  }
}

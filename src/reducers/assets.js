import heroSpriteDown from '../assets/images/sprites/Zelda3Sheet1_250.png';
import heroSpriteRight from '../assets/images/sprites/Zelda3Sheet1_251.png';
import heroSpriteUp from '../assets/images/sprites/Zelda3Sheet1_252.png';
import heroSpriteLeft from '../assets/images/sprites/Zelda3Sheet1_253.png';

const spritesCollection = {
  heroSpriteDown,
  heroSpriteRight,
  heroSpriteUp,
  heroSpriteLeft
}

export const AssetsReducer = (state = spritesCollection, action) => {
  switch (action.type) {
    case 'INITIALIZE_ASSETS':
      return action.assets

    default:
      return state
  }
}

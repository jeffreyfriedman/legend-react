import woundedUncle from '../assets/images/sprites/Links-Uncle-Wounded-Sprite.png';

const initializeNpcs = () => {
  const npcArray = [
    { // uncle
      image: woundedUncle,
      pixelsWidth: 30,
      pixelsHeight: 30,
      coordinates: {
        x: 270,
        y: 170,
      },
      item: true
    }
  ]

  return npcArray;
}

export const NpcReducer = (state = initializeNpcs(), action) => {
  switch (action.type) {
    case 'INITIALIZE_NPCS':
      return action.npcs

    default:
      return state
  }
}

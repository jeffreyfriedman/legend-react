import house from '../assets/images/sprites/Zelda3Sheet3_129.png';

const initializeObstacles = () => {
  const obstaclesArray = [
    { // house
      image: house,
      pixelsWidth: 94,
      pixelsHeight: 83,
      coordinates: {
        x: 200,
        y: 100
      }
    }
  ]

  return obstaclesArray;
}

export const ObstaclesReducer = (state = initializeObstacles(), action) => {
  switch (action.type) {
    case 'INITIALIZE_OBSTACLES':
      return action.obstacles

    default:
      return state
  }
}

import tree from '../assets/images/sprites/Zelda3Sheet1_111.png';
import house from '../assets/images/sprites/Zelda3Sheet3_129.png';

const initializeObstacles = () => {
  const obstaclesArray = [
    { // tree
      image: tree,
      pixelsWidth: 16,
      pixelsHeight: 17,
      coordinates: {
        x: 100,
        y: 100,
      }

    },
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

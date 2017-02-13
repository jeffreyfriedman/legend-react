import tree from '../assets/images/sprites/Zelda3Sheet1_111.png';
import house from '../assets/images/sprites/Zelda3Sheet3_129.png';

const initializeObstacles = () => {
  const obstaclesArray = [
    { // tree
      image: tree,
      relativeHeight: 34,
      relativeWidth: 6,
      x: 7,
      y: 7
    },
    { // house
      image: house,
      relativeHeight: 102,
      relativeWidth: 26,
      x: 2,
      y: 2
    }
  ]

  let initialArray = [];
  obstaclesArray.forEach(obstacle => {
    initialArray.push(obstacle);
    // make multi-cell obstacles/characters take up physical space across
    // all of the cells in which they are rendered
    for (let i = 0; i <= obstacle.relativeWidth; i++) {
      initialArray.push({ x: obstacle.x + i, y: obstacle.y })
    }
  });
  return initialArray;
}

export const ObstaclesReducer = (state = initializeObstacles(), action) => {
  switch (action.type) {
    case 'INITIALIZE_OBSTACLES':
      return action.obstacles

    default:
      return state
  }
}

import tree from '../assets/images/sprites/Zelda3Sheet1_111.png';
import house from '../assets/images/sprites/Zelda3Sheet3_129.png';

const initializeObstacles = () => {
  const obstaclesArray = [
    { // tree
      image: tree,
      rowHeight: 1,
      colsWidth: 6,
      x: 20,
      y: 10
    },
    { // house
      image: house,
      rowHeight: 3,
      colsWidth: 26,
      x: 2,
      y: 2
    }
  ]

  let initialArray = [];
  obstaclesArray.forEach(obstacle => {
    initialArray.push(obstacle);
    // make multi-cell obstacles/characters take up physical space across
    // all of the cells in which they are rendered
    for (let i = 0; i < obstacle.colsWidth; i++) {
      initialArray.push({ x: obstacle.x + i, y: obstacle.y });
      for (let j = 0; j < obstacle.rowHeight; j++) {
        initialArray.push({ x: obstacle.x + i, y: obstacle.y + j });
      }

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

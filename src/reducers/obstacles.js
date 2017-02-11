import tree from '../assets/images/sprites/Zelda3Sheet1_111.png';
import house from '../assets/images/sprites/Zelda3Sheet3_129.png';

const initializeObstacles = () => {
  const obstaclesArray = [
    { // tree
      image: tree,
      height: 34,
      width: 32,
      x: 7,
      y: 7
    },
    { // house
      image: house,
      height: 102,
      width: 96,
      x: 2,
      y: 2
    }
  ]

  let spacerArray = [];
  let isSquare = 0;
  obstaclesArray.forEach(obstacle => {
    if (obstacle.width && Math.floor(obstacle.width / 48) >= 1) {
      isSquare++;
      for (let i = 1; i < Math.floor(obstacle.width / 48); i++) {
        spacerArray.push({
          x: obstacle.x + i,
          y: obstacle.y
        })
      }
    }
    if (obstacle.height && Math.floor(obstacle.height / 50) >= 2) {
      isSquare++;
      for (let i = 1; i < Math.floor(obstacle.height / 50); i++) {
        spacerArray.push({
          x: obstacle.x,
          y: obstacle.y + i
        });
      }
    }
    if (isSquare === 2) {
      spacerArray.push({
        x: obstacle.x + 1,
        y: obstacle.y + 1
      });
    }
  });

  return obstaclesArray.concat(spacerArray);
}

export const ObstaclesReducer = (state = initializeObstacles(), action) => {
  switch (action.type) {
    case 'INITIALIZE_OBSTACLES':
      return action.obstacles

    default:
      return state
  }
}

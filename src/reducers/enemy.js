import tree from '../assets/images/sprites/Zelda3Sheet1_111.png';

const initializeEnemies = () => {
  const enemyArray = [
    {
      id: 1,
      type: 'enemy',
      image: tree,
      pixelsWidth: 16,
      pixelsHeight: 17,
      coordinates: {
        x: 100,
        y: 100,
      },
      hp: 100
    }
  ]

  return enemyArray;
}

export const EnemyReducer = (state = initializeEnemies(), action) => {
  switch (action.type) {
    case 'INITIALIZE_ENEMIES':
      return action.enemies;
    case 'CELEBRATE_ITEM':
      if (action.itemHolder.type === 'enemy') {
        let changedEnemy = {...action.itemHolder};  // copy of Enemy object
        changedEnemy.item = false;
        let enemyIndex = state.findIndex(enemy => enemy.id === action.itemHolder.id);
        return [...state.slice(0, enemyIndex), changedEnemy, ...state.slice(enemyIndex + 1)];
      } else return state;


    case 'ADJUST_HERO_COORDINATES':
      let enemyArray = [...state];
      if (action.hero.action.swingingSword && action.hero.currentSpriteIndex === 0) { // only inflict damage once per sword-swing animation
        let enemySquare = enemyArray.filter(enemy => {
          return (
            (enemy.coordinates.x - action.hero.coordinates.x <= 20 && action.hero.action.direction === 'right') ||
            (action.hero.coordinates.x - enemy.coordinates.x  <= 20 && action.hero.action.direction === 'left') ||
            (enemy.coordinates.y - action.hero.coordinates.y <= 20 && action.hero.action.direction === 'down') ||
            (action.hero.coordinates.y - enemy.coordinates.y <= 20 && action.hero.action.direction === 'up')
          );
        });

        if (enemySquare.length > 0) {
          enemySquare.forEach(damagedEnemy => {
            damagedEnemy.hp -= action.hero.weapons.sword.damage;
            let enemyIndex = enemyArray.findIndex(enemy => enemy.id === damagedEnemy.id);
            if (damagedEnemy.hp > 0) {
              enemyArray = [...enemyArray.slice(0, enemyIndex), damagedEnemy, ...enemyArray.slice(enemyIndex + 1)];
            } else {
              enemyArray = [...enemyArray.slice(0, enemyIndex), ...enemyArray.slice(enemyIndex + 1)];
            }
          });
        }
      }
      return enemyArray;


    default:
      return state
  }
}

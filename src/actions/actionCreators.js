export const initializeHero = (hero) => {
  return {
    type: 'INITIALIZE_HERO',
    hero
  }
}

export const heroStatus = (hero) => {
  return (dispatch, getState) => {
    dispatch(initializeHero(getState().hero));
  }
}

export const celebrateItem = (itemHolder) => {
  return {
    type: 'CELEBRATE_ITEM',
    itemHolder
  }
}

export const adjustHeroCoordinates = (hero, newCoordinates, lastMove) => {
  return {
    type: 'ADJUST_HERO_COORDINATES',
    hero,
    newCoordinates,
    lastMove
  }
}

export const resetSprite = (hero) => {
  return {
      type: 'RESET_HERO_SPRITE',
      hero
  }
}

export const moveCharacter = (newXPosition, newYPosition, lastMove, speed, scrollMargin, screenWidth, screenHeight) => {
  return (dispatch, getState) => {

    let hero = getState().hero,
        obstacles = getState().obstacles,
        npcs = getState().npcs,
        enemies = getState().enemies;

    // get all of the obstacles that occupy the square the protagonist is moving into
    let obstacleSquare = obstacles.filter(obstacle => {
      return (
        ((newXPosition + hero.pixelsWidth >= obstacle.coordinates.x &&
          newXPosition <= obstacle.coordinates.x + obstacle.pixelsWidth) &&
          (newYPosition + hero.pixelsHeight >= obstacle.coordinates.y && newYPosition + 15 <= obstacle.coordinates.y + obstacle.pixelsHeight))
      );
    });

    // get all of the NPCs that occupy the square the protagonist is moving into
    let npcSquare = npcs.filter(npc => {
      return (
        ((newXPosition + hero.pixelsWidth >= npc.coordinates.x &&
          newXPosition <= npc.coordinates.x + npc.pixelsWidth) &&
          (newYPosition + hero.pixelsHeight >= npc.coordinates.y && newYPosition + 15 <= npc.coordinates.y + npc.pixelsHeight))
      );
    });
    
     // get all of the enemies that occupy the square the protagonist is moving into
    let enemySquare = enemies.filter(enemy => {
      return (
        ((newXPosition + hero.pixelsWidth >= enemy.coordinates.x &&
          newXPosition <= enemy.coordinates.x + enemy.pixelsWidth) &&
          (newYPosition + hero.pixelsHeight >= enemy.coordinates.y && newYPosition + 15 <= enemy.coordinates.y + enemy.pixelsHeight))
      );
    });

    let occupiedSquare = [...obstacleSquare, ...npcSquare, ...enemySquare];
    let itemSquare = occupiedSquare.filter(occupier => {
      return(occupier.item === true)
    });

    // if not occupied, allow character to move into that cell
    if (occupiedSquare.length === 0 && newYPosition >= 85) {
      let newCoordinates = { x: newXPosition, y: newYPosition }
      dispatch(adjustHeroCoordinates(hero, newCoordinates, lastMove));
      
      // 150 pixels from edge before scrolling
      if (newXPosition < scrollMargin && lastMove === 'left') dispatch(scrollLeft(speed));
      if (screenWidth - newXPosition < scrollMargin && lastMove === 'right') dispatch(scrollRight(speed));
      if (newYPosition < scrollMargin && lastMove === 'up') dispatch(scrollUp(speed));
      if (screenHeight - newYPosition < scrollMargin && lastMove === 'down') dispatch(scrollDown(speed));
    }

    // if the next square has an inventory item,
    // invoke hero celebration and also remove item from the object
    // so it cannot be received multiple times
    if (itemSquare.length !== 0) {
      dispatch(celebrateItem(itemSquare[0]));
    }
  }
};

const adjustWorldCoordinates = (adjustment) => {
  return {
    type: 'ADJUST_WORLD_COORDINATES',
    adjustment
  }
}

export const scrollLeft = (speed) => {
  return (dispatch, getState) => {
    dispatch(adjustWorldCoordinates({ x: speed, y: 0 }));
  }
};

export const scrollUp = (speed) => {
  return (dispatch, getState) => {
    dispatch(adjustWorldCoordinates({ x: 0, y: speed }));
  }
};

export const scrollRight = (speed) => {
  return (dispatch, getState) => {
    dispatch(adjustWorldCoordinates({ x: -speed, y: 0 }));
  }
};

export const scrollDown = (speed) => {
  return (dispatch, getState) => {
    dispatch(adjustWorldCoordinates({ x: 0, y: -speed }));
  }
};

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

export const celebrateItem = (item) => {
  return {
    type: 'CELEBRATE_ITEM',
    item
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

export const moveCharacter = (newXPosition, newYPosition, lastMove) => {
  return (dispatch, getState) => {

    let hero = getState().hero,
        obstacles = getState().obstacles,
        npcs = getState().npcs;

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

    let occupiedSquare = [...obstacleSquare, ...npcSquare];
    let itemSquare = occupiedSquare.filter(occupier => {
      return(occupier.item === true)
    });

    let item;
    if (itemSquare.length !== 0) {
      item = itemSquare[0].item;
      itemSquare[0].item = false;
    }

    // if not occupied, allow character to move into that cell
    if (occupiedSquare.length === 0 && newYPosition >= 85) {
      let newCoordinates = { x: newXPosition, y: newYPosition }
      dispatch(adjustHeroCoordinates(hero, newCoordinates, lastMove));
    }

    if (item) {
      dispatch(celebrateItem(item));
    }
  }
};

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

export const adjustHeroCoordinates = (hero, newCoordinates, lastMove) => {
  return {
    type: 'ADJUST_HERO_COORDINATES',
    newCoordinates,
    lastMove,
    hero
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
        obstacles = getState().obstacles;

    let occupiedSquare = obstacles.filter(obstacle => {
      return (
        ((newXPosition + hero.pixelsWidth >= obstacle.coordinates.x &&
          newXPosition <= obstacle.coordinates.x + obstacle.pixelsWidth) &&
          (newYPosition + hero.pixelsHeight >= obstacle.coordinates.y && newYPosition <= obstacle.coordinates.y + obstacle.pixelsHeight))
      );
    });

    // if not occupied, allow character to move into that cell
    if (occupiedSquare.length === 0 && newYPosition >= 85) {
      let newCoordinates = { x: newXPosition, y: newYPosition }
      dispatch(adjustHeroCoordinates(hero, newCoordinates, lastMove));
    }
  }
};

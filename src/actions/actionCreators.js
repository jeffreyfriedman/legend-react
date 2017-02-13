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

export const moveCharacter = (event) => {
  return (dispatch, getState) => {
    let hero = getState().hero,
        obstacles = getState().obstacles,
        newXPosition = hero.coordinates.x,
        newYPosition = hero.coordinates.y,
        lastMove = hero.lastMove;
    switch (event.keyCode) {
      case 37:
        newXPosition -= 2;
        lastMove = 'left';
        break;

      case 39:
        newXPosition += 2;
        lastMove = 'right';
        break;

      case 38:
        newYPosition -= 1;
        lastMove = 'up';  // origin is upper left
        break;

      case 40:
        newYPosition += 1;
        lastMove = 'down';
        break;

      default:
        break;
    }


    // check if cell to move character into is already occupied
    // character has mass of four columns, so check up to two columns to the right
    // (character is left-aligned, so don't need to check left)
    let occupiedSquare = obstacles.filter(obstacle => {
      return (
        ((obstacle.x === newXPosition) &&
        (obstacle.y === newYPosition)) ||
        ((obstacle.x === newXPosition + 1) &&
        (obstacle.y === newYPosition)) ||
        ((obstacle.x === newXPosition + 2) &&
        (obstacle.y === newYPosition)) ||
        ((obstacle.x === newXPosition + 3) &&
        (obstacle.y === newYPosition)) ||
        ((obstacle.x === newXPosition + 4) &&
        (obstacle.y === newYPosition))
      );
    });

    // if not occupied, allow character to move into that cell
    if (occupiedSquare.length === 0) {
      let newCoordinates = { x: newXPosition, y: newYPosition }
      dispatch(adjustHeroCoordinates(getState().hero, newCoordinates, lastMove));
    }
  }
};

export const moveHeroDirection = (direction) => {
  return (dispatch, getState) => {
    switch(direction) {
      case 'up':
        dispatch(adjustHeroCoordinates(getState().hero, direction));
        break;

      default:
        break;
    }
  }
}

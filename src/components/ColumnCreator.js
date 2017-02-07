import React from 'react';
import Hero from './Hero';
import Obstacle from './Obstacle';

const ColumnCreator = props => {
  let col,
      colStyle,
      colSpan,
      rowSpan;

  if ((props.row === props.heroCoord.y) && (props.col === props.heroCoord.x)) {
    colStyle = {
      display: 'inline-block',
      width: '3em'
    }

    col =
    <Hero
      heroSprite={props.heroSprite}
    />

  }

  if (props.obstacle) {
    colStyle = {
      display: 'inline-block',
      width: '3em'
    }
    colSpan = 2;
    rowSpan = 2;
    col = <Obstacle obstacle={props.obstacle} />
  }

  if (!col) {
    colStyle = {
      display: 'inline-block',
      width: '3em'
    }
    col = '';
  }

  return (
    <td style={colStyle} colSpan={colSpan} rowSpan={rowSpan} height='50em'>
      {col}
    </td>
  )
}

export default ColumnCreator;

import React from 'react';
import Hero from './Hero';
import Obstacle from './Obstacle';

const ColumnCreator = props => {
  let col;
  let colStyle = {
    display: 'inline-block'
  }
  console.log(`Hero: (${props.heroCoord.x}, ${props.heroCoord.y})`)
  if ((props.row === props.heroCoord.y) && (props.col === props.heroCoord.x)) {
    col =
    <Hero
      heroSprite={props.heroSprite}
    />
  } else if ((props.obstacles[0] && props.row === props.obstacles[0].x) && (props.col === props.obstacles[0].y)) {
    col = <Obstacle obstacle={props.obstacles[0]} />
  } else {
    col = <div style={colStyle} className='col s1'>space</div>
  }

  return (
    <div style={colStyle}>
      {col}
    </div>
  )
}

export default ColumnCreator;

// } else if ((props.row === 11) && (props.col === props.obstacles[0])) {
//   console.log(`Obstacle row: ${props.row}, Obstacle col: ${props.col}`);
//   col = <div className='col s1'><Obstacle tree={props.tree} /></div>
// } else {
//   col = <div className='col s1'>space</div>
// }

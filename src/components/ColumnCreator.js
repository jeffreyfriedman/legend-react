import React from 'react';
import Hero from './Hero';
import Obstacle from './Obstacle';

const ColumnCreator = props => {
  let col;
  let colStyle = {
    display: 'inline-block'
  }
  console.log(`Hero: (${props.heroXCoord}, ${props.heroYCoord})`)
  if ((props.row === props.heroYCoord) && (props.col === props.heroXCoord)) {
    col =
    <Hero
      heroSprite={props.heroSprite}
    />
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

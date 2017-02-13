import React from 'react';

const Obstacle = props => {
  let imageToggle;
  if (props.obstacle.image) {
    imageToggle = <img src={props.obstacle.image}
      alt="Obstacle"
      width={props.obstacle.relativeWidth * 6}/>
  }
  return (
    <div className='alignleft'>
      {imageToggle}
    </div>
  )
}

export default Obstacle;

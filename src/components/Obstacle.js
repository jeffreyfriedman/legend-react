import React from 'react';

const Obstacle = props => {
  let imageToggle;
  if (props.obstacle.image) {
    imageToggle = <img src={props.obstacle.image}
      alt="Obstacle"
      style={props.position}
      />
  }
  return (
    <div className='align-upper-left'>
      {imageToggle}
    </div>
  )
}

export default Obstacle;

import React from 'react';

const Obstacle = props => {
  return (
    <div>
      <img src={props.obstacle.image} alt="Obstacle" height="34" width="32"/>
    </div>
  )
}

export default Obstacle;
//

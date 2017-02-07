import React from 'react';

const Obstacle = props => {
  let imageToggle;
  if (props.obstacle.image) {
    imageToggle = <img src={props.obstacle.image} alt="Obstacle" height={props.obstacle.height} width={props.obstacle.width}/>
  }
  return (
    <div>
      {imageToggle}
    </div>
  )
}

export default Obstacle;

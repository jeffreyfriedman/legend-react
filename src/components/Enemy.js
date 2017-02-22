import React from 'react';

const Enemy = props => {
  let imageToggle;
  if (props.enemy.image) {
    imageToggle = <img src={props.enemy.image}
      alt="Enemy"
      style={props.position}
      />
  }
  return (
    <div className='align-upper-left'>
      {imageToggle}
    </div>
  )
}

export default Enemy;

import React from 'react';

const StatusBar = props => {
  let heroHealth;
  if (props.hero) heroHealth = props.hero.stats.health;
  return(
    <div className='stats'>
      Health: {heroHealth}
    </div>
  )
}

export default StatusBar;

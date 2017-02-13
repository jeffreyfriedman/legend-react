import React from 'react';

const StatusBar = props => {
  let heroHealth;
  if (props.hero) heroHealth = props.hero.stats.health;
  return(
    <td className='stats'>
      Health: {heroHealth}
    </td>
  )
}

export default StatusBar;

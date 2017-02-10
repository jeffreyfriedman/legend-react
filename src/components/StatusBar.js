import React from 'react';

const StatusBar = props => {
  let heroHealth;
  if (props.hero) heroHealth = props.hero.stats.health;
  return(
    <td>
      Health: {heroHealth}
    </td>
  )
}

export default StatusBar;

import React from 'react';

const StatusBar = props => {
  let heroHealth,
      instructionStyle = {
        textAlign: 'right'
      }
  if (props.hero) heroHealth = props.hero.stats.health;
  return(
    <div className='stats'>
      Health: {heroHealth}
      <span style={instructionStyle}>•  Arrow keys: move  •</span>
      <span style={instructionStyle}>&nbsp;z: attack</span>
    </div>
  )
}

export default StatusBar;

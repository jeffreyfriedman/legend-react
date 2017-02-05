import React from 'react';

const Hero = props => {
  return(
    <div>
      <img src={props.heroSprite} alt='Hero' height="44" width="32" />
    </div>
  )
}

export default Hero;

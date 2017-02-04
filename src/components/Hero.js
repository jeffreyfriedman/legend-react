import React from 'react';

const Hero = props => {
  return(
    <div>
      <img src={props.heroSprite} alt='Hero' height="100" width="60" />
    </div>
  )
}

export default Hero;

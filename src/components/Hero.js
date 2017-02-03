import React from 'react';

const Hero = props => {
  return(
    <div>
      <img src={props.hero} alt='Hero' height="10" width="5" />
    </div>
  )
}

export default Hero;

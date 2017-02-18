import React from 'react';

const Npc = props => {
  let imageToggle;
  if (props.npc.image) {
    imageToggle = <img src={props.npc.image}
      alt="Npc"
      style={props.position}
      />
  }
  return (
    <div className='align-upper-left'>
      {imageToggle}
    </div>
  )
}

export default Npc;

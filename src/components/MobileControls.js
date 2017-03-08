import React from 'react';

const MobileControls = props => {
  return(
    <div className='container mobile-controls'>
      <div className='row'>
        <div className='col s1'></div>
        <div className='col s2' onClick={props.simulateUp} onTouchStart={props.simulateUp} onTouchEnd={props.stopUp}><i className='material-icons'>arrow_upward</i></div>
      </div>
      <div className='row'>
        <div className='col s2' onClick={props.simulateLeft} onTouchStart={props.simulateLeft} onTouchEnd={props.stopLeft}><i className='material-icons'>arrow_back</i></div>
        <div className='col s2' onClick={props.simulateRight} onTouchStart={props.simulateRight} onTouchEnd={props.stopRight}><i className='material-icons'>arrow_forward</i></div>
      </div>
      <div className='row'>
        <div className='col s1'></div>
        <div className='col s2' onClick={props.simulateDown} onTouchStart={props.simulateDown} onTouchEnd={props.stopDown}><i className='material-icons'>arrow_downward</i></div>
      </div>
    </div>
  )
}

export default MobileControls;

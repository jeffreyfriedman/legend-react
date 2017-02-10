import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import NavLink from '../components/NavLink';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
        <div>
          <ul>
            <li><NavLink to="/">&nbsp;Legend of React</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    hero: state.hero
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

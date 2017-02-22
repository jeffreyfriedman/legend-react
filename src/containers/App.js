import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import NavLink from '../components/NavLink';
import myTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
        <div>
          <ul>
            <li><NavLink to="/">Legend of React</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    hero: state.hero,
    obstacles: state.obstacles,
    npcs: state.npcs,
    enemies: state.enemies
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';
const style = {margin: 5};

class Navigation extends Component {

  constructor(props) {
    super(props)


  }

			// 	<Link className="nav-item" key={4} to="/signout">log Out</Link>
      // </div>
  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><Avatar
          icon={<Person />}
          color={'#555555'}
          backgroundColor={'white'}
          size={45}
          style={style}
        /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}

      >
        <MenuItem primaryText="User Settings" containerElement={<Link to="/about" />} />
        <MenuItem primaryText="Sign out" containerElement={<Link to="/signout" />}/>
      </IconMenu>

    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navigation);

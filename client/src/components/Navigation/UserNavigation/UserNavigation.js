import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Person from 'material-ui/svg-icons/social/person';


const style = {margin: 5};

class Navigation extends Component {

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

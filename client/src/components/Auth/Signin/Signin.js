import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const customContentStyle = {
  width: '300px',
  maxWidth: 'none',
};

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeSignin}
      />,
    <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        action="submit"
        onClick={handleSubmit(this.handleFormSubmit.bind(this))}
      />,
    ];

    return (
      <Dialog
        title="Sign in"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.closeSignin}
        contentStyle={customContentStyle}
        >
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <TextField
                hintText="Email"
                floatingLabelText="Fill in your Email"
                floatingLabelFixed={true}
                {...email}
              />
            <br />
          <TextField
            hintText="Password"
            floatingLabelText="Fill in your Password"
            floatingLabelFixed={true}
            {...password} type="password"
          />

          {this.renderAlert()}
        </form>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

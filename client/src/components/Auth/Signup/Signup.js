import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';

const customContentStyle = {
  width: '340px',
  maxWidth: 'none',
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
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
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeSignup}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        action="submit"
        onClick={handleSubmit(this.handleFormSubmit.bind(this))}
      />,
    ];

    return (
      <Dialog
        title="Sign up"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.closeSignup}
        contentStyle={customContentStyle}
        >
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <TextField
                  hintText="Email"
                  floatingLabelText="Fill in your Email"
                  floatingLabelFixed={true}
                  {...email}
                />
              {email.touched && email.error && <div className="error">{email.error}</div>}
              <br />
            <TextField
              hintText="Password"
              floatingLabelText="Fill in your Password"
              floatingLabelFixed={true}
              {...password} type="password"
            />
            {password.touched && password.error && <div className="error">{password.error}</div>}
            <br />
            <TextField
              hintText="Password conformation"
              floatingLabelText="Confirm your password"
              floatingLabelFixed={true}
              {...passwordConfirm} type="password"
            />
            {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}


            {this.renderAlert()}
          </form>
        </Dialog>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);

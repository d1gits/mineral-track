import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MuiGeoSuggest from 'material-ui-geosuggest';

const customContentStyle = {
  width: '640px',
  maxWidth: 'none',
};

const types = [
  <MenuItem key={1} value={'mine'} primaryText="Mine / Mining Cooperative" />,
  <MenuItem key={2} value={'intermediary'} primaryText="Intermediary" />,
  <MenuItem key={3} value={'enduser'} primaryText="End-user" />
];

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: null
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);

  }

  handleFormSubmit(formProps) {
    this.props.signupUser({...formProps, type: this.state.type});

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
  handleTypeChange = (event, index, type) => this.setState({type});

  render() {
    const { handleSubmit, fields: { email, name, companyName, location, password, passwordConfirm, type}} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeSignup}
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
        title="Sign up"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.closeSignup}
        contentStyle={customContentStyle}
        >
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <SelectField
              floatingLabelText="I am a.."
              floatingLabelFixed={true}
              fullWidth={true}
              hintText="Miner / Intermediary / End-user"
              {...type}
              value={this.state.type}
              onChange={this.handleTypeChange}
            >
              {types}
            </SelectField>

            <TextField
                  hintText="Company name"
                  floatingLabelText="Fill in the company name"
                  floatingLabelFixed={true}
                  {...companyName}
                />
            <MuiGeoSuggest
                  floatingLabelText="Location of the source"
                  hintText="Fill in company source location"
                  floatingLabelFixed={true}
                  style={{float:'right'}}
                  {...location}
              />
            <TextField
                hintText="Your name"
                floatingLabelText="Fill in your full name"
                floatingLabelFixed={true}
                {...name}
                style={{float:'left'}}
              />
            <TextField
                  hintText="Email"
                  floatingLabelText="Fill in your Email"
                  floatingLabelFixed={true}

                  style={{float:'right'}}
                  {...email}
                />
              {email.touched && email.error && <div className="error">{email.error}</div>}
            <TextField
              hintText="Password"
              floatingLabelText="Fill in your Password"
              floatingLabelFixed={true}
              {...password} type="password"
            />
            <TextField
              hintText="Password conformation"
              floatingLabelText="Confirm your password"
              floatingLabelFixed={true}
              {...passwordConfirm}
              type="password"
              style={{float:'right'}}
            />
            {password.touched && password.error && <div className="error">{password.error}</div>}
            {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}


            {this.renderAlert()}
          </form>
        </Dialog>
    );
  }
}

function validate(formProps) {
  const errors = {};

  // if (!formProps.email) {
  //   errors.email = 'Please enter an email';
  // }
  //
  // if (!formProps.password) {
  //   errors.password = 'Please enter a password';
  // }
  //
  // if (!formProps.passwordConfirm) {
  //   errors.passwordConfirm = 'Please enter a password confirmation';
  // }
  //
  // if (formProps.password !== formProps.passwordConfirm) {
  //   errors.password = 'Passwords must match';
  // }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['type', 'email', 'name', 'companyName', 'location', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);

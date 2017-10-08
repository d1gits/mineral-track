import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../../actions';
import MuiGeoSuggest from 'material-ui-geosuggest';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const customContentStyle = {
  width: '360px',
  maxWidth: 'none',
};

const types = [
  <MenuItem key={1} value={'mine'} primaryText="Mine / Mining Cooperative" />,
  <MenuItem key={2} value={'intermediary'} primaryText="Intermediary" />,
  <MenuItem key={3} value={'enduser'} primaryText="End-user" />
];

class AddSource extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: null
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.addCompany({...formProps, type: this.state.type, order:'source'});

  }

  handleTypeChange = (event, index, type) => this.setState({type});

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
    const { handleSubmit, fields: { type, companyName, contactPerson, location}} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeAddSource}
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
        title="Add a new source"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.props.closeAddSource}
        contentStyle={customContentStyle}
        >
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <SelectField
            floatingLabelText="Source Type"
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
                fullWidth={true}
                {...companyName}
              />
          <br />
          <TextField
              hintText="Email company contact person"
              floatingLabelText="Fill in the email for the contact person"
              floatingLabelFixed={true}
              fullWidth={true}
              {...contactPerson}
            />
          <br />

          <MuiGeoSuggest
                floatingLabelText="Location of the source"
                hintText="Fill in company source location"
                floatingLabelFixed={true}
                {...location}
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
  form: 'signup',
  fields: ['type', 'companyName', 'contactPerson', 'location', 'order']
}, mapStateToProps, actions)(AddSource);

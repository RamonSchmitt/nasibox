import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class CreateAccount extends Component {
  state = {
    warning: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      email: this.email.value,
      password: this.password.value,
    };

    if (newUserData.password < 8) {
      this.setState({ warning: 'gebruik een wachtwoord met ten minste 8 tekens' });
    } else {
      Meteor.call('createUserAccount', newUserData);
    }
    Meteor.loginWithPassword(newUserData.email, newUserData.password);
    browserHistory.push('/menu');
  }

  render() {
    return (
      <div className="container menu">
        <div className="col-md-6 col-md-offset-3">
          <form onSubmit={this.handleSubmit} autoComplete="on">
            <div className="form-group">
              <label htmlFor="Input Email">Email</label>
              <input ref={(email) => { this.email = email; }} type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="Input Password">Wachtwoord</label>
              <input ref={(password) => { this.password = password; }} type="password" className="form-control" placeholder="Wachtwoord" />
            </div>
            <button type="submit" className="btn btn-default">Schrijf in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateAccount;

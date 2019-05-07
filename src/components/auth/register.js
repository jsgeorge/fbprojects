import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notify";
import Alert from "../layout/alert";

class Register extends Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password, username } = this.state;
    const { firebase } = this.props;
    console.log(email);
    firebase
      .createUser({ email, password, username })
      .then(response => {
        this.props.history.push("/clients");
      })
      .catch(err => this.props.notifyUser("Registrtion unsuccessful", "error"));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password, username } = this.state;
    const { message, messageType } = this.props.notify;

    return (
      <div classNam="col-md-5 col-md-offset-2 col-sm-5 col-sm-offset-2">
        <div className="card">
          <div className="card-header appFont">
            <h4 className="text-center">Register</h4>
          </div>
          <div className="card-body">
            {message ? (
              <Alert message={message} messageType={messageType} />
            ) : null}
            <form onSubmit={this.onSubmit}>
              <TextInputGroup
                label="Email"
                name="email"
                value={email}
                onChange={this.onChange}
                //error={errors.name}
              />
              <TextInputGroup
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={this.onChange}
                //error={errors.password}
              />
              <TextInputGroup
                label="Username"
                name="username"
                type="text"
                value={username}
                onChange={this.onChange}
                //error={errors.password}
              />

              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired
};
//export default firebaseConnect()(Login);

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Register);

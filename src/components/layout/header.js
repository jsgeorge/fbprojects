import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { DisplayUser } from "./displayuser";

class Header extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogout = e => {
    e.preventDefault();
    const { firebase, history } = this.props;
    firebase.logout();
    //window.location.href = `/auth/login`;
  };


  render() {
    const { branding, auth } = this.props;
    const { isAuthenticated } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 py-0">
        <div className="container">
          <Link to="/posts" className="navbar-brand">
            {branding}
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div
            class="collapse navbar-collapse navbar-right"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mr-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/posts" className="nav-link">
                    Posts
                  </Link>
                </li>
              ) : null}
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    Settings
                  </Link>
                </li>
              ) : null}
              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/auth/login" className="nav-link">
                    Login
                  </Link>
                </li>
              ) : null}
              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/auth/register" className="nav-link">
                    Register
                  </Link>
                </li>
              ) : null}
              {isAuthenticated ? (
                <li className="nav-item">
                  <a href="#" onClick={this.onLogout} className="nav-link">
                    {" "}
                    {auth.email}
                    {/* <DisplayUser key={auth.uid} userid={auth.id} /> */}
                    Logout
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Header);

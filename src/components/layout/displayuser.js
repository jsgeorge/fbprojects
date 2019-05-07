import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import PropTypes from "prop-types";

class DisplayUser extends Component {
  render() {
    const { user, userid } = this.props;
    if (user) {
      return (
        <React-Fragment>
          <img src={user.photoURL} /> {user.displayName}
        </React-Fragment>
      );
    } else {
      return "no user";
    }
  }
}
export default compose(
  firestoreConnect(props => [
    { collection: "users", storeAs: "user", doc: props.userid }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    user: ordered.user && ordered.user[0] // lodash's get can also be used
  }))
)(DisplayUser);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import PropTypes from "prop-types";

class Detail extends Component {
  render() {
    const { post } = this.props;
    if (post) {
      return (
        <div>
          <p>
            <i class="fas fa-arrow-alt-circle-left appFont2" />
            <Link to="/posts">back to posts</Link>
            <span className="listingCmds">
              <Link
                to={`${post.id}/edit`}
                class="btn btn-success btn-sm bkdBlack"
              >
                Edit
              </Link>

              <button className="btn btn-danger btn-sm" onClick="onDelete()">
                Delete
              </button>
            </span>
          </p>
          <div className="card mb-3">
            <div className="card-body">
              <h6>
                {post.category} {post.author}
              </h6>

              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          </div>
        </div>
      ); //end return html
    } else {
      return "Loading...";
    } // end if post
  } //end render
} // end class

export default compose(
  firestoreConnect(props => [
    { collection: "posts", storeAs: "post", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    post: ordered.post && ordered.post[0] // lodash's get can also be used
  }))
)(Detail);

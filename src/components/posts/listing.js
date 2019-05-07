import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Post from "./post";
import Categories from "./categories";
class Listing extends Component {
  render() {
    const { posts } = this.props;

    if (posts) {
      return (
        <div>
          <div class="col-md-9 col-sm-9 col-xs-12 content">
            <section>
              <h4 className="appFont1">
                {" "}
                <span>Latest Posts</span>
                <span className=" headerFont">
                  <Link
                    to="/posts/add"
                    className="btn btn-success btn-sm btnNew"
                  >
                    New
                  </Link>
                </span>
              </h4>
            </section>
            <section>
              <ul className="table list-group">
                {posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </ul>
            </section>
          </div>
          <div className="col-md-3 col-sm-3 col-xs-12 sidebar">
            <h5>Categories</h5>
            <Categories />
          </div>
        </div>
      );
    } else {
      return <h6>Welcome to React Blog Please login or Register</h6>;
    }
  }
}
Listing.propTypes = {
  firestore: PropTypes.object.isRequired,
  posts: PropTypes.array
};
export default compose(
  firestoreConnect([{ collection: "posts" }]),
  connect((state, props) => ({
    posts: state.firestore.ordered.posts
  }))
)(Listing);

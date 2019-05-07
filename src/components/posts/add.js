import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddPost extends Component {
  state = {
    category: "",
    author: this.props.auth.email,
    title: "",
    content: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.firestore.add("posts", this.state);
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { posts, categories } = this.props;
    const { author, category, title, content, errors } = this.state;
    if (categories) {
      return (
        <div className="card mb-3">
          <p>
            <i class="fas fa-arrow-alt-circle-left appFont2" />
            <Link to="/posts">back to posts</Link>
          </p>
          <div className="card-header">
            <h4>New Post</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <label>Category</label>
              <br />
              <select
                className="form-control"
                name="category"
                value={category}
                onChange={this.onChange}
                error={errors.category}
              >
                {categories.map(category => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
              <TextInputGroup
                label="Title"
                name="title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
              />
              <label>Your post</label>
              <br />
              <textarea
                className="form-control"
                label="Your POst"
                name="content"
                type="text"
                value={content}
                onChange={this.onChange}
                error={errors.content}
                rows="6"
              />

              <input
                type="submit"
                value="Add client"
                className="btn btn-primary"
              />
            </form>
          </div>
        </div>
      );
    } else {
      return <h6>Loading ..</h6>;
    }
  }
}

AddPost.prototypes = {
  firestore: PropTypes.object.isRequired,
  posts: PropTypes.array,
  categories: PropTypes.array,
  auth: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect([{ collection: "categories" }]),
  connect((state, props) => ({
    categories: state.firestore.ordered.categories,
    auth: state.firebase.auth
  }))
)(AddPost);

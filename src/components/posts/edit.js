import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, getVal } from "react-redux-firebase";

class Editpost extends Component {
  postId = this.props.match.params.id;

  constructor(props) {
    super(props);
    this.categoryInput = React.createRef();
    this.authorInput = React.createRef();
    this.titleInput = React.createRef();
    this.contentInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const { post, firestore, history } = this.props;

    const updpost = {
      author: this.authorInput.current.value,
      category: this.categoryInput.current.value,
      title: this.titleInput.current.value,
      content: this.contentInput.current.value
    };
    firestore
      .update({ collection: "posts", doc: post.id }, updpost)
      .then(history.push("/posts"));
  };

  render() {
    const { post } = this.props;

    if (post) {
      return (
        <div className="card mb-3">
          <p>
            <i class="fas fa-arrow-alt-circle-left appFont2" />
            <Link to={`/posts/${this.postId}`}>back to post</Link>
          </p>

          <div className="card-header">
            <h4>Edit post</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  className="form-control"
                  label="Author"
                  name="author"
                  ref={this.authorInput}
                  defaultValue={post.author}
                />
              </div>
              <div className="form-group">
                <label>category</label>
                <input
                  type="text"
                  className="form-control"
                  label="category"
                  name="category"
                  ref={this.categoryInput}
                  defaultValue={post.category}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  label="Title"
                  name="title"
                  type="title"
                  placeholder="Enter title"
                  ref={this.titleInput}
                  defaultValue={post.title}
                />
              </div>
              <div className="form-group">
                <label>Post</label>
                <input
                  type="text"
                  className="form-control"
                  label="Post"
                  name="content"
                  ref={this.contentInput}
                  placeholder="Enter content"
                  defaultValue={post.content}
                />
              </div>
              
              <input type="submit" value="Update" className="btn btn-primary" />
            </form>
          </div>
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "posts", storeAs: "post", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    post: ordered.post && ordered.post[0] // lodash's get can also be used
  }))
)(Editpost);

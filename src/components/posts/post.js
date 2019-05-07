import React, { Component } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
  render() {
    const { id, author, category, title, content, image } = this.props.post;
    return (
      <li className="list-group-item">
        <p>
          {category} {author}
        </p>
        <h4>
          <Link to={`posts/${id}`}>{title}</Link>
        </h4>
        {/* <img src={image} alt="image" className="img-responsive" /> */}
      </li>
    );
  }
}

export default Post;

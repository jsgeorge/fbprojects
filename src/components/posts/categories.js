import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Post from "./post";

class Categories extends Component {
  render() {
    const { categories } = this.props;

    if (categories) {
      return (
        <React.Fragment>
          <ul className="list-group">
            {categories.map(category => (
              <li className="list-group-item">{category.name}</li>
            ))}
          </ul>
        </React.Fragment>
      );
    } else {
      return <h6>Loading ..</h6>;
    }
  }
}
Categories.propTypes = {
  firestore: PropTypes.object.isRequired,
  categories: PropTypes.array
};
export default compose(
  firestoreConnect([{ collection: "categories" }]),
  connect((state, props) => ({
    categories: state.firestore.ordered.categories
  }))
)(Categories);

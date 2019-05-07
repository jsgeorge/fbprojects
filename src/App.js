import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/header";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Listing from "./components/posts/listing";
import Settings from "./components/pages/settings";
import AddPost from "./components/posts/add";
import Detail from "./components/posts/detail";
import EditPost from "./components/posts/edit";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header branding="reactBLOG" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Listing} />
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/register" component={Register} />
                <Route exact path="/posts" component={Listing} />
                <Route exact path="/posts/add" component={AddPost} />
                <Route exact path="/posts/:id" component={Detail} />
                <Route exact path="/posts/:id/edit" component={EditPost} />
                <Route exact path="/settings" component={Settings} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "./css/main.css";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

import history from "./components/history";
import { instanceOf } from "prop-types";
import RegisterPage from "./components/register";
import ForgotPage from "./components/forgot";
import { Cookies, withCookies } from "react-cookie";

import io from "socket.io-client";

let socket = io("localhost:2000");
class Root extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    if (cookies.get("email") != null && cookies.get("isLoggedIn")) {
      socket.emit("det", {
        email: cookies.get("email"),
        pass: cookies.get("pass")
      });
      console.log("emitted details");
    }
    this.state = {
      isLoggedIn: cookies.get("isLoggedIn") || false,
      err: cookies.get("err") || null,
      details: cookies.get("details") || {},
      email: cookies.get("email") || null,
      documents: cookies.get("documents") || null,
      docs: cookies.get("docs") || null,
      level: cookies.get("level") || null
    };

    this.emit = this.emit.bind(this);
    this.logout = this.logout.bind(this);
    this.mainEmit = this.mainEmit.bind(this);
  }

  logout(props) {
    const { cookies } = this.props;
    cookies.remove("err");
    cookies.remove("isLoggedIn");
    cookies.remove("details");
    cookies.remove("documents");
    cookies.remove("docs");
    cookies.remove("email");
    cookies.remove("pass");
    cookies.remove("level");
    this.setState = {
      isLoggedIn: false,
      details: {},
      docs: {},
      email: null
    };
  }
  mainEmit(name, data) {
    const { cookies } = this.props;
    socket.emit(name, data);
    this.setState({ email: data.email });
    cookies.set("email", data.email);
    cookies.set("pass", data.pass);
  }
  emit(name, data) {
    socket.emit(name, data);
  }
  componentDidMount(props) {
    const { cookies } = this.props;

    socket.on("validateLogin", content => {
      // console.log(content)
      cookies.set("err", content.condition);
      cookies.set("isLoggedIn", content.validate);
      cookies.set("details", content.details);
      cookies.set("level", content.level);
      this.setState({
        level: content.level,
        isLoggedIn: content.validate,
        err: content.condition,
        details: content.details
      });
    });
    socket.on("details", content => {
      cookies.set("details", content);
      this.setState({ details: content });
    });
    socket.on("documents", content => {
      cookies.set("documents", content);
      this.setState({ documents: content });
    });
    socket.on("docs", content => {
      let a = [];
      content[0].map(d => {
        let obj = d;
        if (d.from == content[1]) {
          obj.incoming = false;
        } else {
          obj.incoming = true;
        }
        a.unshift(obj);
      });
      cookies.set("docs", a);
      this.setState({ docs: a });
    });
  }
  render() {
    return (
      <Router history={history}>
        {this.state.isLoggedIn ? (
          <Switch>
            <Route
              path="/"
              render={() => (
                <Dashboard
                  md={this.state.details.details}
                  level={this.state.level}
                  emit={this.emit}
                  faculties={this.state.details.faculties}
                  documents={this.state.docs}
                  history={this.props.history}
                  logout={this.logout}
                  details={this.state.details}
                />
              )}
            />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/register"
              render={() => <RegisterPage emit={this.emit} />}
            />
            <Route
              path="/forgot"
              render={() => <ForgotPage emit={this.emit} />}
            />
            <Route path="/" render={() => <Login emit={this.mainEmit} />} />
          </Switch>
        )}
      </Router>
    );
  }
}
Root = withCookies(Root);
export default Root;

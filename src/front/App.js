import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import history from "./components/history";
import { instanceOf } from "prop-types";
import RegisterPage from "./components/register";
import NewTest from "./components/newtest";
import ForgotPage from "./components/forgot";
import { Cookies, withCookies } from "react-cookie";
import _ from "lodash";
import io from "socket.io-client";
import CoordinatorDashboard from "./components/CoordinatorDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import QuestionPage from "./components/QuestionPage";
import { socket as socUrl } from "./enpoint";
let socket = io(socUrl);
import {
  Sidebar,
  Segment,
  Menu,
  Icon,
  Header,
  Dropdown
} from "semantic-ui-react";
import RequestCourse from "./components/RequestCourse";
class Root extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    this.state = {
      isLoggedIn: cookies.get("isLoggedIn") || false,
      err: cookies.get("err") || null,
      details: cookies.get("details") || {},
      email: cookies.get("email") || null,
      documents: cookies.get("documents") || null,
      categories: cookies.get("categories") || [],
      tags: cookies.get("categories") || null,
      level: cookies.get("level") || null,
      fail: "",
      catError: "",
      topError: "",
      tagError: "",
      catSuccess: "none",
      topSuccess: "none",
      tagSuccess: "none",
      topics: [],
      qstate: cookies.get("qstate") || [],
      mode: false,
      selcatname: cookies.get("selcat") || "",
      visible: false,
      width: 0,
      height: 0,
      notified: true
    };
    this.emit = this.emit.bind(this);
    this.logout = this.logout.bind(this);
    this.mainEmit = this.mainEmit.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.stateSet = this.stateSet.bind(this);
    console.log(this.state.selcatname);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ visible: !this.state.visible });
  }
  logout(props) {
    const { cookies } = this.props;
    cookies.remove("err");
    cookies.remove("isLoggedIn");
    cookies.remove("details");
    cookies.remove("documents");
    cookies.remove("categories");
    cookies.remove("email");
    cookies.remove("pass");
    cookies.remove("level");
    cookies.remove("tags");
    cookies.remove("qstate");
    this.setState = {
      isLoggedIn: false,
      details: {},
      categories: [],
      tags: [],
      email: null,
      topics: [],
      qstate: []
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentDidMount(props) {
    const { cookies } = this.props;
    const { categories } = this.state;
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    socket.on("connect", () => {
      if (cookies.get("email") != null && cookies.get("isLoggedIn")) {
        socket.emit("det", {
          email: cookies.get("email"),
          pass: cookies.get("pass")
        });
        console.log("emitted details");
      }
    });
    let topics = [];
    _.map(categories, c => {
      c.topics.map(t => {
        topics.push({ tid: t.id, name: t.name, cid: c._id });
      });
    });
    topics = _.sortBy(topics, "tid", "asc");
    console.log(topics, categories);
    this.setState({ topics: topics });
    socket.on("mode", mode => {
      this.setState({ mode: mode });
    });
    socket.on("validateLogin", content => {
      // console.log(content)
      cookies.set("err", content.condition);
      cookies.set("isLoggedIn", content.validate);
      cookies.set("details", content.details);
      cookies.set("level", content.level);
      if (content.details.notifications.filter(k => k.unread).length > 0) {
        this.setState({ notified: false });
      }
      this.setState({
        level: content.level,
        isLoggedIn: content.validate,
        err: content.condition,
        details: content.details,
        fail: ""
      });
    });
    socket.on("changeDetails", ({ details }) => {
      console.log("details updated");
      cookies.set("details", details);
      if (details.notifications.filter(k => k.unread).length > 0) {
        this.setState({ notified: false });
      }
      this.setState({ details: details });
    });
    socket.on("fail", reason => {
      this.setState({ fail: reason });
    });
    socket.on("details", content => {
      cookies.set("details", content);
      if (content.notifications.filter(k => k.unread).length > 0) {
        this.setState({ notified: false });
      }
      this.setState({ details: content });
    });
    socket.on("documents", content => {
      cookies.set("documents", content);
      this.setState({ documents: content });
    });
    socket.on("q", q => {
      cookies.set("qstate", q);
      this.setState({ qstate: q });
    });
    socket.on("catError", error => {
      console.log("error", error);
      this.setState({ catError: error });
      error != "" ? this.setState({ catSuccess: "none" }) : null;
    });
    socket.on("topError", error => {
      console.log(error);
      this.setState({ topError: error });
      error != "" ? this.setState({ topSuccess: "none" }) : null;
    });
    socket.on("tagError", error => {
      console.log(error);
      this.setState({ tagError: error });
      error != "" ? this.setState({ tagError: "none" }) : null;
    });
    socket.on("success", type => {
      type == "category" ? this.setState({ catSuccess: "success" }) : null;
      type == "topic" ? this.setState({ topSuccess: "success" }) : null;
      type == "tag" ? this.setState({ tagSuccess: "success" }) : null;
    });
    socket.on("categories", cats => {
      console.log(cats);
      topics = [];
      _.map(cats, c => {
        c.topics.map(t => {
          topics.push({ tid: parseInt(t.id), name: t.name, cid: c._id });
        });
      });
      topics = _.sortBy(topics, "tid", "asc");
      this.setState({ categories: cats, topics: topics });
    });
    socket.on("tags", tags => {
      let company = [],
        exam = [],
        subject = [],
        topic = [];
      _.map(tags, t => {
        switch (t.group) {
          case "company":
            company.push(t);
            break;
          case "exam":
            exam.push(t);
            break;
          case "subject":
            subject.push(t);
            break;
          case "topic":
            topic.push(t);
            break;
        }
      });
      this.setState({
        grouped: {
          company: company,
          exam: exam,
          subject: subject,
          topic: topic
        },
        tags: tags
      });
    });
    window.onbeforeunload = () => {
      cookies.set("selcat", this.state.selcatname);
      socket.emit("disconnect");
      console.log(cookies.get("selcat"));
    };
  }
  notificationSeen() {
    setTimeout(() => {
      let { details } = this.state;
      let flag = false;
      details.notifications = details.notifications.map(k => {
        if (k.unread) {
          k.unread = false;
          flag = true;
        }
        return k;
      });
      if (flag) {
        socket.emit("updateNoti", details);
      }
      this.setState({ notified: true, details: details });
    }, 1000);
  }
  setLoading(type) {
    let newState = this.state;
    console.log(newState);
    newState[type] = "load";
    this.setState(newState);
  }
  stateSet(key, value) {
    let newstate = this.state;
    newstate[key] = value;
    this.setState(newstate);
  }
  render() {
    let { width } = this.state;
    return (
      <Router history={history}>
        {this.state.isLoggedIn ? (
          <div>
            <Segment
              style={{
                borderRadius: "0",
                marginBottom: "0",
                padding: "0.5em 1em"
              }}
            >
              <Menu secondary fluid borderless>
                {width < 768 ? (
                  <Menu.Item onClick={e => this.handleClick()}>
                    <Icon
                      name="bars"
                      size="large"
                      style={{
                        color: "#1456ff"
                      }}
                    />
                  </Menu.Item>
                ) : null}
                <Menu.Item
                  onClick={e => {
                    history.push("/");
                  }}
                  className="brand-menu"
                >
                  <Header as="h2" className="brand">
                    eSkill
                  </Header>
                </Menu.Item>

                <Menu.Menu position="right">
                  {width >= 768 ? (
                    <Menu.Item
                      onClick={e => {
                        e.preventDefault();
                        history.push("/");
                      }}
                    >
                      <Icon name="home" size="large" />
                    </Menu.Item>
                  ) : null}
                  {this.state.details.level == 0 ? (
                    <Dropdown
                      icon={
                        <Icon.Group size="large">
                          <Icon name="bell" />
                          {this.state.notified ? null : (
                            <Icon
                              className="corner top right"
                              name="circle"
                              size="mini"
                              color="red"
                            />
                          )}
                        </Icon.Group>
                      }
                      onClick={e => this.notificationSeen()}
                      floating
                      className="item"
                    >
                      {this.state.details.notifications.length > 0 ? (
                        <Dropdown.Menu className="notifications">
                          <Dropdown.Header
                            style={{ fontWeight: "bold" }}
                            content="Notifcations"
                          />
                          {[...this.state.details.notifications]
                            .reverse()
                            .map(n => {
                              console.log(n);
                              return (
                                <Dropdown.Item>
                                  <Segment inverted={n.unread}>
                                    <span>{n.name} has been added!</span>
                                  </Segment>
                                </Dropdown.Item>
                              );
                            })}
                        </Dropdown.Menu>
                      ) : null}
                    </Dropdown>
                  ) : null}
                  {width >= 768 ? (
                    <Menu.Item
                      onClick={e => {
                        e.preventDefault();
                        this.logout();
                        window.location.href = "/";
                      }}
                    >
                      <Icon name="sign out" size="large" />
                    </Menu.Item>
                  ) : null}
                </Menu.Menu>
              </Menu>
            </Segment>

            <Sidebar.Pushable>
              <Sidebar
                as={Menu}
                animation="push"
                width="wide"
                visible={this.state.visible}
                icon="labeled"
                vertical
                inverted
              >
                <Menu.Item
                  name="home"
                  onClick={e => {
                    history.push("/");
                  }}
                  onClick={e => {
                    history.push("/");
                  }}
                >
                  <Icon name="home" />
                  Home
                </Menu.Item>
                <Menu.Item name="user">
                  <Icon name="user" />
                  Edit Profile
                </Menu.Item>
                <Menu.Item
                  name="logout"
                  onClick={e => {
                    e.preventDefault();
                    this.logout();
                    window.location.href = "/";
                  }}
                >
                  <Icon name="sign out" />
                  Logout
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "10px 0"
                }}
              >
                <Switch>
                  <Segment basic style={{ flexGrow: "1" }}>
                    {this.state.level == 0 ? (
                      <Route
                        path="/question/:category/:id"
                        exact
                        render={props => (
                          <NewTest
                            stateSet={this.stateSet}
                            q={this.state.qstate}
                            logout={this.logout}
                            topics={this.state.topics}
                            grouped={this.state.grouped}
                            categories={this.state.categories}
                            emit={this.emit}
                            id={this.state.details._id}
                            sname={this.state.details.details.name}
                            i={props.match.params.id}
                            cat={this.state.selcatname}
                            cid={props.match.params.category}
                          />
                        )}
                      />
                    ) : null}
                    {this.state.level == 0 || this.state.level == 1 ? (
                      <Route
                        path="/request"
                        render={props => (
                          <RequestCourse
                            stateSet={this.stateSet}
                            q={this.state.qstate}
                            logout={this.logout}
                            categories={this.state.categories}
                            emit={this.emit}
                            details={this.state.details}
                          />
                        )}
                      />
                    ) : null}
                    {this.state.level == 0 ? (
                      <Route
                        exact
                        path="/question/:category"
                        render={props => (
                          <QuestionPage
                            md={this.state.details.details}
                            level={this.state.level}
                            emit={this.emit}
                            faculties={this.state.details.faculties}
                            categories={this.state.categories}
                            history={this.props.history}
                            logout={this.logout}
                            details={this.state.details}
                            catError={this.state.catError}
                            topError={this.state.topError}
                            topics={this.state.topics}
                            catSuccess={this.state.catSuccess}
                            setLoading={this.setLoading}
                            topSuccess={this.state.topSuccess}
                            tags={this.state.tags}
                            grouped={this.state.grouped}
                            tagError={this.state.tagError}
                            tagSuccess={this.state.tagSuccess}
                            qs={this.state.qstate}
                            stateSet={this.stateSet}
                            cat={this.state.selcatname}
                            cid={props.match.params.category}
                            width={width}
                          />
                        )}
                      />
                    ) : null}
                    <Route
                      path="/"
                      exact
                      render={() =>
                        this.state.level == 2 ? (
                          <AdminDashboard
                            mode={this.state.mode}
                            md={this.state.details.details}
                            stateSet={this.stateSet}
                            level={this.state.level}
                            emit={this.emit}
                            faculties={this.state.details.faculties}
                            categories={this.state.categories}
                            history={this.props.history}
                            logout={this.logout}
                            details={this.state.details}
                            catError={this.state.catError}
                            topError={this.state.topError}
                            topics={this.state.topics}
                            catSuccess={this.state.catSuccess}
                            setLoading={this.setLoading}
                            topSuccess={this.state.topSuccess}
                            tags={this.state.tags}
                            grouped={this.state.grouped}
                            tagError={this.state.tagError}
                            tagSuccess={this.state.tagSuccess}
                          />
                        ) : this.state.level == 4 ? (
                          <FacultyDashboard
                            md={this.state.details.details}
                            emit={this.emit}
                            history={this.props.history}
                            logout={this.logout}
                            setLoading={this.setLoading}
                            stateSet={this.stateSet}
                            emit={this.emit}
                            {...this.state}
                          />
                        ) : this.state.level == 1 ? (
                          <CoordinatorDashboard
                            md={this.state.details.details}
                            level={this.state.level}
                            emit={this.emit}
                            faculties={this.state.details.faculties}
                            categories={this.state.categories}
                            history={this.props.history}
                            logout={this.logout}
                            details={this.state.details}
                            catError={this.state.catError}
                            topError={this.state.topError}
                            topics={this.state.topics}
                            catSuccess={this.state.catSuccess}
                            setLoading={this.setLoading}
                            topSuccess={this.state.topSuccess}
                            tags={this.state.tags}
                            grouped={this.state.grouped}
                            tagError={this.state.tagError}
                            tagSuccess={this.state.tagSuccess}
                          />
                        ) : (
                          <StudentDashboard
                            md={this.state.details.details}
                            level={this.state.level}
                            emit={this.emit}
                            faculties={this.state.details.faculties}
                            categories={this.state.categories}
                            history={this.props.history}
                            logout={this.logout}
                            details={this.state.details}
                            catError={this.state.catError}
                            topError={this.state.topError}
                            topics={this.state.topics}
                            catSuccess={this.state.catSuccess}
                            setLoading={this.setLoading}
                            topSuccess={this.state.topSuccess}
                            tags={this.state.tags}
                            grouped={this.state.grouped}
                            tagError={this.state.tagError}
                            tagSuccess={this.state.tagSuccess}
                            qs={this.state.qstate}
                            stateSet={this.stateSet}
                          />
                        )
                      }
                    />
                  </Segment>
                </Switch>
                <Header
                  size="tiny"
                  style={{
                    position: "relative",
                    textAlign: "center",
                    width: "100%",
                    alignSelf: "flex-end"
                  }}
                >
                  eSkill - SRM Center for Applied Research in Education
                </Header>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        ) : (
          <Switch>
            <Route
              path="/register"
              render={() => (
                <RegisterPage mode={this.state.mode} emit={this.emit} />
              )}
            />
            <Route
              path="/forgot"
              render={() => <ForgotPage emit={this.emit} />}
            />
            <Route
              path="/"
              render={() => (
                <Login fail={this.state.fail} emit={this.mainEmit} />
              )}
            />
          </Switch>
        )}
      </Router>
    );
  }
}
Root = withCookies(Root);
export default Root;

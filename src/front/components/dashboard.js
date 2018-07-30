import React from "react";
import { Link } from "react-router-dom";
import History from "./history";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Container,
  Table,
  Icon,
  Header,
  Input,
  Grid,
  Dropdown,
  Pagination,
  Modal
} from "semantic-ui-react";
import { timeFormat } from "d3-time-format";
let formatTime = timeFormat("%B %d, %Y");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.documents
    };
    this.logout = this.logout.bind(this);
    this.emit = this.emit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({visible: !this.state.visible})
  }

  logout() {
    this.props.logout();
  }
  componentDidMount() {}
  emit(name, obj) {
    this.props.emit(name, obj);
  }

  render() {
    let { md: det } = this.props;
    return (
      <div>
        <Segment
          
          style={{
            borderRadius: "0",
            marginBottom: "0"
          }}
        >
          <Menu secondary fluid borderless>
            <Menu.Item onClick={e => this.handleClick()}>
              <Icon name="bars" size="large" style={{
            color: '#1456ff'}} />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                name="logout"
                onClick={e => {
                  e.preventDefault();
                  this.logout();
                  History.push("/");
                  window.location.reload();
                }}
              />
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
            <Menu.Item name="home">
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
                History.push("/");
                window.location.reload();
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
            <Segment
              basic={true}
              style={{
                minHeight: "100%",
                alignSelf: "flex-start",
                width: "100%"
              }}
            >
              <Grid centered padded relaxed doubling divided="vertically">
                <Grid.Column className="centered" width={7}>
                  <Input
                    fluid
                    size="large"
                    icon="search"
                    placeholder="Search..."
                    onChange={e => {
                      this.updateSearch(e);
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={13}>
                  <Segment basic />
                </Grid.Column>
              </Grid>
            </Segment>
            <Header
              size="tiny"
              style={{
                position: "relative",
                textAlign: "center",
                width: "100%",
                alignSelf: "flex-end"
              }}
            >
              eApproval - SRM Institute of Science and Technology
            </Header>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default Dashboard;

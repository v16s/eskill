import React, { Component } from "react";
import { Link } from "react-router-dom";
import History from "./history";
import Queries from "./queries";
import Attempted from "./attempted";
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
  Modal,
  GridRow,
  Card,
  GridColumn
} from "semantic-ui-react";
import Categories from "./categories";
import AddQuestion from "./AddQuestion";
import _ from "lodash";

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.categories
    };
    this.logout = this.logout.bind(this);
    this.emit = this.emit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ visible: !this.state.visible });
  }

  logout() {
    this.props.logout();
  }
  componentDidMount() {}
  emit(name, obj) {
    this.props.emit(name, obj);
  }

  render() {
    let { md: det, topics, categories } = this.props;
    let tl = _.toArray(topics).length,
      cl = _.toArray(categories).length;
    return (
      <div>
        <Segment
          centered
          style={{
            minHeight: "100%",
            alignSelf: "flex-start",
            width: "100%"
          }}
        >
          <Grid padded stackable relaxed doubling divided="vertically">
            <Grid.Row>
              <Queries categories={cl} topics={tl} />
            </Grid.Row>
          </Grid>

          <Grid padded stackable relaxed doubling divided="vertically">
            <Grid.Row>
              <Attempted categories={cl} topics={tl} />
            </Grid.Row>
          </Grid>

          <Grid padded stackable relaxed doubling divided="vertically">
            <Grid.Row />
          </Grid>

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column stretched>
                <Button>
                  <Link to="/newtest">New Test</Link>
                </Button>
              </Grid.Column>
              <Grid.Column stretched>
                <Button>Skill Analysis Report</Button>
              </Grid.Column>
            </Grid.Row>
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
          eSkill - SRM Center for Applied Research in Education
        </Header>
      </div>
    );
  }
}

export default StudentDashboard;

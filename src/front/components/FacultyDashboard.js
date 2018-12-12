import React, { Component } from "react";
import { Link } from "react-router-dom";
import History from "./history";
import Stats from "./stats";
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
  GridRow
} from "semantic-ui-react";
import Categories from "./categories";
import AddQuestion from "./AddQuestion";
import _ from "lodash";
import StudentTable from "./StudentTable";
class FacultyDashboard extends React.Component {
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
    let tl = _.toArray(topics).length;

    let cl = _.toArray(categories).length;
    console.log(cl, tl, typeof topics, typeof categories);
    return (
      <div>
        <Segment
          basic
          style={{
            minHeight: "100%",
            alignSelf: "flex-start",
            width: "100%"
          }}
        >
          <Grid padded stackable relaxed centered divided="vertically">
            <Grid.Row>
              <Grid.Column width={13}>
                <Segment>
                  <StudentTable
                    details={this.props.details}
                    stateSet={this.props.stateSet}
                    emit={this.props.emit}
                  />
                </Segment>
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

export default FacultyDashboard;

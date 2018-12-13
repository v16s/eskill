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

class CoordinatorDashboard extends React.Component {
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
        <Grid padded stackable relaxed doubling divided="vertically">
          <Grid.Row>
            <Stats categories={cl} topics={tl} />
          </Grid.Row>
          <Grid.Row>
            <AddQuestion
              categories={this.props.categories}
              tags={this.props.tags}
              grouped={this.props.grouped}
              emit={this.emit}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default CoordinatorDashboard;

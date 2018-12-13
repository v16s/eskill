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
import Categories from "./categories";
import Department from "./departments";
import Stats from "./stats";
import Tag from "./tag";
import Configuration from "./configuration";
import _ from "lodash";
let formatTime = timeFormat("%B %d, %Y");

class Dashboard extends React.Component {
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
    console.log(cl, tl, typeof topics, typeof categories);
    return (
      <div>
        <Grid padded stackable relaxed doubling divided="vertically">
          <Grid.Row>
            <Stats categories={cl} topics={tl} />
          </Grid.Row>
          <Grid.Row>
            <Categories
              categories={this.props.categories}
              emit={this.emit}
              catError={this.props.catError}
              topError={this.props.topError}
              topics={this.props.topics}
              loading={this.props.setLoading}
              catSuccess={this.props.catSuccess}
              topSuccess={this.props.topSuccess}
            />
            <Department />
            <Grid.Column width={8} />
          </Grid.Row>
          <Grid.Row>
            <Tag
              tagError={this.props.tagError}
              tagSuccess={this.props.tagSuccess}
              emit={this.emit}
              tags={this.props.tags}
            />
            <Configuration emit={this.props.emit} mode={this.props.mode} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;

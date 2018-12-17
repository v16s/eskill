import React, { Component } from "react";
import { Link } from "react-router-dom";
import History from "./history";
import Queries from "./queries";
import Attempted from "./attempted";
import endpoint from "../enpoint";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Form,
  Icon,
  Header,
  Grid,
  Progress,
  Card
} from "semantic-ui-react";
import history from "./history";
import "react-circular-progressbar/dist/styles.css";
import CircularProgressbar from "react-circular-progressbar";
import Select from "react-select";
import _ from "lodash";

class RequestCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.categories,
      faculty: [],
      selfac: null,
      selcat: null,
      seltop: null
    };
    this.logout = this.logout.bind(this);
    this.emit = this.emit.bind(this);
    this.fetchFaculty = this.fetchFaculty.bind(this);
    this.handleFacChange = this.handleFacChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchFaculty();
  }
  handleClick() {
    this.setState({ visible: !this.state.visible });
  }
  topchange(e) {
    this.setState({ seltop: e });
  }
  fetchFaculty() {
    let { details } = this.props.details;
    fetch(endpoint + "/api/faculty", {
      body: JSON.stringify({ branch: details.department }),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        if (res != null) {
          let faculty = res.map(f => {
            return { label: `${f._id} - ${f.details.name}`, value: `${f._id}` };
          });
          this.setState({ faculty: faculty });
        }
      });
  }
  handleFacChange(e) {
    this.setState({ selfac: e });
  }
  handleCatChange(e) {
    this.setState({ selcat: e });
  }
  logout() {
    this.props.logout();
  }
  componentDidMount() {
    this.fetchFaculty();
  }
  emit(name, obj) {
    this.props.emit(name, obj);
  }
  handleSubmit() {
    let { selcat, selfac, seltop } = this.state;
    let { details } = this.props;
    if (![selcat, selfac].includes(null)) {
      this.props.emit("requestCourse", {
        cat: selcat.label,
        faculty: selfac.value,
        student: details._id,
        cid: selcat.value,
        topic: seltop.label
      });
      history.push("/eskill/");
    }
  }
  render() {
    let { faculty, selcat } = this.state;
    let { categories, topics } = this.props;
    if (selcat != null) {
      topics = topics.filter(t => t.cid == selcat.value);
    } else {
      topics = [];
    }
    return (
      <div>
        <Segment basic style={{ flexGrow: "1" }}>
          <Segment>
            <Segment basic>
              <Header as={"h3"}>Request Course</Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>
                  <Form.Field label="Choose Branch" />
                  <Form.Group>
                    <Select
                      value={this.state.selcat}
                      onChange={this.handleCatChange}
                      options={
                        categories == null
                          ? []
                          : categories.map(c => ({
                              label: c.name,
                              value: c._id
                            }))
                      }
                      styles={{
                        container: style => ({ ...style, width: "100%" })
                      }}
                    />
                  </Form.Group>
                  <Form.Field label="Choose Course" />
                  <Form.Group>
                    <Select
                      value={this.state.seltop}
                      onChange={e => this.topchange(e)}
                      options={topics.map(c => ({
                        label: c.name,
                        value: c.tid
                      }))}
                      styles={{
                        container: style => ({ ...style, width: "100%" })
                      }}
                    />
                  </Form.Group>
                </Form.Field>
                <Form.Field label="Choose Faculty" />
                <Form.Group>
                  <Select
                    options={faculty}
                    value={this.state.selfac}
                    onChange={this.handleFacChange}
                    styles={{
                      container: style => ({ ...style, width: "100%" })
                    }}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Button
                    fluid
                    type="cancel"
                    onClick={e => {
                      e.preventDefault();
                      history.push("/eskill/");
                    }}
                  >
                    Cancel
                  </Form.Button>
                  <Form.Button
                    style={{ height: "36px" }}
                    fluid
                    primary
                    type="submit"
                  >
                    Request
                  </Form.Button>
                </Form.Group>
              </Form>
            </Segment>
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default RequestCourse;

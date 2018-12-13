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
  Tab,
  Modal,
  GridRow
} from "semantic-ui-react";
import Categories from "./categories";
import AddQuestion from "./AddQuestion";
import _ from "lodash";

import CompletionTable from "./CompletionTable";
import ReportProblem from "./ReportProblem";
import StudentTable from "./StudentTable";
class FacultyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.categories,
      studentDetails: []
    };
    this.logout = this.logout.bind(this);
    this.emit = this.emit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ visible: !this.state.visible });
  }
  componentDidMount() {
    let { studentDetails } = this.state;
    let { details } = this.props;
    let students = details.details.students;
    console.log(students);
    students.map(s => {
      if (s.a === true) {
        fetch("http://localhost:2000/api/student", {
          method: "POST",
          body: JSON.stringify({ sid: s._id, cat: s.cat }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(res => {
            let i = _.findIndex(studentDetails, { _id: s._id, cat: s.cat });
            if (i > -1) {
              studentDetails[i] = { ...studentDetails[i], ...res };
            } else {
              studentDetails.push({ ...s, ...res });
            }
            this.setState({ studentDetails: studentDetails });
          });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    let { studentDetails } = this.state;
    let { details } = nextProps;
    let students = details.details.students;
    students.map(s => {
      if (s.a === true) {
        fetch("http://localhost:2000/api/student", {
          method: "POST",
          body: JSON.stringify({ sid: s._id, cat: s.cat }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(res => {
            let i = _.findIndex(studentDetails, { _id: s._id, cat: s.cat });
            if (i > -1) {
              studentDetails[i] = { ...studentDetails[i], ...res };
            } else {
              studentDetails.push({ ...s, ...res });
            }
            this.setState({ studentDetails: studentDetails });
          });
      }
    });
  }
  logout() {
    this.props.logout();
  }
  emit(name, obj) {
    this.props.emit(name, obj);
  }
  render() {
    let { md: det, topics, categories, details } = this.props;
    let tl = _.toArray(topics).length;
    let { studentDetails } = this.state;
    let cl = _.toArray(categories).length;
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
                <Tab
                  menu={{ pointing: true }}
                  panes={[
                    {
                      menuItem: "Approval List",
                      render: () => (
                        <Tab.Pane attached={false}>
                          <StudentTable {...this.props} />
                        </Tab.Pane>
                      )
                    },
                    {
                      menuItem: "Completion Level",
                      render: () => (
                        <Tab.Pane attached={false}>
                          <CompletionTable
                            {...this.props}
                            studentDetails={studentDetails}
                          />
                        </Tab.Pane>
                      )
                    },
                    {
                      menuItem: "Problem Reports",
                      render: () => (
                        <Tab.Pane attached={false}>
                          <ReportProblem
                            {...this.props}
                            studentDetails={studentDetails}
                          />
                        </Tab.Pane>
                      )
                    }
                  ]}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default FacultyDashboard;

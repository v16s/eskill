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
  Icon,
  Header,
  Grid,
  Progress,
  Card
} from "semantic-ui-react";
import history from "./history";
import "react-circular-progressbar/dist/styles.css";
import CircularProgressbar from "react-circular-progressbar";

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
    let { qs: qstate, categories } = this.props;

    let questions = [];
    if (qstate != undefined) {
      questions = Object.keys(qstate);
    }
    return (
      <div>
        <Segment>
          <Header as="h3">Assigned Courses</Header>
        </Segment>
        <Segment
          basic
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Grid stackable container columns={4} style={{ flexGrow: "1" }}>
            {questions.map((q, qi) => {
              return (
                <Grid.Row key={"row-" + qi}>
                  {Object.keys(qstate[q]).map((qu, i) => {
                    let qd = qstate[q][qu];
                    let attempted = 0,
                      correct = 0;

                    let complete = 0;
                    if (qd.a === true) {
                      qd.q.map(x => {
                        if (x.a > 0) {
                          attempted++;
                          if (x.a < 3) {
                            complete++;
                          }
                          if (x.a == 2) {
                            correct++;
                          }
                        }
                      });
                    }
                    return (
                      <Grid.Column width={4} key={"col-" + qi + "-" + i}>
                        <Card
                          className="courseCard"
                          onClick={e => {
                            if (qd.a === true) {
                              history.push(
                                `/eskill/question/${qd.cat.replace(
                                  " ",
                                  "+"
                                )}/${qd.topic.replace(" ", "+")}`
                              );
                              this.props.stateSet("selcatname", qu);
                            }
                          }}
                        >
                          <Card.Content>
                            <Card.Header>{qu}</Card.Header>
                            <Card.Description>
                              {qd.a === false ? (
                                <Header as="h3">Awaiting Approval</Header>
                              ) : qd.a == "rejected" ? (
                                <Header as="h3">Rejected</Header>
                              ) : (
                                <CircularProgressbar
                                  percentage={complete}
                                  text={`${complete}% Complete`}
                                  styles={{
                                    path: { stroke: `#1456ff` },
                                    text: {
                                      fill: "#1456ff",
                                      fontSize: "8px",
                                      fontFamily: "Lato, sans-serif"
                                    },
                                    root: {
                                      minWidth: "150px",
                                      minHeight: "150px"
                                    }
                                  }}
                                />
                              )}
                            </Card.Description>
                          </Card.Content>
                          {qd.a === true ? (
                            <div>
                              <Card.Content extra>
                                <Icon name="tasks" />
                                {attempted} Questions Attempted
                              </Card.Content>
                              <Card.Content extra>
                                <Icon name="checkmark" />
                                {correct} Questions Correct
                              </Card.Content>
                            </div>
                          ) : null}
                        </Card>
                      </Grid.Column>
                    );
                  })}
                </Grid.Row>
              );
            })}
            <Grid.Row>
              <Grid.Column>
                <Card
                  style={{ height: "100%" }}
                  className="courseCard request-course"
                  onClick={e => {
                    history.push("/eskill/request");
                  }}
                >
                  <Card.Content
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: "center"
                    }}
                  >
                    <Icon
                      name="add"
                      size="huge"
                      style={{ alignSelf: "center", color: "#1456ff" }}
                    />
                    <Header as="h4">Request Course</Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default StudentDashboard;

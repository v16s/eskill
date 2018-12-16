import { Table, Grid, Button, Modal, Segment, Input } from "semantic-ui-react";
import { Progress } from "react-sweet-progress";
import React from "react";
import ChangeQuestion from "./ChangeQuestion";
export default class CoordinatorProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "", visible: false, cat: "", n: "", topic: "" };
    this.resolve = this.resolve.bind(this);
  }
  componentDidMount() {}
  updateSearch(e) {
    this.setState({ searchValue: e.value });
  }
  setProblem(p) {
    this.setState({ problem: p }, () => {
      this.resolve(false);
    });
  }
  handleClick(e, n, cat, p, topic) {
    this.setState({
      n: n || "",
      cat: cat || "",
      topic: topic || "",
      visible: !this.state.visible,
      problem: p
    });
  }
  resolve(action) {
    let { emit } = this.props;
    emit("resolve", { problem: this.state.problem, action: action });
    this.setState({ visible: false });
  }
  render() {
    let { details } = this.props.details;
    let { width } = this.props;
    let problems = [];
    if (details.problems != undefined) {
      problems = details.problems;
    }
    return (
      <Table>
        {width > 768 ? (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Input
                  fluid
                  placeholder="Search"
                  onChange={(e, syn) => this.updateSearch(syn)}
                />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Student ID</Table.HeaderCell>
              <Table.HeaderCell>Student Name</Table.HeaderCell>
              <Table.HeaderCell>Question Branch</Table.HeaderCell>
              <Table.HeaderCell>Question Course</Table.HeaderCell>
              <Table.HeaderCell>Question Number</Table.HeaderCell>
              <Table.HeaderCell>Problem Description</Table.HeaderCell>
              <Table.HeaderCell>Solve</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        ) : null}
        <Table.Body>
          {[...problems].reverse().map(s => {
            if (
              Object.values(s).find(a => {
                if (typeof a === "string") {
                  let reg = new RegExp(this.state.searchValue, "gi");
                  return a.match(reg);
                }
              }) != undefined
            ) {
              return (
                <Table.Row key={s.name + "-problem-" + s.n + Math.random()}>
                  <Table.Cell>{s.sid}</Table.Cell>
                  <Table.Cell>{s.name}</Table.Cell>
                  <Table.Cell>{s.cat.name}</Table.Cell>
                  <Table.Cell>{s.topic.name}</Table.Cell>
                  <Table.Cell>{s.n}</Table.Cell>
                  <Table.Cell>{s.desc}</Table.Cell>
                  <Table.Cell>
                    {this.state.visible ? (
                      <Modal
                        closeOnDimmerClick
                        open={this.state.visible}
                        size="large"
                        onClose={() => this.handleClick()}
                      >
                        <Modal.Content>
                          <ChangeQuestion
                            {...this.props}
                            n={this.state.n}
                            modal
                            category={this.state.cat}
                            topic={this.state.topic}
                            afterEmit={this.resolve}
                          />
                        </Modal.Content>
                      </Modal>
                    ) : null}
                    {s.resolution === false ? (
                      <Grid padded={false} columns={2} stackable>
                        <Grid.Column style={{ padding: "5px" }}>
                          <Button
                            fluid
                            negative
                            onClick={e => this.setProblem(s)}
                          >
                            Reject
                          </Button>
                        </Grid.Column>
                        <Grid.Column style={{ padding: "5px" }}>
                          <Button
                            fluid
                            positive
                            onClick={e =>
                              this.handleClick(
                                e,
                                s.n,
                                s.cat.name.replace(" ", "+"),
                                s,
                                s.topic.name.replace(" ", "+")
                              )
                            }
                          >
                            Solve
                          </Button>
                        </Grid.Column>
                      </Grid>
                    ) : s.resolution === true ? (
                      "Resolved"
                    ) : (
                      "Rejected"
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>
    );
  }
}
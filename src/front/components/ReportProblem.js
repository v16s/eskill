import { Table, Grid, Button, Segment, Input } from "semantic-ui-react";
import { Progress } from "react-sweet-progress";
import React from "react";
export default class RequestProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "" };
  }
  componentDidMount() {}
  updateSearch(e) {
    this.setState({ searchValue: e.value });
  }
  render() {
    let { details } = this.props.details;
    let { width } = this.props;
    let problems = [];
    if (details.problems != undefined) {
      problems = details.problems;
    }
    return (
      <Table inverted={this.props.dark}>
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
              <Table.HeaderCell>Question Category</Table.HeaderCell>
              <Table.HeaderCell>Question Topic</Table.HeaderCell>
              <Table.HeaderCell>Question Number</Table.HeaderCell>
              <Table.HeaderCell>Problem Description</Table.HeaderCell>
              <Table.HeaderCell>Resolved</Table.HeaderCell>
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
                <Table.Row key={s.name + "-problem-" + s.n}>
                  <Table.Cell>{s.sid}</Table.Cell>
                  <Table.Cell>{s.name}</Table.Cell>
                  <Table.Cell>{s.cat.name}</Table.Cell>
                  <Table.Cell>{s.topic.name}</Table.Cell>
                  <Table.Cell>{s.n}</Table.Cell>
                  <Table.Cell>{s.desc}</Table.Cell>

                  <Table.Cell>
                    {s.resolution === false
                      ? "Pending Resolution"
                      : s.resolution === true
                      ? "Resolved"
                      : "Rejected"}
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

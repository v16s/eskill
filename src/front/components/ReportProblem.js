import { Table, Grid, Button, Segment } from "semantic-ui-react";
import { Progress } from "react-sweet-progress";
import React from "react";
export default class CompletionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

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
              <Table.HeaderCell>Student ID</Table.HeaderCell>
              <Table.HeaderCell>Student Name</Table.HeaderCell>
              <Table.HeaderCell>Question Category</Table.HeaderCell>
              <Table.HeaderCell>Question Number</Table.HeaderCell>
              <Table.HeaderCell>Problem Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        ) : null}
        <Table.Body>
          {[...problems].reverse().map(s => {
            return (
              <Table.Row key={s.name + "-problem-" + s.n}>
                <Table.Cell>{s.sid}</Table.Cell>
                <Table.Cell>{s.name}</Table.Cell>
                <Table.Cell>{s.cat.name}</Table.Cell>
                <Table.Cell>{s.n}</Table.Cell>
                <Table.Cell>{s.desc}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

import { Table, Grid, Button, Segment } from "semantic-ui-react";
import React from "react";
export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.accept = this.accept.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  accept(s, action) {
    let { details, stateSet, emit } = this.props;
    console.log("clicked");
    details.details.students = details.details.students.map(st => {
      if (st == s) {
        return { ...st, a: action ? action : "rejected" };
      }
      return st;
    });
    stateSet("details", details);
    console.log(details);
    emit("acceptCourse", [s._id, s.cat, action, details]);
  }
  render() {
    let { width } = this.state;
    let { details } = this.props.details;
    return (
      <Table>
        {width > 768 ? (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Student ID</Table.HeaderCell>
              <Table.HeaderCell>Student Name</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        ) : null}
        <Table.Body>
          {details.students.map(s => {
            return (
              <Table.Row key={s.name + s.cat}>
                <Table.Cell>{s._id}</Table.Cell>
                <Table.Cell>{s.name}</Table.Cell>
                <Table.Cell>{s.cat}</Table.Cell>
                <Table.Cell>
                  {s.a === false ? (
                    <Grid stackable columns={2}>
                      <Grid.Column>
                        <Button
                          fluid
                          negative
                          onClick={e => this.accept(s, false)}
                        >
                          Reject
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          fluid
                          positive
                          onClick={e => this.accept(s, true)}
                        >
                          Accept
                        </Button>
                      </Grid.Column>
                    </Grid>
                  ) : s.a === true ? (
                    <Segment inverted color="green">
                      Accepted
                    </Segment>
                  ) : (
                    <Segment inverted color="red">
                      Rejected
                    </Segment>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

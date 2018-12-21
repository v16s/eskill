import {
  Table,
  Grid,
  Button,
  Segment,
  Input,
  Pagination
} from "semantic-ui-react";
import React from "react";
import _ from "lodash";
export default class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchvalue: "", activePage: 1 };
    this.accept = this.accept.bind(this);
  }
  componentDidMount() {}
  updateSearch(e) {
    this.setState({ searchvalue: e.value });
  }
  accept(s, action) {
    let { details, stateSet, emit } = this.props;
    let loadingdetails = details.details.students.map((st, i) => {
      if (st.topic == s.topic && st.cat == s.cat && s._id == st._id) {
        return { ...st, a: action || "rejected", loading: true };
      }
      return st;
    });
    details.details.students = _.reject(loadingdetails, { a: "rejected" });

    stateSet("details", loadingdetails, () => {
      emit("acceptCourse", [s._id, s.cat, action, details, s.topic]);
    });
  }
  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });
  render() {
    let { width } = this.props;
    let { details } = this.props.details;
    return (
      <Table inverted={this.props.dark}>
        {width > 768 ? (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
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
              <Table.HeaderCell>Branch</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        ) : null}
        <Table.Body>
          {[...details.students].reverse().map((s, index) => {
            if (
              Object.values(s).find(a => {
                if (typeof a === "string") {
                  let reg = new RegExp(this.state.searchvalue, "gi");
                  return a.match(reg);
                }
              }) != undefined &&
              index < this.state.activePage * 10 &&
              index > this.state.activePage * 10 - 10
            ) {
              return (
                <Table.Row key={s.name + s.cat + s.topic}>
                  <Table.Cell>{s._id}</Table.Cell>
                  <Table.Cell>{s.name}</Table.Cell>
                  <Table.Cell>{s.cat}</Table.Cell>
                  <Table.Cell>{s.topic}</Table.Cell>
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
                    ) : s.a === true && !s.loading ? (
                      <Segment inverted color="green">
                        <Grid stackable columns={2}>
                          <Grid.Column
                            computer={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center"
                            }}
                          >
                            Accepted
                          </Grid.Column>
                          <Grid.Column computer={4}>
                            <Button
                              fluid
                              negative
                              onClick={e => this.accept(s, false)}
                              icon="close"
                            />
                          </Grid.Column>
                        </Grid>
                      </Segment>
                    ) : (
                      <Segment inverted color="blue">
                        Loading
                      </Segment>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
          <Table.Row>
            <Table.Cell colSpan={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <Pagination
                  activePage={this.state.activePage}
                  boundaryRange={1}
                  onPageChange={this.handlePaginationChange}
                  siblingRange={1}
                  totalPages={
                    details.students != undefined
                      ? parseInt(details.students.length / 10) + 1
                      : 0
                  }
                  ellipsisItem={true}
                  prevItem={true}
                  siblingRange={2}
                  nextItem={true}
                />
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

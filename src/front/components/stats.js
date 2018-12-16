import React from "react";
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
class Categories extends React.Component {
  render() {
    return (
      <Grid.Column className="stats">
        <Segment
          basic
          style={{
            minHeight: "100%",
            alignSelf: "flex-start",
            width: "100%"
          }}
        >
          <Grid stackable columns={3}>
            <Grid.Column>
              <Segment
                raised
                style={{
                  minHeight: "100%",
                  width: "100%"
                }}
              >
                <Grid.Column width={10}>
                  <Header size="medium" textAlign="left">
                    Total Branches
                  </Header>
                </Grid.Column>
                <Grid.Column width={5} floated="right">
                  <Header size="medium" textAlign="right">
                    {this.props.categories}
                  </Header>
                </Grid.Column>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment
                raised
                style={{
                  minHeight: "100%",
                  width: "100%"
                }}
              >
                <Grid.Column width={10}>
                  <Header size="medium" textAlign="left">
                    Total Courses
                  </Header>
                </Grid.Column>
                <Grid.Column width={5} floated="right">
                  <Header size="medium" textAlign="right">
                    {this.props.topics}
                  </Header>
                </Grid.Column>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment
                raised
                style={{
                  minHeight: "100%",
                  width: "100%"
                }}
              >
                <Grid.Column width={10}>
                  <Header size="medium" textAlign="left">
                    Total Questions
                  </Header>
                </Grid.Column>
                <Grid.Column width={5} floated="right">
                  <Header size="medium" textAlign="right">
                    {this.props.qn}
                  </Header>
                </Grid.Column>
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    );
  }
}

export default Categories;

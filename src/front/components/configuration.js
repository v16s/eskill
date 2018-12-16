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
  Modal,
  Radio
} from "semantic-ui-react";
class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.mode ? "On" : "Off"
    };
    this.switch = this.switch.bind(this);
    this.radio = React.createRef();
  }
  switch(checked) {
    let { emit } = this.props;

    emit("changeMode", checked);
  }
  componentDidMount() {
    let { mode } = this.props;
    this.setState({ type: mode ? "On" : "Off" });
  }
  render() {
    return (
      <Grid.Column width={8}>
        <Segment>
          <Segment basic>
            <Header size="large" textAlign="center">
              Configuration
            </Header>
          </Segment>

          <Segment basic>
            <Header as="h4">
              Faculty Registration
              <Radio
                toggle
                checked={this.props.mode}
                style={{ margin: "0 2em", marginTop: "5px" }}
                onChange={(e, d) => this.switch(d.checked)}
              />
              {this.props.mode ? "On" : "Off"}
            </Header>
          </Segment>
          <Segment basic>
            <Input
              fluid
              size="large"
              placeholder="Time Duration for 1 Question (Minutes)"
            >
              <input
                style={{
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px"
                }}
              />
              <Button
                primary
                style={{
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px"
                }}
              >
                <Icon
                  name="add"
                  style={{
                    margin: "0",
                    opacity: "1"
                  }}
                />
              </Button>
            </Input>
          </Segment>
          <Segment basic>
            <Input fluid size="large" placeholder="Enter User ID to search for">
              <input
                style={{
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px"
                }}
              />
              <Button
                primary
                style={{
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px"
                }}
              >
                <Icon
                  name="search"
                  style={{
                    margin: "0",
                    opacity: "1"
                  }}
                />
              </Button>
            </Input>
          </Segment>
        </Segment>
      </Grid.Column>
    );
  }
}

export default Configuration;

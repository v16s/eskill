import React from "react";
import {
  Button,
  Form,
  Message,
  Segment,
  Container,
  Grid,
  Header
} from "semantic-ui-react";
import history from "./history";
import { Link } from "react-router-dom";

class ForgotPage extends React.Component {
  constructor(props) {
    super(props);
    this.sendToServer = this.sendToServer.bind(this);
  }
  sendToServer(e) {
    const forgot = {
      email: document.querySelector("input").value
    };
    this.props.emit("forgot", forgot);
  }

  render() {
    return (
      <Segment
        basic
        style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Segment
          padded
          style={{
            width: "80%",
            maxWidth: "800px"
          }}
        >
          <Form success>
            <div>
              <Header size="large">Reset Password</Header>
            </div>
            <Form.Input label="Email" placeholder="joe@schmoe.com" />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/">
                <Button type="cancel">Cancel</Button>
              </Link>
              <Button
                type="submit"
                positive
                onClick={e => {
                  e.preventDefault();
                  this.sendToServer(e);
                  history.push("/eskill/");
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default ForgotPage;

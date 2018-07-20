import React from "react";
import { Button } from "@aragon/ui";
import { Link } from "react-router-dom";
import { Image, Form, Segment, Header } from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.sendToServer = this.sendToServer.bind(this);
  }
  sendToServer(e) {
    const accDetails = {
      email: e.target.querySelectorAll("input")[0].value,
      pass: e.target.querySelectorAll("input")[1].value
    };

    this.props.emit("det", accDetails);
  }
  render() {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          minHeight: "100vh"
        }}
      >
        <div
          class="ui middle aligned center aligned grid"
          style={{
            width: "60%",
            margin: "0 auto",
            minWidth: "400px",
            maxWidth: "500px"
          }}
        >
          <div class="column">
            <Image src={require("../logo.png")} size="small" centered />

            <form
              class="ui large form"
              onSubmit={e => {
                e.preventDefault();
                this.sendToServer(e);
              }}
            >
              <div
                class="ui secondary  segment"
                style={{ backgroundColor: "#fff" }}
              >
                <Header as="h2" style={{ color: "#666" }}>
                  eApproval
                </Header>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon" />
                    <input type="text" placeholder="Register/Employee Number" />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon" />
                    <input type="password" placeholder="Password" />
                  </div>
                </div>
                <Button mode="strong">Log In</Button>
              </div>

              <div class="ui error message" />
            </form>

            <div class="ui message" style={{ backgroundColor: "#fff" }}>
              New to us? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

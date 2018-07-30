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
          className="ui middle aligned center aligned grid"
          style={{
            width: "60%",
            margin: "0 auto",
            minWidth: "400px",
            maxWidth: "500px"
          }}
        >
          <div className="column">
            <Image src={require("../logo.png")} size="small" centered />

            <form
              className="ui large form"
              onSubmit={e => {
                e.preventDefault();
                this.sendToServer(e);
              }}
            >
              <div
                className="ui secondary segment basic login-wrapper"
                
              >
                <Header as="h2" className='login-heading'>
                  eSkill
                </Header>
                <div className="field">
                  <div className="ui left input">
                    <input type="text" placeholder="Register/Employee Number" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left input">
                    <input type="password" placeholder="Password" />
                  </div>
                </div>
                <button class="ui fluid large positive submit button" type="submit">Login</button>

              </div>

              <div className="ui error message" />
            </form>

            <div className="ui message">
              New to us? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

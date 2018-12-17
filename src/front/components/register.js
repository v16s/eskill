import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Segment,
  Image,
  Container,
  Icon,
  Grid,
  Modal,
  Header
} from "semantic-ui-react";
import history from "./history";
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passError: ""
    };
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    this.setState({ passError: "" });
    let regNo = document.querySelector("#reg").value;
    let getCurrentYear = () => {
      if (new Date().getMonth() + 1 <= 7) {
        let currentYear;
        switch (
          parseInt(new Date().getFullYear()) -
            parseInt(`20${regNo.slice(2, 4)}`)
        ) {
          case 1:
            currentYear = "First Year";
            break;
          case 2:
            currentYear = "Second Year";
            break;
          case 3:
            currentYear = "Third Year";
            break;
          case 4:
            currentYear = "Fourth Year";
        }
        return currentYear;
      } else {
        let currentYear;
        switch (
          parseInt(new Date().getFullYear()) -
            parseInt(`20${regNo.slice(2, 4)}`)
        ) {
          case 0:
            currentYear = "First Year";
            break;
          case 1:
            currentYear = "Second Year";
            break;
          case 2:
            currentYear = "Third Year";
            break;
          case 3:
            currentYear = "Fourth Year";
        }
        return currentYear;
      }
    };
    function getBranch() {
      let branch;

      return branch;
    }
    let obj = {
      name: document.querySelector("#name").value,
      regNo: document.querySelector("#reg").value,
      branch: document.querySelector("#branch").innerText,
      password: document.querySelector("#password").value,
      confirm: document.querySelector("#confirm").value,
      email: document.querySelector("#email").value
    };
    if (obj.password == obj.confirm) {
      this.props.emit("reg", obj);
      history.push("/eskill/");
    } else {
      this.setState({ passError: "Passwords don't match! " });
    }
  }

  render() {
    const options = [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" }
    ];
    const branches = [
      { key: "b", text: "BioTechnology", value: "biotech" },
      { key: "a", text: "Automobile Engineering", value: "auto" },
      { key: "i", text: "Information Technology", value: "it" },
      { key: "c", text: "Chemical Engineering", value: "ce" },
      {
        key: "ee",
        text: "Electrical and Electronics Engineering",
        value: "eee"
      },
      { key: "ce", text: "Civil Engineering", value: "ce" },
      { key: "me", text: "Mechanical Engineering", value: "me" },
      { key: "cs", text: "Computer Science and Engineering", value: "cse" },
      {
        key: "ec",
        text: "Electronics and Communications Engineering",
        value: "ece"
      },
      {
        key: "se",
        text: "Software Engineering",
        value: "se"
      },
      {
        key: "ae",
        text: "Aerospace Engineering",
        value: "ae"
      },
      {
        key: "bin",
        text: "Bioinformatics",
        value: "bin"
      },
      {
        key: "bme",
        text: "Biomedical Engineering",
        value: "bme"
      },
      {
        key: "mche",
        text: "Mechatronics Engineering",
        value: "mche"
      },
      {
        key: "som",
        text: "School of Management",
        value: "som"
      },
      {
        key: "agre",
        text: "Agricultural Engineering",
        value: "agre"
      },
      {
        key: "eai",
        text: "Electronics and Instrumentation",
        value: "eai"
      },
      {
        key: "gen",
        text: "Genetic Engineering",
        value: "gen"
      },
      {
        key: "fpe",
        text: "Food Processing Engineering",
        value: "fpe"
      },
      {
        key: "care",
        text: "SRM CARE",
        value: "care"
      },
      {
        key: "eng",
        text: "English",
        value: "eng"
      },
      {
        key: "phy",
        text: "Physics",
        value: "phy"
      },
      {
        key: "chem",
        text: "Chemistry",
        value: "chem"
      },
      {
        key: "math",
        text: "Mathematics",
        value: "math"
      }
    ];
    return (
      <Grid
        centered
        verticalAlign="middle"
        style={{
          height: "100vh",
          paddingTop: "14px",
          width: "100vw",
          backgroundColor: this.props.dark ? "#222" : "#fff"
        }}
      >
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={13} textAlign="center">
            <Segment padded size="big" inverted={this.props.dark}>
              <Header
                as="h2"
                style={{
                  marginBottom: "0"
                }}
              >
                eSkill {this.props.mode ? "Faculty" : "Student"} Registration
              </Header>
              <p
                style={{
                  fontSize: "14px"
                }}
              >
                {" "}
                Please fill in the details in order to continue
              </p>
              <Form
                inverted={this.props.dark}
                onSubmit={e => {
                  e.preventDefault();
                  this.submit(e);
                }}
              >
                <Form.Field>
                  <label>Full Name</label>
                  <input id="name" required placeholder="Name" />
                </Form.Field>
                <Form.Field>
                  <label>Reg Number</label>
                  <input
                    id="reg"
                    required
                    placeholder={this.props.mode ? "Id" : "Reg No."}
                  />
                </Form.Field>
                <Form.Field
                  width={16}
                  control={Select}
                  required
                  label="Branch"
                  options={branches}
                  placeholder="Branch"
                  id="branch"
                />

                <Form.Group widths="equal">
                  <Form.Input
                    required
                    fluid
                    id="email"
                    label="Email"
                    placeholder="Email ID"
                  />
                  <Form.Input
                    type="password"
                    required
                    fluid
                    id="password"
                    label="Password"
                    placeholder="Password"
                  />
                  <Form.Input
                    type="password"
                    required
                    fluid
                    id="confirm"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                  />
                </Form.Group>

                <Button
                  type="cancel"
                  onClick={e => {
                    e.preventDefault();
                    history.push("/eskill/");
                  }}
                >
                  Cancel
                </Button>
                <Button positive type="submit">
                  Register
                </Button>
              </Form>
              {this.state.passError !== "" ? (
                <div
                  className="ui error message"
                  style={{
                    display: "block",
                    border: "none",
                    height: "38px",
                    fontSize: "1rem"
                  }}
                >
                  {this.state.passError}
                </div>
              ) : null}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
class CustomInput extends React.Component {
  render() {
    return (
      <Button
        primary
        fluid
        onClick={e => {
          e.preventDefault();
          this.props.onClick(e);
        }}
      >
        {this.props.value}
      </Button>
    );
  }
}
export default RegisterPage;

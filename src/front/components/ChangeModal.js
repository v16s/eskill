import React from "react";
import {
  Table,
  Grid,
  Button,
  Modal,
  Segment,
  Input,
  Pagination
} from "semantic-ui-react";

import ChangeQuestion from "./ChangeQuestion";
export default class ChangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.resolve = this.resolve.bind(this);
  }
  handleClick(e, n, cat, p, topic) {
    this.props.stateSet({
      cpn: n || "",
      cpcat: cat || "",
      cptopic: topic || "",
      cpvisible: !this.props.visible,
      cpproblem: p
    });
  }
  handleClose(e) {
    this.props.stateSet({ cpvisible: false });
  }
  resolve(action) {
    let { emit, stateSet } = this.props;
    emit("resolve", { problem: this.state.problem, action: action });
    stateSet({ cpvisible: false });
  }
  render() {
    return (
      <Modal
        closeOnDimmerClick
        open={this.props.visible}
        size="large"
        onClose={() => this.handleClose()}
      >
        <Modal.Content
          style={{
            backgroundColor: this.props.dark ? "#222" : "#fff"
          }}
        >
          <ChangeQuestion
            {...this.props}
            n={this.props.n}
            modal
            dark={this.props.dark}
            category={this.props.cat}
            error={this.props.chError}
            success={this.props.chSuccess}
            topic={this.props.topic}
            afterEmit={this.props.resolve}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

import React, { Component } from 'react'
import {
  Segment,
  Header,
  Form,
  Button,
  Modal,
  Icon,
  Input
} from 'semantic-ui-react'
import Latex from 'react-latex'
class Preview extends Component {
  state = { visible: false }
  handleClick () {
    this.setState({ visible: !this.state.visible })
  }
  handleSubmit () {
    let { q, pid, sid, name, emit } = this.props
    let report = {
      cat: q.category,
      n: q.number,
      pid: pid,
      sid: sid,
      name: name,
      desc: document.getElementById('problem-desc').value
    }
    emit('addProblem', report)
    console.log(report)
    this.setState({ visible: !this.state.visible })
  }
  render () {
    let { name, without, q } = this.props

    if (!without) {
      return (
        <Segment
          basic
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Form.Field>
            <label>Question Preview</label>
            <Header attached='top' as='h3' style={{ marginTop: '0' }}>
              {name}
            </Header>
            <Segment attached>
              <Latex>{this.props.desc}</Latex>
            </Segment>
          </Form.Field>
        </Segment>
      )
    } else {
      return (
        <Segment
          basic
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Header
            attached='top'
            as='h3'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0'
            }}
          >
            <div className='float'>{`Question ${parseFloat(this.props.i) +
              1}`}</div>
            <div className='float'>
              <Modal
                closeOnDimmerClick
                trigger={
                  <Button negative onClick={e => this.handleClick()}>
                    Report a Problem
                  </Button>
                }
                open={this.state.visible}
                size='small'
                onClose={() => this.handleClick()}
              >
                <Header icon='warning circle' content='Report a Problem' />
                <Modal.Content>
                  <Input
                    fluid
                    id='problem-desc'
                    placeholder='Please describe your problem'
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color='red'
                    inverted
                    onClick={e => this.handleSubmit()}
                  >
                    Submit
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </Header>
          <Segment basic>
            <Latex>{q.qdef}</Latex>
          </Segment>
        </Segment>
      )
    }
  }
}

export default Preview

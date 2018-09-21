import React, { Component } from 'react'
import { Segment, Header, Form } from 'semantic-ui-react'
import Latex from 'react-latex'
class Preview extends Component {
  state = {}
  render () {
    let { name } = this.props

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
  }
}

export default Preview

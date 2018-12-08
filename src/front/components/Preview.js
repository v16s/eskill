import React, { Component } from 'react'
import { Segment, Header, Form } from 'semantic-ui-react'
import Latex from 'react-latex'
class Preview extends Component {
  state = {}
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
          <Header attached='top' as='h3' style={{ marginTop: '0' }}>
            {q.qname}
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

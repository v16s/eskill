import React from 'react'
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
} from 'semantic-ui-react'
class Configuration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'Faculty'
    }
    this.switch = this.switch.bind(this)
    this.radio = React.createRef()
  }
  switch (checked) {
    checked
      ? this.setState({ type: 'Student' })
      : this.setState({ type: 'Faculty' })
  }
  render () {
    return (
      <Grid.Column width={8}>
        <Segment>
          <Segment basic>
            <Header size='large' textAlign='center'>Configuration</Header>
            <Input
              fluid
              size='large'
              placeholder='Number of digits in Faculty ID'
            >
              <input />
              <input
                placeholder='Number of digits in Student ID'
                style={{
                  marginLeft: '5px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}
              />
              <Button
                primary
                style={{
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px'
                }}
              >
                <Icon
                  name='add'
                  style={{
                    margin: '0',
                    opacity: '1'
                  }}
                />
              </Button>
            </Input>

          </Segment>
          <Segment basic>
            <Header as='h4'>
              {this.state.type} Registration
              <Radio
                toggle
                style={{ marginLeft: '2em', marginTop: '5px' }}
                onChange={(e, d) => this.switch(d.checked)}
              />
            </Header>
          </Segment>
          <Segment basic>
            <Input
              fluid
              size='large'
              placeholder='Time Duration for 1 Question (Minutes)'
            >

              <input
                style={{
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}
              />
              <Button
                primary
                style={{
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px'
                }}
              >
                <Icon
                  name='add'
                  style={{
                    margin: '0',
                    opacity: '1'
                  }}
                />
              </Button>
            </Input>
          </Segment>
        </Segment>
      </Grid.Column>
    )
  }
}

export default Configuration

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
      type: 'On'
    }
    this.switch = this.switch.bind(this)
    this.radio = React.createRef()
  }
  switch (checked) {
    checked ? this.setState({ type: 'On' }) : this.setState({ type: 'Off' })
  }
  render () {
    return (
      <Grid.Column width={8}>
        <Segment>
          <Segment basic>
            <Header size='large' textAlign='center'>Configuration</Header>
          </Segment>

          <Segment basic>
            <Header as='h4'>
              Student/Faculty Registration
              <Radio
                toggle
                defaultChecked
                style={{ margin: '0 2em', marginTop: '5px' }}
                onChange={(e, d) => this.switch(d.checked)}
              />
              {this.state.type}
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
          <Segment basic>
            <Input fluid size='large' placeholder='Enter User ID to search for'>

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
                  name='search'
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

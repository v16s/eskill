import React from 'react'
import {
  Button,
  Form,
  Message,
  Segment,
  Container,
  Grid,
  Header
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'

class ForgotPage extends React.Component {
  constructor (props) {
    super(props)
    this.sendToServer = this.sendToServer.bind(this)
  }
  sendToServer (e) {
    const forgot = {
      email: e.target.querySelectorAll('input')
    }
    console.log(forgot)
    this.props.emit('forDetails', forgot)
    return (
      <div>
        <Message
          success
          header='Success!'
          content='A password reset link has been sent to your Email!'
        />
      </div>
    )
  }

  render () {
    return (
      <Grid centered verticalAlign='middle'>
        <Container verticalAlign='middle'>
          <Segment padded>
            <Form success>
              <div>
                <Header size='large'>Reset Password</Header>
              </div>
              <Form.Input label='Email' placeholder='joe@schmoe.com' />

              <Button
                type='submit'
                positive
                onClick={e => {
                  e.preventDefault()
                  this.sendToServer(e)
                }}
              >
                Submit
              </Button>
              <Link to='/'>
                <Button type='cancel'>Cancel</Button>
              </Link>
            </Form>
          </Segment>
        </Container>
      </Grid>
    )
  }
}

export default ForgotPage

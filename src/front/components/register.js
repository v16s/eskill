import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import history from './history'
import 'react-datepicker/dist/react-datepicker.css'

class RegisterPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentDate: new Date(),
      passError: ''
    }
    this.submit = this.submit.bind(this)
    this.changeDate = this.changeDate.bind(this)
  }
  changeDate (date) {
    console.log(date)
    this.setState({ currentDate: date })
  }
  submit (e) {
    this.setState({ passError: '' })
    let regNo = document.querySelector('#reg').value
    let getCurrentYear = () => {
      if (new Date().getMonth() + 1 <= 7) {
        let currentYear
        switch (
          parseInt(new Date().getFullYear()) -
            parseInt(`20${regNo.slice(2, 4)}`)
        ) {
          case 1:
            currentYear = 'First Year'
            break
          case 2:
            currentYear = 'Second Year'
            break
          case 3:
            currentYear = 'Third Year'
            break
          case 4:
            currentYear = 'Fourth Year'
        }
        return currentYear
      } else {
        let currentYear
        switch (
          parseInt(new Date().getFullYear()) -
            parseInt(`20${regNo.slice(2, 4)}`)
        ) {
          case 0:
            currentYear = 'First Year'
            break
          case 1:
            currentYear = 'Second Year'
            break
          case 2:
            currentYear = 'Third Year'
            break
          case 3:
            currentYear = 'Fourth Year'
        }
        return currentYear
      }
    }
    function getBranch () {
      let branch
      switch (regNo.slice(6, 9)) {
        case '001':
          branch = 'Civil Engineering'
          break
        case '002':
          branch = 'Mechanical Engineering'
          break
        case '003':
          branch = 'Computer Science and Engineering'
          break
        case '004':
          branch = 'Electronics and Communications Engineering'
          break
        case '005':
          branch = 'Electrical and Electronics Engineering'
          break
        case '006':
          branch = 'Chemical Engineering'
          break
        case '007':
          branch = 'Information Technology'
          break
        case '008':
          branch = 'BioTechnology'
          break
        case '009':
          branch = 'Automobile Engineering'
      }
      return branch
    }
    let obj = {
      name: document.querySelector('#name').value,
      regNo: document.querySelector('#reg').value,
      dob: this.state.currentDate,
      gender: document.querySelector('.active.selected.item').innerText,
      branch: getBranch(),
      password: document.querySelector('#password').value,
      confirm: document.querySelector('#confirm').value,
      email: document.querySelector('#email').value
    }
    if (obj.password == obj.confirm) {
      this.props.emit('reg', obj)
      history.push('/')
    } else {
      this.setState({ passError: "Passwords don't match! " })
    }
    console.log(obj)
  }

  render () {
    const options = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' }
    ]
    return (
      <Grid
        centered
        verticalAlign='middle'
        style={{
          height: '100vh',
          paddingTop: '14px',
          width: '100vw'
        }}
      >
        <Grid.Row verticalAlign='middle'>
          <Grid.Column width={13} textAlign='center'>
            <Segment padded size='big'>
              <Header
                as='h2'
                style={{
                  marginBottom: '0'
                }}
              >
                eSkill Student Registration
              </Header>
              <p
                style={{
                  fontSize: '14px'
                }}
              >
                {' '}
                Please fill in the details in order to continue
              </p>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  this.submit(e)
                }}
              >
                <Form.Field>
                  <label>Full Name</label>
                  <input id='name' required placeholder='Name' />
                </Form.Field>
                <Form.Field>
                  <label>Reg Number</label>
                  <input id='reg' required placeholder='Reg No.' />
                </Form.Field>

                <Form.Field label='D.O.B' />
                <Form.Group widths='equal'>
                  <DatePicker
                    selected={this.state.currentDate}
                    onChange={this.changeDate}
                    customInput={<CustomInput />}
                    dateFormat='dd/mm/YYYY'
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Field
                    width={16}
                    control={Select}
                    required
                    label='Gender'
                    options={options}
                    placeholder='Gender'
                    id='gender'
                  />
                </Form.Group>

                <Form.Group widths='equal'>
                  <Form.Input
                    required
                    fluid
                    id='email'
                    label='Email'
                    placeholder='Email ID'
                  />
                  <Form.Input
                    type='password'
                    required
                    fluid
                    id='password'
                    label='Password'
                    placeholder='Password'
                  />
                  <Form.Input
                    type='password'
                    required
                    fluid
                    id='confirm'
                    label='Confirm Password'
                    placeholder='Confirm Password'
                  />
                </Form.Group>

                <Button positive type='submit'>
                  Register
                </Button>
                <Button
                  type='cancel'
                  onClick={e => {
                    e.preventDefault()
                    history.push('/')
                  }}
                >
                  Cancel
                </Button>
              </Form>
              {this.state.passError !== '' ? (
                <div
                  className='ui error message'
                  style={{
                    display: 'block',
                    border: 'none',
                    height: '38px',
                    fontSize: '1rem'
                  }}
                >
                  {this.state.passError}
                </div>
              ) : null}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
class CustomInput extends React.Component {
  render () {
    return (
      <Button
        primary
        fluid
        onClick={e => {
          e.preventDefault()
          this.props.onClick(e)
        }}
      >
        {this.props.value}
      </Button>
    )
  }
}
export default RegisterPage

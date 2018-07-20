import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Form, Input, TextArea, Button,Select,Segment,Image,Container,Icon,Grid,Modal,Header} from 'semantic-ui-react'
import history from './history'
class RegisterPage extends Component
{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit(e) {
    let regNo = e.target.querySelectorAll('input')[1].value
    let getCurrentYear = () => {if(new Date().getMonth() + 1 <=7) {
      let currentYear
      switch(parseInt(new Date().getFullYear()) - parseInt(`20${regNo.slice(2,4)}`)) {
        case 1: 
        currentYear = 'First Year'
        break;
        case 2: 
        currentYear = 'Second Year'
        break;
        case 3: 
        currentYear = 'Third Year'
        break;
        case 4: 
        currentYear = 'Fourth Year'
      }
      return currentYear
    } else {
      let currentYear
      switch(parseInt(new Date().getFullYear()) - parseInt(`20${regNo.slice(2,4)}`)) {
        case 0: 
        currentYear = 'First Year'
        break;
        case 1: 
        currentYear = 'Second Year'
        break;
        case 2: 
        currentYear = 'Third Year'
        break;
        case 3: 
        currentYear = 'Fourth Year'
      }
      return currentYear
    }}
    function getBranch() {
      let branch
      switch(regNo.slice(6,9)) {
        case '001': 
        branch = 'Civil Engineering'
        break;
        case '002':
        branch = 'Mechanical Engineering'
        break;
        case '003':
        branch = 'Computer Science and Engineering'
        break;
        case '004':
        branch = 'Electronics and Communications Engineering'
        break;
        case '005': 
        branch = 'Electrical and Electronics Engineering'
        break;
        case '006':
        branch = 'Chemical Engineering'
        break;
        case '007':
        branch = 'Information Technology'
        break;
        case '008':
        branch = 'BioTechnology'
        break;
        case '009':
        branch = 'Automobile Engineering'
      }
      return branch
    }
    let obj = {
      name: e.target.querySelectorAll('input')[0].value,
      regNo: e.target.querySelectorAll('input')[1].value,
      dob: new Date(
        e.target.querySelectorAll('input')[4].value,e.target.querySelectorAll('input')[3].value - 1,e.target.querySelectorAll('input')[2].value
      ),
      mothersName: e.target.querySelectorAll('input')[6].value,
      fathersName: e.target.querySelectorAll('input')[5].value,
      nationality: `${e.target.querySelectorAll('input')[7].value}, ${e.target.querySelectorAll('input')[8].value}`,
      aadhar: `${e.target.querySelectorAll('input')[9].value} ${e.target.querySelectorAll('input')[10].value} ${e.target.querySelectorAll('input')[11].value}`,
      gender: e.target.querySelector('.active.selected.item').innerText,
      currentYear: getCurrentYear(),
      doa: new Date(`20${regNo.slice(2,4)}`, '06', '21'),
      deg: 'B. Tech',
      courseDuration: 'Four Years',
      medium: 'English',
      branch: getBranch(),
      passport: 'Not Available at this point',
      password: e.target.querySelectorAll('input')[13].value,
      email: e.target.querySelectorAll('input')[12].value

    }
    this.props.emit('reg', obj)
    console.log(obj)
  }

render() {
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
  ]
  return(


      <Grid centered verticalAlign="middle" style={{
        height: '100%',
        paddingTop: '14px'
      }}>
        <Grid.Row verticalAlign="middle">
        <Segment padded size="big">
          <Grid.Column width={13} textAlign="center">
          <Header as='h2' style={{
            marginBottom: '0'
          }} >eApproval Registration</Header>
          <p style={{
            fontSize: '14px'
          }} > Please fill in the details in order to continue</p>
      <Form onSubmit={e => {
        e.preventDefault()
        this.submit(e)
        history.push('/')
      }}>
        <Form.Field>
          <label>Full Name</label>
          <input required placeholder='Name' />
        </Form.Field>
        <Form.Field>
          <label>Reg Number</label>
          <input required placeholder='Reg No.' />
        </Form.Field>

              <Form.Field label="D.O.B"/>
            <Form.Group widths='equal'>
              <Form.Field control={Input} placeholder='DD' />
              <Form.Field control={Input} placeholder='MM' />
              <Form.Field control={Input} required placeholder='YYYY' />
            </Form.Group>

            <Form.Group inline>
            <Form.Field control={Select} required label='Gender' options={options} placeholder='Gender' />
            </Form.Group>


            <Form.Group widths='equal'>
              <Form.Input required fluid id='form-subcomponent-shorthand-input-fathers-name' label="Father's name" placeholder="Father's name" />
              <Form.Input required fluid id='form-subcomponent-shorthand-input-mothers-name' label="Mother's Name" placeholder="Mother's name" />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Input required fluid id='form-subcomponent-shorthand-input-nationality' label ="Nationality" placeholder ="Nation" />
              <Form.Input required fluid id='form-subcomponent-shorthand-input-religion' label="Religion" placeholder="Religion" />
            </Form.Group>

            <Form.Field required label="Aadhar Number"/>
            <Form.Group widths='equal'>
              <Form.Input required fluid id='form-subcomponent-shorthand-input-aadhar1'  placeholder ="xxxx" />
              <Form.Input required fluid id='form-subcomponent-shorthand-input-aadhar2'  placeholder="yyyy" />
                <Form.Input required fluid id='form-subcomponent-shorthand-input-aadhar3'  placeholder="zzzz" />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input required fluid id='form-subcomponent-shorthand-input-email' label='Email'  placeholder ="Email ID" />
              <Form.Input type='password' required fluid id='form-subcomponent-shorthand-input-password' label='Password'  placeholder="Password" />
            </Form.Group>

      <Button positive type="submit">Next</Button>
      <Button type="cancel" onClick={e => {
        e.preventDefault()
        history.push('/')
      }} >Cancel</Button>



</Form>
</Grid.Column>
</Segment>
</Grid.Row>
</Grid>
  )
        }
      }
export default RegisterPage

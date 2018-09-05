import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import History from './history'
import Stats from './stats'
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
  GridRow
} from 'semantic-ui-react'
import Categories from './categories'
import AddQuestion from './AddQuestion'
import _ from 'lodash'



class CoordinatorDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.categories
    }
    this.logout = this.logout.bind(this)
    this.emit = this.emit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState({ visible: !this.state.visible })
  }

  logout () {
    this.props.logout()
  }
  componentDidMount () {}
  emit (name, obj) {
    this.props.emit(name, obj)
  }
  render () {
    let { md: det, topics, categories } = this.props
    let tl = _.toArray(topics).length, cl = _.toArray(categories).length
    console.log(cl, tl, typeof topics, typeof categories)
    return (
     
      <div>
       <Segment
          style={{
            borderRadius: '0',
            marginBottom: '0',
            padding: '0.5em 1em'
          }}
        >
          <Menu secondary fluid borderless>
            <Menu.Item onClick={e => this.handleClick()}>
              <Icon
                name='bars'
                size='large'
                style={{
                  color: '#1456ff'
                }}
              />
            </Menu.Item>
            <Menu.Item>
              <Header as='h2' className='brand'>eSkill</Header>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                onClick={e => {
                  e.preventDefault()
                  this.logout()
                  History.push('/')
                  window.location.reload()
                }}
              >
                <Icon name='sign out' size='large' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>



<Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='push'
            width='wide'
            visible={this.state.visible}
            icon='labeled'
            vertical
            inverted
          >
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='user'>
              <Icon name='user' />
              Edit Profile
            </Menu.Item>
            <Menu.Item
              name='logout'
              onClick={e => {
                e.preventDefault()
                this.logout()
                History.push('/')
                window.location.reload()
              }}
            >
              <Icon name='sign out' />
              Logout
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '10px 0'
            }}
          >
            <Segment
              basic
              style={{
                minHeight: '100%',
                alignSelf: 'flex-start',
                width: '100%'
              }}
            >
              <Grid padded stackable relaxed doubling divided='vertically'>
                <Grid.Row>
                  <Stats categories={cl} topics={tl} />
                </Grid.Row>   
                <Grid.Row>
                  <AddQuestion/>
                  </Grid.Row>                       
              </Grid>

            </Segment>


        <Header
              size='tiny'
              style={{
                position: 'relative',
                textAlign: 'center',
                width: '100%',
                alignSelf: 'flex-end'
              }}
            >
              eSkill - SRM Center for Applied Research in Education
            </Header>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
      
    )
  }
}

export default CoordinatorDashboard

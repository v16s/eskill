import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
    Form,
    GridRow
  } from 'semantic-ui-react'
  import History from './history'
  import _ from 'lodash'

  class NewTest extends React.Component{
      constructor(props){
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
      render(){
          return(<div>

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
<Segment basic>
            <Segment>
            <Grid columns={2}>
            <Grid.Row>
            <Button.Group fluid>
                <Button danger>SELECT CATEGORY</Button>
                <Button positive>SEARCH TAGS</Button>
              </Button.Group>
              <Grid.Column stretched>
              </Grid.Column>
                </Grid.Row>
              </Grid>

<Grid.Column>
            <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Grid column={2}>
                  <Grid.Column className='input-column'>
                  <Dropdown placeholder='Choose Category' fluid selection  />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid column={2}>
                  <Grid.Column className='input-column'>
                  <Dropdown placeholder='Choose Topic' fluid selection />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Grid column={2}>
                  <Grid.Column className='input-column'>
                  <Dropdown placeholder='Choose No. of Questions' fluid selection />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid column={2}>
                 
                  <Grid.Column className='input-column'>
                  <Dropdown placeholder='Select Level' fluid selection />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Button primary fluid>Start New Test</Button>
          </Grid>
          </Grid.Column>
          
          </Segment>
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
  export default NewTest
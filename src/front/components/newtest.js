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
import history from './history'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import History from './history'
import _ from 'lodash'
import Preview from './Preview'
class NewTest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.categories,
      selCat: null,
      topics: [],
      selTopic: null,
      value: props.q[props.i] != undefined ? props.q[props.i].v || '' : '',
      check: false
    }
    this.logout = this.logout.bind(this)
    this.emit = this.emit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleTopicChange = this.handleTopicChange.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleSub = this.handleSub.bind(this)
    this.reset = this.reset.bind(this)
  }
  handleCategoryChange (e) {
    this.setState({
      topics: e.topics,
      selCat: { _id: e.value, name: e.label }
    })
  }
  handleTopicChange (e) {
    this.setState({ selTopic: { _id: e.value, name: e.label } })
  }
  handleClick () {
    this.setState({ visible: !this.state.visible })
  }
  reset () {
    this.setState({ check: false, value: null })
  }
  handleSub (e) {
    this.setState({ check: true })
    let { i, q, question: qu, stateSet, emit } = this.props
    let { value } = this.state
    if (qu.answer == value) {
      q[i].a = 2
    } else {
      q[i].a = 1
    }
    emit('changeQuestion', q)
    stateSet('qstate', q)
  }
  logout () {
    this.props.logout()
  }
  componentDidMount () {}
  emit (name, obj) {
    this.props.emit(name, obj)
  }
  handleRadio (e, { value }) {
    let { i, q, question: qu, stateSet, emit } = this.props
    if (!this.state.check) {
      this.setState({ value })
      q[i].a = 3
      q[i].v = value
      emit('changeQuestion', q)
      stateSet('qstate', q)
    }
  }
  render () {
    let { topics, value, check } = this.state
    let { categories, question: q, i, q: qa } = this.props
    console.log(categories, topics)
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
              <Header as='h2' className='brand'>
                eSkill
              </Header>
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
            <Menu.Item
              name='home'
              onClick={e => {
                history.push('/')
              }}
              onClick={e => {
                history.push('/')
              }}
            >
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
              {q != undefined ? (
                <Segment>
                  <Preview q={q} without />

                  <Segment basic>
                    {' '}
                    <Grid columns={2} divided>
                      <Grid.Row>
                        <Grid.Column>
                          <Grid column={2}>
                            <Grid.Column className='radio-column'>
                              <Form.Radio
                                value='a'
                                checked={value == 'a'}
                                onChange={this.handleRadio}
                                disabled={check}
                              />
                            </Grid.Column>
                            <Grid.Column className='input-column'>
                              <Segment
                                className='cursorpointer'
                                onClick={e =>
                                  this.handleRadio(e, { value: 'a' })
                                }
                                inverted={
                                  value === 'a' || (check && q.answer == 'a')
                                }
                                color={
                                  (!check && value === 'a') ||
                                  (check && q.answer == 'a')
                                    ? 'green'
                                    : value === 'a' && check && q.answer != 'a'
                                      ? 'red'
                                      : null
                                }
                              >
                                {q.options.a.split(') ').pop()}
                              </Segment>
                            </Grid.Column>
                          </Grid>
                        </Grid.Column>
                        <Grid.Column>
                          <Grid column={2}>
                            <Grid.Column className='radio-column'>
                              <Form.Radio
                                value='b'
                                checked={value == 'b'}
                                onChange={this.handleRadio}
                                disabled={check}
                              />
                            </Grid.Column>
                            <Grid.Column className='input-column'>
                              <Segment
                                className='cursorpointer'
                                onClick={e =>
                                  this.handleRadio(e, { value: 'b' })
                                }
                                inverted={
                                  (!check && value === 'b') ||
                                  (check && q.answer == 'b')
                                }
                                color={
                                  value === 'b' || (check && q.answer == 'b')
                                    ? 'green'
                                    : value === 'b' && check && q.answer != 'b'
                                      ? 'red'
                                      : null
                                }
                              >
                                {q.options.b.split(') ').pop()}
                              </Segment>
                            </Grid.Column>
                          </Grid>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Grid column={2}>
                            <Grid.Column className='radio-column'>
                              <Form.Radio
                                value='c'
                                checked={value == 'c'}
                                onChange={this.handleRadio}
                                disabled={check}
                              />
                            </Grid.Column>
                            <Grid.Column className='input-column'>
                              <Segment
                                className='cursorpointer'
                                onClick={e =>
                                  this.handleRadio(e, { value: 'c' })
                                }
                                inverted={
                                  value === 'c' || (check && q.answer == 'c')
                                }
                                color={
                                  (!check && value === 'c') ||
                                  (check && q.answer == 'c')
                                    ? 'green'
                                    : value === 'c' && check && q.answer != 'c'
                                      ? 'red'
                                      : null
                                }
                              >
                                {q.options.c.split(') ').pop()}
                              </Segment>
                            </Grid.Column>
                          </Grid>
                        </Grid.Column>
                        <Grid.Column>
                          <Grid column={2}>
                            <Grid.Column className='radio-column'>
                              <Form.Radio
                                value='d'
                                checked={value == 'd'}
                                onChange={this.handleRadio}
                                disabled={check}
                              />
                            </Grid.Column>
                            <Grid.Column className='input-column'>
                              <Segment
                                className='cursorpointer'
                                onClick={e =>
                                  this.handleRadio(e, { value: 'd' })
                                }
                                inverted={
                                  value === 'd' || (check && q.answer == 'd')
                                }
                                color={
                                  (!check && value === 'd') ||
                                  (check && q.answer == 'd')
                                    ? 'green'
                                    : value === 'd' && check && q.answer != 'd'
                                      ? 'red'
                                      : null
                                }
                              >
                                {q.options.d.split(') ').pop()}
                              </Segment>
                            </Grid.Column>
                          </Grid>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      console.log(this)
                      if (![null, ''].includes(this.state.value)) {
                        this.handleSub()
                      }
                    }}
                  >
                    <Segment basic>
                      <Button
                        primary
                        fluid
                        disabled={
                          check || [null, ''].includes(this.state.value)
                        }
                      >
                        Submit
                      </Button>
                    </Segment>
                    {check ? <Segment>{q.hints}</Segment> : null}
                  </Form>
                </Segment>
              ) : null}
              <Segment>
                <Segment basic>
                  <Grid columns={3}>
                    <Grid.Column>
                      <Button
                        primary
                        fluid
                        onClick={e => {
                          if (i > 0) {
                            history.push(`/question/${i - 1}`)
                            this.reset()
                          }
                        }}
                        disabled={!(i > 0)}
                      >
                        Previous Question
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        primary
                        fluid
                        onClick={e => {
                          history.push(`/`)
                        }}
                        disabled={!(i > 0)}
                      >
                        Home
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        primary
                        fluid
                        onClick={e => {
                          if (i < qa.length - 1) {
                            this.reset()
                            history.push(`/question/${parseInt(i) + 1}`)
                          }
                        }}
                        disabled={!(i < qa.length - 1)}
                      >
                        Next Question
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Segment>
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

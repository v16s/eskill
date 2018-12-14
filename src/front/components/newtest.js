import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Container,
  Grid,
  Dropdown,
  Pagination,
  Modal,
  Form,
  GridRow
} from 'semantic-ui-react'
import Spinner from 'react-spinkit'
import history from './history'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import History from './history'
import endpoint from '../enpoint'
import _ from 'lodash'
import Preview from './Preview'
let f = false
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
      value:
        props.q[props.cat] != undefined &&
        props.q[props.cat].q[props.i] != undefined
          ? props.q[props.cat].q[props.i].v || ''
          : '',
      check:
        props.q[props.cat] != undefined &&
        props.q[props.cat].q[props.i] != undefined
          ? props.q[props.cat].q[props.i].a != 0
          : false
    }
    this.logout = this.logout.bind(this)
    this.emit = this.emit.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleTopicChange = this.handleTopicChange.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleSub = this.handleSub.bind(this)
    this.fetchQuestion = this.fetchQuestion.bind(this)
    this.reset = this.reset.bind(this)
    if (props.q[props.cat] != undefined) {
      f = true
    }
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

  reset () {
    this.setState({ check: false, value: null, question: undefined })
    this.fetchQuestion()
  }
  handleSub (e) {
    let { question: qu } = this.state
    let { i, q, stateSet, emit, cat } = this.props
    let { value } = this.state
    if (qu.answer == value) {
      q[cat].q[i].a = 2
    } else {
      q[cat].q[i].a = 1
    }
    emit('changeQuestion', [q[cat], cat])
    stateSet('qstate', q)
    this.setState({ check: true })
  }
  logout () {
    this.props.logout()
  }
  fetchQuestion () {
    let { q, i, cat } = this.props
    fetch(endpoint + '/api/question', {
      body: JSON.stringify({ n: q[cat].q[i].n, cat: cat }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(question => {
        if (!question.err) {
          this.setState({ question: question.question })
        }
      })
  }
  componentDidMount () {
    if (!f) {
      setInterval(() => {
        if (
          this.props.cat != undefined &&
          this.props.q[this.props.cat] != undefined
        ) {
          this.fetchQuestion()
          f = true
        }
      }, 400)
    } else {
      this.fetchQuestion()
    }
  }
  emit (name, obj) {
    this.props.emit(name, obj)
  }

  handleRadio (e, { value }) {
    let { i, q, stateSet, emit, cat } = this.props

    console.log(i)

    if (!this.state.check) {
      this.setState({ value })
      q[cat].q[i].a = 3
      q[cat].q[i].v = value
      emit('changeQuestion', [q[cat], cat])
      stateSet('qstate', q)
    }
  }
  render () {
    let { topics, value, check, question: q } = this.state
    let { categories, i, q: qall, cat, cid } = this.props
    let qa = qall[cat]

    return (
      <div>
        {qall[cat] != undefined ? (
          <Segment basic>
            {q != undefined ? (
              <Segment>
                <Preview
                  q={q}
                  emit={this.emit}
                  without
                  pid={qa.pid}
                  sid={this.props.id}
                  name={this.props.sname}
                  i={i}
                />

                <Segment basic>
                  <Grid columns={2} divided stackable>
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
                              onClick={e => this.handleRadio(e, { value: 'a' })}
                              inverted={
                                value == 'a' || (check && q.answer == 'a')
                              }
                              color={
                                value == 'a' && check && q.answer != 'a'
                                  ? 'red'
                                  : (!check && value == 'a') ||
                                    (check && q.answer == 'a')
                                    ? 'green'
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
                              onClick={e => this.handleRadio(e, { value: 'b' })}
                              inverted={
                                value == 'b' || (check && q.answer == 'b')
                              }
                              color={
                                value == 'b' && check && q.answer != 'b'
                                  ? 'red'
                                  : (!check && value == 'b') ||
                                    (check && q.answer == 'b')
                                    ? 'green'
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
                              onClick={e => this.handleRadio(e, { value: 'c' })}
                              inverted={
                                value == 'c' || (check && q.answer == 'c')
                              }
                              color={
                                value == 'c' && check && q.answer != 'c'
                                  ? 'red'
                                  : (!check && value == 'c') ||
                                    (check && q.answer == 'c')
                                    ? 'green'
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
                              onClick={e => this.handleRadio(e, { value: 'd' })}
                              inverted={
                                value == 'd' || (check && q.answer == 'd')
                              }
                              color={
                                value == 'd' && check && q.answer != 'd'
                                  ? 'red'
                                  : (!check && value == 'd') ||
                                    (check && q.answer == 'd')
                                    ? 'green'
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
                      disabled={check || [null, ''].includes(this.state.value)}
                    >
                      Submit
                    </Button>
                  </Segment>
                  {check ? <Segment>{q.hints}</Segment> : null}
                </Form>
              </Segment>
            ) : (
              <Segment padded>
                <Grid centered>
                  <Spinner color='#1456ff' name='circle' />{' '}
                </Grid>
              </Segment>
            )}
            <Segment>
              <Segment basic>
                <Grid columns={3} stackable>
                  <Grid.Column>
                    <Button
                      primary
                      fluid
                      onClick={e => {
                        if (i > 0) {
                          history.push(`/question/${cid}/${i - 1}`)
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
                        history.push(`/question/${this.props.cid}`)
                      }}
                      disabled={!(i > 0)}
                    >
                      Back
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      primary
                      fluid
                      onClick={e => {
                        if (i < 99) {
                          this.reset()
                          history.push(`/question/${cid}/${parseInt(i) + 1}`)
                        }
                      }}
                      disabled={!(i < 99)}
                    >
                      Next Question
                    </Button>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment>
          </Segment>
        ) : null}
      </div>
    )
  }
}
export default NewTest

import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Login from './components/login'
import AdminDashboard from './components/AdminDashboard'

import history from './components/history'
import { instanceOf } from 'prop-types'
import RegisterPage from './components/register'
import ForgotPage from './components/forgot'
import { Cookies, withCookies } from 'react-cookie'
import _ from 'lodash'
import io from 'socket.io-client'
import CoordinatorDashboard from './components/CoordinatorDashboard';

let socket = io('localhost:2000')
class Root extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor (props) {
    super(props)
    const { cookies } = this.props

    if (cookies.get('email') != null && cookies.get('isLoggedIn')) {
      socket.emit('det', {
        email: cookies.get('email'),
        pass: cookies.get('pass')
      })
      console.log('emitted details')
    }
    this.state = {
      isLoggedIn: cookies.get('isLoggedIn') || false,
      err: cookies.get('err') || null,
      details: cookies.get('details') || {},
      email: cookies.get('email') || null,
      documents: cookies.get('documents') || null,
      categories: cookies.get('categories') || null,
      level: cookies.get('level') || null,
      fail: '',
      catError: '',
      topError: '',
      catSuccess: 'none',
      topSuccess: 'none',
      topics: []
    }
    this.emit = this.emit.bind(this)
    this.logout = this.logout.bind(this)
    this.mainEmit = this.mainEmit.bind(this)
    this.setLoading = this.setLoading.bind(this)
  }

  logout (props) {
    const { cookies } = this.props
    cookies.remove('err')
    cookies.remove('isLoggedIn')
    cookies.remove('details')
    cookies.remove('documents')
    cookies.remove('categories')
    cookies.remove('email')
    cookies.remove('pass')
    cookies.remove('level')
    this.setState = {
      isLoggedIn: false,
      details: {},
      categories: [],
      email: null,
      topics: []
    }
  }
  mainEmit (name, data) {
    const { cookies } = this.props
    socket.emit(name, data)
    this.setState({ email: data.email })
    cookies.set('email', data.email)
    cookies.set('pass', data.pass)
  }
  emit (name, data) {
    socket.emit(name, data)
  }
  componentDidMount (props) {
    const { cookies } = this.props
    const { categories } = this.state
    let topics = []
    _.map(categories, c => {
      c.topics.map(t => {
        topics.push({ tid: t.id, name: t.name, cid: c._id })
      })
    })
    topics = _.sortBy(topics, 'tid', 'asc')
    console.log(topics, categories)
    this.setState({ topics: topics })
    socket.on('validateLogin', content => {
      // console.log(content)
      cookies.set('err', content.condition)
      cookies.set('isLoggedIn', content.validate)
      cookies.set('details', content.details)
      cookies.set('level', content.level)
      this.setState({
        level: content.level,
        isLoggedIn: content.validate,
        err: content.condition,
        details: content.details,
        fail: ''
      })
    })
    socket.on('fail', reason => {
      this.setState({ fail: reason })
    })
    socket.on('details', content => {
      cookies.set('details', content)
      this.setState({ details: content })
    })
    socket.on('documents', content => {
      cookies.set('documents', content)
      this.setState({ documents: content })
    })
    socket.on('catError', error => {
      console.log('error', error)
      this.setState({ catError: error })
      error != '' ? this.setState({ catSuccess: 'none' }) : null
    })
    socket.on('topError', error => {
      console.log(error)
      this.setState({ topError: error })
      error != '' ? this.setState({ topSuccess: 'none' }) : null
    })
    socket.on('success', type => {
      type == 'category' ? this.setState({ catSuccess: 'success' }) : null
      type == 'topic' ? this.setState({ topSuccess: 'success' }) : null
    })
    socket.on('categories', cats => {
      console.log(cats)
      topics = []
      _.map(cats, c => {
        c.topics.map(t => {
          topics.push({ tid: parseInt(t.id), name: t.name, cid: c._id })
        })
      })
      topics = _.sortBy(topics, 'tid', 'asc')
      this.setState({ categories: cats, topics: topics })
    })
  }
  setLoading (type) {
    let newState = this.state
    console.log(newState)
    newState[type] = 'load'
    this.setState(newState)
  }
  render () {
    return (
      <Router history={history}>
        {this.state.isLoggedIn
          ? <Switch>
            <Route
              path='/'
              render={() => this.state.level == 2 ? (
                <AdminDashboard
                  md={this.state.details.details}
                  level={this.state.level}
                  emit={this.emit}
                  faculties={this.state.details.faculties}
                  categories={this.state.categories}
                  history={this.props.history}
                  logout={this.logout}
                  details={this.state.details}
                  catError={this.state.catError}
                  topError={this.state.topError}
                  topics={this.state.topics}
                  catSuccess={this.state.catSuccess}
                  setLoading={this.setLoading}
                  topSuccess={this.state.topSuccess}
                  />
                ) : this.state.level == 1 ? (
                  <CoordinatorDashboard
                  md={this.state.details.details}
                  level={this.state.level}
                  emit={this.emit}
                  faculties={this.state.details.faculties}
                  categories={this.state.categories}
                  history={this.props.history}
                  logout={this.logout}
                  details={this.state.details}
                  catError={this.state.catError}
                  topError={this.state.topError}
                  topics={this.state.topics}
                  catSuccess={this.state.catSuccess}
                  setLoading={this.setLoading}
                  topSuccess={this.state.topSuccess}
                  />
                ) : null}
              />
          </Switch>
          : <Switch>
            <Route
              path='/register'
              render={() => <RegisterPage emit={this.emit} />}
              />
            <Route
              path='/forgot'
              render={() => <ForgotPage emit={this.emit} />}
              />
            <Route
              path='/'
              render={() => (
                <Login fail={this.state.fail} emit={this.mainEmit} />
                )}
              />
          </Switch>}
      </Router>
    )
  }
}
Root = withCookies(Root)
export default Root

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import History from './history'
import Queries from './queries'
import Attempted from './attempted'
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
  GridRow,
  Card,
  GridColumn
} from 'semantic-ui-react'
import history from './history'
import { localPoint } from '@vx/event'
import { Pie } from '@vx/shape'
import { Group } from '@vx/group'

import { withTooltip, Tooltip } from '@vx/tooltip'
import _ from 'lodash'

const white = '#888888'
const black = '#000000'

const usage = d => d.usage

class StudentDashboard extends React.Component {
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
    this.handleTooltip = this.handleTooltip.bind(this)
  }
  handleTooltip ({ event, da }) {
    const { showTooltip } = this.props
    const { x, y } = localPoint(event)

    showTooltip({
      tooltipData: { ...da },
      tooltipLeft: x,
      tooltipTop: y
    })
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
    let width = 600

    let height = 600

    let margin = { top: 10, bottom: 10, right: 10, left: 10 }
    let {
      md: det,
      topics,
      categories,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events,
      qs
    } = this.props

    let data = []
    qs.map((k, i) => {
      data.push({
        label: k.n,
        usage: 1,
        name: `Question ${k.n}`,
        state: k.a,
        ind: i
      })
    })

    let tl = _.toArray(topics).length
    const radius = Math.min(width, height) / 2
    const centerY = height / 2
    const centerX = width / 2

    let cl = _.toArray(categories).length

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
            <Segment basic style={{ height: '700px' }}>
              <Segment
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <svg height={height} width={width}>
                  <Group top={centerY - margin.top} left={centerX}>
                    <Pie
                      data={data}
                      pieValue={usage}
                      outerRadius={radius - radius / 3}
                      innerRadius={radius - radius / 6}
                      cornerRadius={0}
                      padAngle={0}
                    >
                      {pie => {
                        return pie.arcs.map((arc, i) => {
                          const opacity = 1
                          const [centroidX, centroidY] = pie.path.centroid(arc)
                          const { startAngle, endAngle } = arc
                          const hasSpaceForLabel = endAngle - startAngle >= 0.1
                          return (
                            <g key={`browser-${arc.data.label}-${i}`}>
                              <a
                                href={`/question/${arc.data.ind}`}
                                onClick={e => {
                                  e.preventDefault()
                                  history.push(`/question/${arc.data.ind}`)
                                }}
                              >
                                <path
                                  d={pie.path(arc)}
                                  fill={
                                    arc.data.state == 0
                                      ? '#1456ff'
                                      : arc.data.state == 1
                                        ? '#ff3262'
                                        : arc.data.state == 2
                                          ? '#00ef5f'
                                          : '#ffe500'
                                  }
                                  stroke='#fff'
                                  strokeLinecap='square'
                                  strokeLinejoin='bevel'
                                  fillOpacity={opacity}
                                  onMouseMove={event =>
                                    this.handleTooltip({
                                      event,
                                      da: {
                                        content: arc.data.name,
                                        bgc:
                                          arc.data.state == 0
                                            ? 'red'
                                            : arc.data.state == 1
                                              ? 'yellow'
                                              : 'green',
                                        color:
                                          arc.data.state == 0
                                            ? 'white'
                                            : 'black'
                                      }
                                    })
                                  }
                                  onMouseLeave={event => hideTooltip()}
                                />
                              </a>
                            </g>
                          )
                        })
                      }}
                    </Pie>
                  </Group>
                  <Group
                    top={centerY - margin.top}
                    left={centerX}
                    width={200}
                    height={40}
                  >
                    <text text-anchor='middle' className='center-label'>
                      eSkill Sample
                    </text>
                  </Group>
                </svg>
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

export default withTooltip(StudentDashboard)

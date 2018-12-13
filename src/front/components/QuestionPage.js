import React, { Component } from "react";
import { Link } from "react-router-dom";
import History from "./history";
import Queries from "./queries";
import Attempted from "./attempted";
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
} from "semantic-ui-react";
import history from "./history";
import { localPoint } from "@vx/event";
import { Pie } from "@vx/shape";
import { Group } from "@vx/group";

import { withTooltip, Tooltip } from "@vx/tooltip";
import _ from "lodash";

const white = "#888888";
const black = "#000000";

const usage = d => d.usage;

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false,
      filter: props.categories
    };
    this.logout = this.logout.bind(this);
    this.emit = this.emit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTooltip = this.handleTooltip.bind(this);
  }
  handleTooltip({ event, da }) {
    const { showTooltip } = this.props;
    const { x, y } = localPoint(event);

    showTooltip({
      tooltipData: { ...da },
      tooltipLeft: x,
      tooltipTop: y
    });
  }
  handleClick() {
    this.setState({ visible: !this.state.visible });
  }

  logout() {
    this.props.logout();
  }
  componentDidMount() {}
  emit(name, obj) {
    this.props.emit(name, obj);
  }

  render() {
    let width = 600;

    let height = 600;
    let margin = { top: 10, bottom: 10, right: 10, left: 10 };
    let { md: det, topics, categories, hideTooltip, qs, cat, cid } = this.props;
    let data = [];

    if (qs[cat] != undefined && cat != "") {
      console.log(qs);
      data = qs[cat].q.map((k, i) => {
        return {
          label: k.n,
          usage: 1,
          name: `Question ${k.n}`,
          state: k.a,
          ind: i
        };
      });
    }

    const radius = Math.min(width, height) / 2;
    const centerY = height / 2;
    const centerX = width / 2;

    return (
      <div>
        <Segment
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center"
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
                    const opacity = 1;
                    const [centroidX, centroidY] = pie.path.centroid(arc);
                    const { startAngle, endAngle } = arc;
                    const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                    return (
                      <g key={`browser-${arc.data.label}-${i}`}>
                        <a
                          href={`/question/${this.props.cid}/${arc.data.ind}`}
                          onClick={e => {
                            e.preventDefault();
                            history.push(
                              `/question/${this.props.cid}/${arc.data.ind}`
                            );
                          }}
                        >
                          <path
                            d={pie.path(arc)}
                            fill={
                              arc.data.state == 0
                                ? "#1456ff"
                                : arc.data.state == 1
                                ? "#ff3262"
                                : arc.data.state == 2
                                ? "#00ef5f"
                                : "#ffe500"
                            }
                            stroke="#fff"
                            strokeLinecap="square"
                            strokeLinejoin="bevel"
                            fillOpacity={opacity}
                            onMouseMove={event =>
                              this.handleTooltip({
                                event,
                                da: {
                                  content: arc.data.name,
                                  bgc:
                                    arc.data.state == 0
                                      ? "red"
                                      : arc.data.state == 1
                                      ? "yellow"
                                      : "green",
                                  color: arc.data.state == 0 ? "white" : "black"
                                }
                              })
                            }
                            onMouseLeave={event => hideTooltip()}
                          />
                        </a>
                      </g>
                    );
                  });
                }}
              </Pie>
            </Group>
            <Group
              top={centerY - margin.top}
              left={centerX}
              width={200}
              height={40}
            >
              <text textAnchor="middle" className="center-label">
                eSkill Sample
              </text>
            </Group>
          </svg>
        </Segment>
      </div>
    );
  }
}

export default withTooltip(QuestionPage);

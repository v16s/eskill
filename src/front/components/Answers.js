import React, { Component } from 'react'
import { Form, Grid, Segment, Input } from 'semantic-ui-react'
import Latex from 'react-latex'
class Answers extends Component {
  state = {}
  render () {
    let { correct, options } = this.props
    return (
      <Segment>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Grid column={2}>

                <Grid.Column>
                  <Segment
                    inverted={correct === 'a'}
                    color={correct === 'a' ? 'green' : null}
                  >
                    {' '}<Latex>{options.a}</Latex>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid column={2}>

                <Grid.Column>
                  <Segment
                    inverted={correct === 'b'}
                    color={correct === 'b' ? 'green' : null}
                  >
                    <Latex>{options.b}</Latex>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Grid column={2}>

                <Grid.Column>
                  <Segment
                    inverted={correct === 'c'}
                    color={correct === 'c' ? 'green' : null}
                  >
                    <Latex>{options.c}</Latex>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Grid column={2}>

                <Grid.Column>
                  <Segment
                    inverted={correct === 'd'}
                    color={correct === 'd' ? 'green' : null}
                  >
                    <Latex>{options.d}</Latex>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Answers

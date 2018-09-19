import React, { Component } from 'react';
import {Form, Grid, Segment, Input} from 'semantic-ui-react'
class Answers extends Component {
    state = {  }
    render() { 
        let {correct, options} = this.props
        return ( <Segment> 
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Grid column={2}>
                    
                    <Grid.Column>
                     <Segment inverted={correct==='a'} color={correct==='a' ? 'green' : null}>{options.a}</Segment>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                  <Grid column={2}>
                    
                    <Grid.Column>
                    <Segment inverted={correct==='b'} color={correct==='b' ? 'green' : null}>{options.b}</Segment>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Grid column={2}>
                    
                    <Grid.Column>
                    <Segment inverted={correct==='c'} color={correct==='c' ? 'green' : null}>{options.c}</Segment>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                  <Grid column={2}>
                    
                    <Grid.Column>
                    <Segment inverted={correct==='d'} color={correct==='d' ? 'green' : null}>{options.d}</Segment>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment> );
    }
}
 
export default Answers;
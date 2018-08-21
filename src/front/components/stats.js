import React from 'react'
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
  Modal
} from 'semantic-ui-react'
class Categories extends React.Component {
  render () {
    return (
        <Grid.Column >
        <Segment basic
        style={{
          minHeight: '100%',
          alignSelf: 'flex-start',
          width: '100%'
        }}>
        <Grid>
            <Grid.Column width={4}>
            <Segment raised
        style={{
          minHeight: '100%',
          width: '100%'
          
        }}>
        <Grid>
        <Grid.Column width={10}><Header size='medium' textAlign='left'>Total Categories</Header></Grid.Column>
        <Grid.Column width={5} floated='right'><Header size='medium' textAlign='right'>5</Header></Grid.Column>
        </Grid>
        </Segment>
        
            </Grid.Column>

            <Grid.Column width={4}>
            <Segment raised
        style={{
          minHeight: '100%',
          width: '100%'
        }}>
        <Grid>
        <Grid.Column width={10}><Header size='medium' textAlign='left'>Total Categories</Header></Grid.Column>
        <Grid.Column width={5} floated='right'><Header size='medium' textAlign='right'>5</Header></Grid.Column>
        </Grid>
        </Segment>
        
            </Grid.Column>

             <Grid.Column width={4}>
             <Segment raised
        style={{
          minHeight: '100%',
          width: '100%'
        }}>
        <Grid>
        <Grid.Column width={10}><Header size='medium' textAlign='left'>Total Categories</Header></Grid.Column>
        <Grid.Column width={5} floated='right'><Header size='medium' textAlign='right'>5</Header></Grid.Column>
        </Grid>
        </Segment>
        
            </Grid.Column>

             <Grid.Column width={4}>
             <Segment raised
        style={{
          minHeight: '100%',
          width: '100%'
        }}>
        <Grid>
        <Grid.Column width={10}><Header size='medium' textAlign='left'>Total Categories</Header></Grid.Column>
        <Grid.Column width={5} floated='right'><Header size='medium' textAlign='right'>5</Header></Grid.Column>
        </Grid>
        </Segment>
        
            </Grid.Column>



        </Grid>
        </Segment>
        </Grid.Column>
    )
  }
}

export default Categories

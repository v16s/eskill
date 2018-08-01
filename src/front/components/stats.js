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
        <Segment raised 
        style={{
          minHeight: '100%',
          alignSelf: 'flex-start',
          width: '100%'
        }}>
        <Grid>
            <Grid.Column width={4}>
            <Segment basic 
        style={{
          minHeight: '100%',
          alignSelf: 'flex-start',
          width: '100%'
        }}/>
        
            </Grid.Column>

            <Grid.Column width={4}>
            <Segment basic 
        style={{
          minHeight: '100%',
          alignSelf: 'flex-start',
          width: '100%'
        }}/>
            </Grid.Column>

             <Grid.Column width={4}>
            <Segment basic 
        style={{
          minHeight: '100%',
          alignSelf: 'flex-start',
          width: '100%'
        }}/>
            </Grid.Column>

             <Grid.Column width={4}>
            <Segment basic 
        style={{
          minHeight: '100%',
          alignSelf: 'flex-start',
          width: '100%'
        }}/>
            </Grid.Column>



        </Grid>
        </Segment>
        </Grid.Column>
    )
  }
}

export default Categories

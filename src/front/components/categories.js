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
      <Grid.Column width={8}>
        <Segment>
          <Segment basic>
            <Input fluid size='large' placeholder='Add Category'>
              <input
                style={{
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}
              />
              <Button
                primary
                style={{
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px'
                }}
              >
                <Icon
                  name='add'
                  style={{
                    margin: '0',
                    opacity: '1'
                  }}
                />
              </Button>
            </Input>

          </Segment>
          <Segment basic>
            <Input fluid size='large' placeholder='Add Topic'>
              <input
                style={{
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}
              />
              <Button
                primary
                style={{
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px'
                }}
              >
                <Icon
                  name='add'
                  style={{
                    margin: '0',
                    opacity: '1'
                  }}
                />
              </Button>
            </Input>

          </Segment>
        </Segment>
      </Grid.Column>
    )
  }
}

export default Categories

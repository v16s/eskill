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
class Configuration extends React.Component {
  render () {
    return (
      <Grid.Column width={8}>
        <Segment>
          <Segment basic>
            <Input fluid size='large' placeholder='Number of digits in Faculty ID'>
              <input
                
              />
              <input  placeholder='Number of digits in Student ID'
                style={{
                  marginLeft: '5px',
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
              <Dropdown
                placeholder='Select Category'
                selection
                className='category-select'
                options={[
                  {
                    text: 'Category 1',
                    value: 'c1'
                  },
                  {
                    text: 'Category 2',
                    value: 'c2'
                  },
                  {
                    text: 'Category 3',
                    value: 'c3'
                  }
                ]}
                style={{
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}
              />
              <input
                style={{
                  borderRadius: '0px'
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
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Topic ID</Table.HeaderCell>
                  <Table.HeaderCell>Topic</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>101</Table.Cell>
                  <Table.Cell>Topic 1</Table.Cell>
                  <Table.Cell>Category 1</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>102</Table.Cell>
                  <Table.Cell>Topic 2</Table.Cell>
                  <Table.Cell>Category 1</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>201</Table.Cell>
                  <Table.Cell>Topic 3</Table.Cell>
                  <Table.Cell>Category 2</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
        </Segment>
      </Grid.Column>
    )
  }
}

export default Configuration

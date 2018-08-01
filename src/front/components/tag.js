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
class Tag extends React.Component {
  render () {
    return (
      <Grid.Column width={8}>
        <Segment>
          
          <Segment basic>
          <Header size='large' textAlign='center'>Add New Tag</Header>
            <Input fluid size='large' placeholder='Tag Name'>
              <Dropdown
                placeholder='Choose Group'
                selection
                className='category-select'
                options={[
                  {
                    text: 'Company',
                    value: 'c1'
                  },
                  {
                    text: 'Exam',
                    value: 'c2'
                  },
                  {
                    text: 'Subject',
                    value: 'c3'
                  },
                  {
                    text: 'Topic',
                    value: 'c4'
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
                  <Table.HeaderCell>Tag ID</Table.HeaderCell>
                  <Table.HeaderCell>Tag Name</Table.HeaderCell>
                  <Table.HeaderCell>Group Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>101</Table.Cell>
                  <Table.Cell>GATE</Table.Cell>
                  <Table.Cell>Exam</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>102</Table.Cell>
                  <Table.Cell>TOEFL</Table.Cell>
                  <Table.Cell>Exam</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>201</Table.Cell>
                  <Table.Cell>Wipro</Table.Cell>
                  <Table.Cell>Company</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
        </Segment>
      </Grid.Column>
    )
  }
}

export default Tag
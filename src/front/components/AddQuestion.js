import React from 'react'
import _ from 'lodash'
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
  Form,
  Grid,
  Dropdown,
  Pagination,
  Modal
} from 'semantic-ui-react'
import Spinner from 'react-spinkit'
class AddQuestion extends React.Component {
  constructor (props) {
    super(props)
  }
  handleChange (e) {
    console.log(e)
  }
  render () {
    return (
      <Grid.Column>
        <Form>
          <Segment>
            <Segment basic>
              <Form.Field>
                <label>Select Category</label>
                <Dropdown
                  fluid
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
                />
              </Form.Field>
            </Segment>
            <Segment basic>
              <Form.Field>
                <label>Question Name</label>
                <Input fluid size='large' placeholder='Question Name'>
                  <input />
                </Input>
              </Form.Field>
            </Segment>

            <Segment basic>
              <Form.Field>
                <label>Question Description</label>
                <Input
                  fluid
                  size='large'
                  placeholder='Question Description'
                  onChange={e => {
                    this.handleChange(e)
                  }}
                >
                  <input />
                </Input>
              </Form.Field>
            </Segment>

            <Segment basic>
              <Input fluid size='large' placeholder='Question Name'>
                <input />
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
              <Form.Field>
                <label>Equation</label>
                <Input fluid size='large'>
                  <input />
                  <Button
                    primary
                    content='Add Equation'
                    style={{
                      borderTopLeftRadius: '0px',
                      borderBottomLeftRadius: '0px'
                    }}
                  />
                  <Button primary content='Latex Guide' />
                </Input>
              </Form.Field>
            </Segment>

            <Segment basic>
              <Form.Field>
                <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column>
                          <Form.Radio />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Search...' size='small' />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column>
                          <Form.Radio />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Search...' size='small' />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column>
                          <Form.Radio />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Search...' size='small' />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column>
                          <Form.Radio />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Search...' size='small' />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Segment basic>
                <Form.Group widths='equal'>
                  <Dropdown
                    fluid
                    placeholder='Select Category'
                    selection
                    className='category-select'
                    options={[
                      { text: 'Hello', value: 1 },
                      { text: 'Hello', value: 2 },
                      { text: 'Hello', value: 3 }
                    ]}
                  />
                  <Form.Field>
                    <Input fluid size='large'>
                      <input type='file' />
                    </Input>
                  </Form.Field>
                </Form.Group>
              </Segment>
              <Segment>
                <Grid columns={4} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Dropdown
                        fluid
                        placeholder='Select Category'
                        selection
                        className='category-select'
                        options={[
                          { text: 'Hello', value: 1 },
                          { text: 'Hello', value: 2 },
                          { text: 'Hello', value: 3 }
                        ]}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Dropdown
                        fluid
                        placeholder='Select Category'
                        selection
                        className='category-select'
                        options={[
                          { text: 'Hello', value: 1 },
                          { text: 'Hello', value: 2 },
                          { text: 'Hello', value: 3 }
                        ]}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Dropdown
                        fluid
                        placeholder='Select Category'
                        selection
                        className='category-select'
                        options={[
                          { text: 'Hello', value: 1 },
                          { text: 'Hello', value: 2 },
                          { text: 'Hello', value: 3 }
                        ]}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Dropdown
                        fluid
                        placeholder='Select Category'
                        selection
                        className='category-select'
                        options={[
                          { text: 'Hello', value: 1 },
                          { text: 'Hello', value: 2 },
                          { text: 'Hello', value: 3 }
                        ]}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Segment basic>
                  <Form.Field>
                    <Input fluid size='large'>
                      <input />
                    </Input>
                  </Form.Field>
                </Segment>
                <Segment basic>
                  <Form.Field>
                    <label>Hints for description</label>
                    <Input fluid size='large' placeholder='Question Name'>
                      <input />
                    </Input>
                  </Form.Field>
                </Segment>

                <Button fluid color='green'>Add Question</Button>

              </Segment>
            </Segment>

          </Segment>

        </Form>
      </Grid.Column>
    )
  }
}

export default AddQuestion

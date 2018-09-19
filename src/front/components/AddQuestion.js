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
import Answers from './Answers'
import Preview from './Preview'
import Select from 'react-select'
import Spinner from 'react-spinkit'
import makeAnimated from 'react-select/lib/animated';
class AddQuestion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: props.categories,
      selCat: null,
      previewData: 'Question Description with an equation: $x^2 + 2x = 0$',
      name: 'Question Name',
      value: '',
      options: {
        a: 'Option A',
      b: 'Option B',
      c: 'Option C',
      d: 'Option D'
    }
    }
    this.catSelector = React.createRef()
    this.qname = React.createRef()
    this.qdef = React.createRef()
    this.exams = React.createRef()
    this.company = React.createRef()
    this.skill = React.createRef()
    this.topic = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePreviewChange = this.handlePreviewChange.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    nextState.categories = nextProps.categories

    return true
  }
  componentDidMount() {
    
    
  }
  handleChange (e) {
    console.log({
      category: this.catSelector.current.state.value.label,
      qname: this.qname.current.inputRef.value,
      qdef: this.qdef.current.inputRef.value,
      exams: this.exams.current.state.value,
    })
  }
  handleRadio (e, { value }) {
    this.setState({ value })
  }
  handlePreviewChange(e) {
    this.setState({previewData: e.target.value})
  }
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleAnswer(e, opt) {
    let {options} = this.state
    options[opt] = e.target.value
    this.setState({options: options})
  }
  render () {
    let {value} = this.state
    return (
      <Grid.Column>
        <Form onSubmit={this.handleChange}>
          <Segment>
            <Segment basic>
              <Form.Field required>
                <label>Select Category</label>
                <Select
                ref={this.catSelector}
                components={makeAnimated()}
                  options={[
                    {
                      label: 'Category 1',
                      value: 'c1'
                    },
                    {
                      label: 'Category 2',
                      value: 'c2'
                    },
                    {
                      label: 'Category 3',
                      value: 'c3'
                    }
                  ]}
                />
              </Form.Field>
            </Segment>
            <Segment basic>
              <Form.Field>
                <label>Question Name</label>
                <Input onChange={this.handleNameChange} ref={this.qname} fluid size='large' placeholder='Question Name'>
                  <input />
                </Input>
              </Form.Field>
            </Segment>

           <Segment basic style={{
             display: 'flex',
             flexDirection: 'column'
           }}>
              <Form.Field>
                <label>Question Description</label>
                <Input fluid size='large' >
                  <textarea onChange={this.handlePreviewChange} placeholder="Question Description with an equation: $x^2 + 2x = 0$"/>
                  
                  
                </Input>
              </Form.Field>
              <Button fluid basic primary content='Latex Guide' style={{alignSelf: 'flex-end'}}/>
            </Segment>


              <Preview desc={this.state.previewData} name={this.state.name}/>
            <Segment basic>
              <Form.Field>
                <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column className='radio-column'>
                          <Form.Radio
                          value='a'
                          checked={value == 'a'}
                          onChange={this.handleRadio}
                           />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Option A' size='small' onChange={e => this.handleAnswer(e, 'a')} />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column className='radio-column'>
                          <Form.Radio 
                            value='b'
                          checked={value == 'b'}
                          onChange={this.handleRadio}
                          />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Option B' size='small' onChange={e => this.handleAnswer(e, 'b')} />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column className='radio-column'>
                          <Form.Radio 
                            value='c'
                          checked={value == 'c'}
                          onChange={this.handleRadio}
                          />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Option C' size='small' onChange={e => this.handleAnswer(e, 'c')} />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>
                      <Grid column={2}>
                        <Grid.Column className='radio-column'>
                          <Form.Radio 
                            value='d'
                          checked={value == 'd'}
                          onChange={this.handleRadio}
                          />
                        </Grid.Column>
                        <Grid.Column className='input-column'>
                          <Input placeholder='Option D' size='small' onChange={e => this.handleAnswer(e, 'd')} />
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Answers correct={value} options={this.state.options} />
              <Segment basic>
                <Form.Group widths='equal'>
                  <Dropdown
                    fluid
                    placeholder='Select Level'
                    selection
                    className='category-select'
                    options={[
                      { text: 'Level 1', value: 1 },
                      { text: 'Level 2', value: 2 },
                      { text: 'Level 3', value: 3 }
                    ]}
                  />
                  <Form.Field>
                    <Input fluid size='large'>
                      <input type='file' />
                    </Input>
                  </Form.Field>
                </Form.Group>
              </Segment>
              <Segment basic>
                <Grid columns={4} divided>
                  <Grid.Row>
                    <Grid.Column>
                    <Select
                    placeholder='Exams'
                    isMulti
                ref={this.exams}
                components={makeAnimated()}
                        options={[
                    {
                      label: 'Exam 1',
                      value: 'e1'
                    },
                    {
                      label: 'Exam 2',
                      value: 'e2'
                    },
                    {
                      label: 'Exam 3',
                      value: 'e3'
                    }
                        ]}
                      />
                    </Grid.Column>
                    <Grid.Column>
                    <Select
                    isMulti
                ref={this.company}
                components={makeAnimated()}
                placeholder='Companies'
                        options={[
                    {
                      label: 'Company 1',
                      value: 'cm1'
                    },
                    {
                      label: 'Company 2',
                      value: 'cm2'
                    },
                    {
                      label: 'Company 3',
                      value: 'cm3'
                    }
                        ]}
                      />
                    </Grid.Column>
                    <Grid.Column>
                    <Select
                    isMulti
                ref={this.skill}
                components={makeAnimated()}
                placeholder='Skills'
                        options={[
                    {
                      label: 'Skill 1',
                      value: 's1'
                    },
                    {
                      label: 'Skill 2',
                      value: 's2'
                    },
                    {
                      label: 'Skill 3',
                      value: 's3'
                    }
                        ]}
                      />
                    </Grid.Column>
                    <Grid.Column>
                    <Select
                    isMulti
                ref={this.topic}
                components={makeAnimated()}
                placeholder='Topics'
                        options={[
                    {
                      label: 'Topic 1',
                      value: 't1'
                    },
                    {
                      label: 'Topic 2',
                      value: 't2'
                    },
                    {
                      label: 'Topic 3',
                      value: 't3'
                    }
                        ]}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
               
               

                
              </Segment>
             
                  <Form.Field>
                    <label>Hints for description</label>
                    <Input fluid size='large' placeholder='Question Name'>
                      <input />
                      
                    </Input>
                  </Form.Field>
                
              <Segment></Segment>
              <Segment basic>
              <Form.Button fluid primary>Add Question</Form.Button>
              </Segment>
            </Segment>

          </Segment>

        </Form>
      </Grid.Column>
    )
  }
}

export default AddQuestion

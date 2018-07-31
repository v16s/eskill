import React from 'react';
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
  } from "semantic-ui-react";
class Categories extends React.Component {
    render() { 
        return ( 
            <Grid.Column width={8}>
                  <Segment>
                  <Input
                    fluid
                    size="large"
                    icon="add"
                    placeholder="Add Category"
                  />
                  <Input
                    fluid
                    size="large"
                    icon="add"
                    placeholder="Add Topic"
                  />
                  </Segment>
                </Grid.Column>
         );
    }
}
 
export default Categories;
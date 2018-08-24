import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './ListServices.jsx';
import { Grid, Image, Button, Dropdown } from 'semantic-ui-react';
import _ from 'lodash'
import { } from 'semantic-ui-react'


const caseSensitiveSearch = (options, query) => {
  const re = new RegExp(_.escapeRegExp(query))
}

const options = [
  { key: 'a', value: 'a', text: 'UPPERCASE' },
  { key: 'b', value: 'b', text: 'lowercase' },
]

const DropdownExampleCustomSearchFunction = () => (
  <Dropdown
    fluid
    options={options}
    placeholder={'Try to search for case or CASE'}
    search={caseSensitiveSearch}
    selection
  />
)




const BrownGrid = () => (
  <Grid celled>
    <Grid.Row>
      <Grid.Column width={2}>
        <Image circular src='brown3_lrge.png' />
      </Grid.Column>
      <Grid.Column width={14}>
        <input type="text" />
        <DropdownExampleCustomSearchFunction/>
         <Button inverted color='brown' content='Search...' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={6}>
        10 Recently Added IOCs
      </Grid.Column>
      <Grid.Column width={10}>
        table would appear here
      </Grid.Column>
    </Grid.Row>
  </Grid>
)



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    }
  }


  componentDidMount() {
    $.ajax({
      url: '/monitor',
      success: (data) => {
        this.setState({
          services: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (<div>
      <BrownGrid />
      <h1>Item List</h1>
      <List services={this.state.services}/>
    </div>)
  }
}

export default App
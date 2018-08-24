import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './ListServices.jsx';
import { Grid, Image, Button, Dropdown } from 'semantic-ui-react';
import _ from 'lodash'
import { } from 'semantic-ui-react'
import TableSelectableRow from './TableSelectableRow.jsx'

const caseSensitiveSearch = (options, query) => {
  const re = new RegExp(_.escapeRegExp(query))
}

const case_options = [
  { key: 'a', value: 'a', text: 'all' },
  { key: 'b', value: 'b', text: 'case-abc' },
  { key: 'c', value: 'c', text: 'case-mini' },
]

const type_options = [
  { key: 'a', value: 'a', text: 'all' },
  { key: 'b', value: 'b', text: 'ip' },
  { key: 'c', value: 'c', text: 'domain' },
  { key: 'c', value: 'c', text: 'os-version' },
]
const DropdownExampleCustomSearchFunction = (props) => (
  <Dropdown

    options={props.options}
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
        <input type="text" id="fname" name="fname" />
        <DropdownExampleCustomSearchFunction options={case_options}/>
         <Button inverted color='brown' content='Search...' />

        <DropdownExampleCustomSearchFunction options={type_options}/>
         <Button inverted color='brown' content='Search...' />
      </Grid.Column>

    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={10}>
        table would appear here
        <TableSelectableRow />
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
    </div>)
  }
}

export default App
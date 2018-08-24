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
      <Grid.Column width={3}>
        <Image src='../../client/dist/brown3_lrge.png' />
      </Grid.Column>
      <Grid.Column width={13}>
        <input type="text" />
        <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
         <Button inverted color='brown' content='Search...' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <DropdownExampleCustomSearchFunction/>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
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
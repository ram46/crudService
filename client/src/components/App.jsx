import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './ListServices.jsx';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import _ from 'lodash'
import { } from 'semantic-ui-react'
import TableSelectableRow from './TableSelectableRow.jsx'
import BrownGrid from './BrownGrid.jsx'

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
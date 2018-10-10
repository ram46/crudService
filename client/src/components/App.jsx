import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BrownGrid from './BrownGrid.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (<div>
      <BrownGrid />
    </div>)
  }
}

export default App
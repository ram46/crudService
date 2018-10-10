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
  var logo = <img src="https://localhost:7777/brownlogo.png" height="200" width="400"/>
    return (<div>
      {logo}
      <BrownGrid />
    }
    </div>)
  }
}

export default App

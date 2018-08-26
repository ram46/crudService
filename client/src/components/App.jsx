import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Monitor from './Monitor.jsx';
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
      {/* <Monitor /> */}
    </div>)
  }
}

export default App
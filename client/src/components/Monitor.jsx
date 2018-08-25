import React from 'react';
import $ from 'jquery';

class Monitor extends React.Component {
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
      {this.state.services}
    </div>)
  }
}

export default Monitor
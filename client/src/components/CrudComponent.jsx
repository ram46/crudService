import React from 'react';
import {Grid, Image, Button, Form} from 'semantic-ui=react';


class CrudComponent extends React.Component {
  constructor() {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputJSONValidator = this.inputJSONValidator.bind(this);
  }

  this.state = {
    inputData: [],
    resultView: false,
    outputData: []
  }


  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) this.handleClick(e)
  }

  handleClick() {
    this.setState({
      resultView: !this.state.resultView
    })
  }

  handleChange() {
    this.setState({
      inputData: e.target.value
    })
  }

  render() {
    var button;
    var content;
    return null
  }

}


export default CrudComponent;



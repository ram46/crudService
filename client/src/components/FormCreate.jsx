import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import $ from 'jquery';


class FormCreate extends React.Component {
  constructor(props) {

  super(props);

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);

  this.state = {
    completed: false,
    inputData: [],
    outputData: null,
  }

}

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) this.handleSubmit(e)
  }

  handleChange(e) {
    this.setState({
      inputData: e.target.value
    })
  }


  handleSubmit(e) {
    self = this;
    $.ajax({
      url:'/createioc',
      method: 'POST',
      data: {data: this.state.inputData},
      context: self,
      success: (data) => {
        console.log("IN SUCCESS BLOCK");
        this.setState({
          outputData: 'success'
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
    console.log('just submitted')
  }

  render() {
    return (
      <Form unstackable>
        <Form.Group widths={2}>
          <Form.Input control='textarea' rows='10' label='Create IOC' placeholder='[{"ioc":"1.1.1.1", "type":"ip", "case":"brown", "analyst":"nancy", "notes":"potentially used in CnC"}, {...}, {...}]' onChange={this.handleChange}/>
        </Form.Group>
        <Button type='submit' onClick={this.handleSubmit} onKeyPress={this.handleKeyPress}>Submit</Button>
      </Form>
    )
  }
}

export default FormCreate;




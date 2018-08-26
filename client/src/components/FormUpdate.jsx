import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import $ from 'jquery';
import CrudComponent from './CrudComponent.jsx'


class FormUpdate extends CrudComponent {
  constructor(props) {
    super(props);
  }

  ajaxCall(endpoint) {
    $.ajax({
      url: endpoint,
      method: 'POST',
      data: {query: this.state.inputData},
      context: self,
      success: (data) => {
        this.setState({
          outputData: data
        })
      },

      error: (err) => {
        this.setState({
          outputData: err
        })
      }
    })
  }

 handleClick(e) {
    // extending the handleClick method of parent
    super.handleClick(e) // this will set the 'resultView' state

    // building on top of the parent's handleClick
    if (e.target.id === 'submitBtn') {
      this.ajaxCall('/updateioc')
    }
  }

  render() {
    var content;
    var button;

    if (!this.state.resultView) {
      button = <Button className={this.state.buttonStatus} type='submit' id="submitBtn" onClick={this.handleClick} >Submit</Button>
      content = <Form unstackable> <Form.Group widths={2}> <Form.Input onChange={this.handleChange} style={this.state.textAreaStyle} control='textarea' rows='10' label='Update IOC' placeholder='{"newValues": {"ioc": "88.2.2","type": "ip" }, "where": { "id": 6}}' /> </Form.Group> {button} </Form>
    }


    if (this.state.resultView) {
      button = <Button type="submit" id="backButton" onClick={this.handleClick}> Back </Button>
      content = <div> <p> {this.state.outputData} </p> {button} </div>
    }

    return (
      <div> {content} </div>
      )
    }
  }

 export default FormUpdate;



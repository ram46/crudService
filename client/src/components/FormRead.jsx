import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import TableRows from './TableRows.jsx';
import $ from 'jquery';
import CrudComponent from './CrudComponent.jsx'


class FormRead extends CrudComponent {
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
        console.log(data)
      },

      error: (err) => {
        console.log(err)
      }
    })
  }

 handleClick(e) {
    e.preventDefault();
    // extending the handleClick method of parent
    super.handleClick(e) // this will set the 'resultView' state

    // building on top of the parent's handleClick
    if (e.target.id === 'submitBtn') {
      this.ajaxCall('/readioc')
    }
  }

   render () {
    var button;
    var content;

    if (!this.state.resultView) {
      button = <Button className={this.state.buttonStatus} type="submit" id="submitBtn" onClick={this.handleClick}> Submit </Button>

      content = <Form unstackable>  <Form.Group widths={2}> <Form.Input style={this.state.textAreaStyle}  id="inputbox" control="textarea" rows="5" label="Read IOC"  placeholder='{"type":"domain"}' onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> </Form.Group> {button} </Form>
     }

    if (this.state.resultView)
    {
      button = <Button type="submit" id="backBtn" onClick={this.handleClick}> Back </Button>
      content = <div> <TableRows iocs={this.state.outputData}/> {button} </div>
    }

    return (
      <div> {content} </div>
      )
    }
  }

 export default FormRead;










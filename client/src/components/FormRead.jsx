import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import TableRows from './TableRows.jsx';
import $ from 'jquery';

class FormRead extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputJSONValidator = this.inputJSONValidator.bind(this)

    this.state = {
      inputData: [],
      tableView: false,
      outputData: [],
      classname: 'invalidJSON',
      buttonStatus: 'disabled'
    }
  }


  inputJSONValidator() {
    var input = this.state.inputData;
    try {
      JSON.parse(input)
      this.setState({
        classname: 'validJSON',
        buttonStatus: 'enabled'
      })
    }

    catch(e) {
      this.setState({
        classname: 'invalidJSON',
        buttonStatus: 'disabled'
      })
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) this.handleClick(e)
  }

  handleClick(e) {

    var self = this;

    this.setState({
      tableView: !this.state.tableView
    })

    if (e.target.id === 'submitBtn') {
      $.ajax({
        url: '/readioc',
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
  }

  handleChange(e) {

    this.setState({
      inputData: e.target.value
    })


    this.inputJSONValidator()

  }


  render () {

    var button;
    var content;

    if (!this.state.tableView) {
      button = <Button className={this.buttonStatus} type="submit" id="submitBtn" onClick={this.handleClick}> Submit </Button>

      content = <Form unstackable>  <Form.Group widths={2}> <Form.Input className={this.state.classname}  id="inputbox" control="textarea" rows="5" label="Read IOC" required placeholder='{"type":"domain"}' onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> </Form.Group> {button} </Form>
     }

    if (this.state.tableView)
    {
      button = <Button type="submit" id="submitBtn" onClick={this.handleClick}> Back </Button>
      content = <div> <TableRows iocs={this.state.outputData}/> {button} </div>
    }

    return (
        <div> {content} </div>
      )
    }
  }


export default FormRead;


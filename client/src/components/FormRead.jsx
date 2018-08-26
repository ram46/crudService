// import React from 'react';
// import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
// import TableRows from './TableRows.jsx';
// import $ from 'jquery';

// class FormRead extends React.Component {

//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleKeyPress = this.handleKeyPress.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//     this.inputJSONValidator = this.inputJSONValidator.bind(this)

//     this.state = {
//       inputData: [],
//       tableView: false,
//       outputData: [],
//       classname: 'invalidJSON',
//       buttonStatus: 'disabled'
//     }
//   }


//   inputJSONValidator() {
//     var input = this.state.inputData;
//     try {
//       JSON.parse(input)
//       this.setState({
//         classname: 'validJSON',
//         buttonStatus: 'enabled'
//       })
//     }

//     catch(e) {
//       this.setState({
//         classname: 'invalidJSON',
//         buttonStatus: 'disabled'
//       })
//     }
//   }

//   handleKeyPress(e) {
//     if (e.keyCode === 13 || e.which === 13) this.handleClick(e)
//   }

//   handleClick(e) {

//     var self = this;

//     // set the state in both cases whether a back button or a submit button is clicked
//     this.setState({
//       tableView: !this.state.tableView
//     })

//     if (e.target.id === 'submitBtn') {
//       $.ajax({
//         url: '/readioc',
//         method: 'POST',
//         data: {query: this.state.inputData},
//         context: self,
//         success: (data) => {
//           this.setState({
//             outputData: data
//           })
//           console.log(data)
//         },

//         error: (err) => {
//           console.log(err)
//         }

//       })
//     }
//   }

//   handleChange(e) {

//     this.setState({
//       inputData: e.target.value
//     })


//     this.inputJSONValidator()

//   }


//   render () {

//     var button;
//     var content;

//     if (!this.state.tableView) {
//       button = <Button className={this.buttonStatus} type="submit" id="submitBtn" onClick={this.handleClick}> Submit </Button>

//       content = <Form unstackable>  <Form.Group widths={2}> <Form.Input className={this.state.classname}  id="inputbox" control="textarea" rows="5" label="Read IOC" required placeholder='{"type":"domain"}' onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> </Form.Group> {button} </Form>
//      }

//     if (this.state.tableView)
//     {
//       button = <Button type="submit" id="backBtn" onClick={this.handleClick}> Back </Button>
//       content = <div> <TableRows iocs={this.state.outputData}/> {button} </div>
//     }

//     return (
//       <div> {content} </div>
//       )
//     }
//   }


// export default FormRead;






import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import TableRows from './TableRows.jsx';
import $ from 'jquery';
import CrudComponent from './CrudComponent.jsx'


class FormRead extends CrudComponent {
  constructor(props) {
    super(props)
    this.endpoint = '/readioc'

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

      content = <Form unstackable>  <Form.Group widths={2}> <Form.Input className={this.state.classname}  id="inputbox" control="textarea" rows="5" label="Read IOC" required placeholder='{"type":"domain"}' onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> </Form.Group> {button} </Form>
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










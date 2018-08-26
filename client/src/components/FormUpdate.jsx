import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import $ from 'jquery';


class FormUpdate extends React.Component {
  constructor(props) {

  super(props);

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);

  this.state = {
    completed: false,
    inputData: null,
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
      url:'/updateioc',
      method: 'POST',
      data: {data: this.state.inputData},
      context: self,
      success: (data) => {
        debugger
        console.log("IN SUCCESS BLOCK OF UPDATE");
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


       var content = <Form unstackable>
        <Form.Group widths={2}>
          <Form.Input control='textarea' rows='10' label='Update IOC' placeholder='{ type: file, where:{id: 7} }' onChange={this.handleChange}/>
        </Form.Group>
        <Button type='submit' onClick={this.handleSubmit} onKeyPress={this.handleKeyPress}>Submit</Button>
      </Form>


    return (

      content

    )
  }
}

export default FormUpdate;

// import React from 'react';
// import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
// import $ from 'jquery';
// import FormRead from './FormRead.jsx';

// class FormUpdate extends FormRead {
//   constructor(props) {
//     super(props);
//     console.log("hehehehehehe")
//     console.log(this.inputJSONValidator.toString())
//   }
// }

// export default FormUpdate;















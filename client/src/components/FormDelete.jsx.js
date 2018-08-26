import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import FormUpdate from './FormUpdate.jsx';


class FormDelete extends FormUpdate {

  contructor(props) {
  }



  handleClick(event) {
    var self = this;

    // toggle the view in both cases whether a back button or a submit button is clicked
    this.setState({
      resultView: !this.state.resultView
    })

    this.callAPI('deleteioc')
  }


}


export default FormDelete;
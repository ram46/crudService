import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';


class FormRead extends React.Component {

  constructor(props) {
    super(props)
  }



  render () {
    return (
      <Form unstackable>
        <Form.Group widths={2}>
          <Form.Input control='textarea' rows='5' label='Read IOC' placeholder='{"type":"domain"}' />
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>
      )
    }
  }





export default FormRead;
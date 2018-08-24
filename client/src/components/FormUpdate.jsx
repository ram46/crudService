import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';


const FormUpdate = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='10' label='Update IOC' placeholder='[{"id":"71281621", "notes":"updated notes"}, {"id":"3321", "case": "brownie"}]' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)



export default FormUpdate;
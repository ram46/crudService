import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';


const FormDelete = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='10' label='Delete IOC' placeholder='[{"id":"1213432"},{"type":"unknown"}]' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)


export default FormDelete;
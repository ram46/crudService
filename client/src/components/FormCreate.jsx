import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';


const FormCreate = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='10' label='Create IOC' placeholder='[{"ioc":"1.1.1.1", "type":"ip", "case":"brown", "analyst":"nancy", "notes":"potentially used in CnC"}, {...}, {...}]' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)



export default FormCreate;
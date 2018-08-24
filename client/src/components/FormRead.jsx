import React from 'react';


class FormRead extends React.Component() {

return (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='5' label='Read IOC' placeholder='{"type":"domain"}' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
  )
}





export default FormRead;
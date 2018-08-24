
import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import _ from 'lodash'
import { } from 'semantic-ui-react'


const FormCreate = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='10' label='Create IOC' placeholder='[{"ioc":"1.1.1.1", "type":"ip", "case":"brown", "analyst":"nancy", "notes":"potentially used in CnC"}, {...}, {...}]' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)



const FormRead = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='5' label='Read IOC' placeholder='{"type":"domain"}' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)


const FormUpdate = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='10' label='Update IOC' placeholder='[{"id":"71281621", "notes":"updated notes"}, {"id":"3321", "case": "brownie"}]' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)


const FormDelete = () => (
  <Form unstackable>
    <Form.Group widths={2}>
      <Form.Input control='textarea' rows='10' label='Delete IOC' placeholder='[{"id":"1213432"},{"type":"unknown"}]' />
    </Form.Group>
    <Button type='submit'>Submit</Button>
  </Form>
)



const BrownGrid = () => (
  <Grid columns={2} divided celled>
    <Grid.Row>
      <Grid.Column>
        <Image src='brown3_lrge.png' size='small' circular />
        <FormCreate />
      </Grid.Column>
      <Grid.Column>
        <Image src='brown3_lrge.png' size='small' circular/>
        <FormRead />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Image src='brown3_lrge.png' size='small' circular/>
        <FormUpdate />
      </Grid.Column>
      <Grid.Column>
        <Image src='brown3_lrge.png' size='small' circular/>
        <FormDelete />
      </Grid.Column>
    </Grid.Row>
  </Grid>

)


export default BrownGrid

import React from 'react';
import { Grid, Image, Button, Dropdown, Form } from 'semantic-ui-react';
import _ from 'lodash';
import { } from 'semantic-ui-react';
import FormRead from './FormRead.jsx';
import FormUpdate from './FormUpdate.jsx';
import FormCreate from './FormCreate.jsx';
import FormDelete from './FormDelete.jsx';





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
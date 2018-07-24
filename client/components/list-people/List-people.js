import React from 'react';
import Grid from 'react-css-grid';
import { Button } from 'react-toolbox/lib/button';

const markInfectedButton = infected => <Button label='Mark as infected' disabled={infected}></Button>;

const getList = people => people.map((person, index) =>
  <Grid
    width={160}
    gap={24}
    align-items
    key={index}>
  <div>{person.name}</div>
  <div>{person.age}</div>
  <div>{person.gender}</div>
  <div>{person['infected?'] ? 'Infected' : 'Normal'}</div>
  <div>
    {markInfectedButton(person['infected?'])}
  </div>
  </Grid>
);

const ListPeople = ({ people }) =>
  <div>
    <Grid
      width={160}
      gap={24}
      align-items>
      <div>Name</div>
      <div>Age</div>
      <div>Gender</div>
      <div>Status</div>
      <div></div>
    </Grid>
    {getList(people)}
  </div>;

export default ListPeople;
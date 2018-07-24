import React from 'react';

import { Button } from 'react-toolbox/lib/button';
import Grid from 'react-css-grid'

const Header = () =>
  <Grid
    width={320}
    gap={24}
    align-items>
    <div>Survivor's list</div>
    <div>
      <Button label='Add survivors' raised primary></Button>
    </div>
  </Grid>;

export default Header;

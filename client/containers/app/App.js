import React from 'react';
import { inject, observer } from 'mobx-react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import Header from '../../components/header/Header';
import ListPeople from '../../components/list-people/List-people';
// import btn from 'styles.css';

const App = ({ people }) => {
  if (!people.fetchingData) {
    return <div>
      <Header/>
      <ListPeople people={people.toJSON().people}/>
    </div>;
  }
  
  return <ProgressBar type='circular' mode='indeterminate' />;
};

export default inject('people')(observer(App));

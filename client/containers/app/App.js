import React from 'react';
import { inject, observer } from 'mobx-react';
// import btn from 'styles.css';

const App = ({ people }) => {
  if (!people.fetchingData) {
    return <div>
      <pre>
        {JSON.stringify(people.toJSON().people, null, 2) };
        </pre>
    </div>;
  }
  
  return <p>Aguarde ...</p>;
};

export default inject('people')(observer(App));

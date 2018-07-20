import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import PeopleStore from './stores/people';
import App from './containers/app/App';

const peopleStore = PeopleStore.create();
peopleStore.fetchPeople();

const store = {
  people: peopleStore
};

const router = (
  <Provider {...store}>
    <div>
      <App />
    </div>
  </Provider>
);

render(router, document.getElementById('root'));

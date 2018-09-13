import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import PeopleStore from './stores/people';
import App from './containers/app/App';

const peopleStore = PeopleStore.create();

const store = {
  peopleStore
};

const router = (
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);

render(router, document.getElementById('root'));

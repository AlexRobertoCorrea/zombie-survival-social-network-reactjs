import axios from 'axios';

const fetchPeopleApi = () => {
  const url = 'http://zssn-backend-example.herokuapp.com/api/people.json';
  
  return axios.get(url).then(response =>
    response.data.map(person => ({
      ...person,
      created_at: new Date(person.created_at),
      updated_at: new Date(person.updated_at)
    })));
};

export { fetchPeopleApi };

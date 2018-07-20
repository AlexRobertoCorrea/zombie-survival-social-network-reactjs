import axios from 'axios';

const fetchPeopleApi = () => {
  const url = 'http://zssn-backend-example.herokuapp.com/api/people.json';
  
  return axios.get(url).then(response =>
    response.data.map(person => ({
      location: person.location,
      name: person.name,
      age: person.age,
      gender: person.gender,
      lonlat: person.lonlat,
      created_at: new Date(person.created_at),
      updated_at: new Date(person.updated_at),
      infected: person['infected?']
    })));
};

export { fetchPeopleApi };
import axios from 'axios';

const baseUrl = 'http://zssn-backend-example.herokuapp.com/api/people';

const createPersonApi = (person) => {
  const url = `${baseUrl}.json`;
  
  return axios.post(url, person).then(response => ({
    data: response.data,
    status: response.status
  }));
};

const fetchPeopleApi = () => {
  const url = `${baseUrl}.json`;
  
  return axios.get(url).then(response =>
    response.data.map(person => ({
      ...person,
      created_at: new Date(person.created_at),
      updated_at: new Date(person.updated_at)
    })));
};

const markPersonInfectedApi = (personId, delatorId) => {
  const url = `${baseUrl}/${delatorId}/report_infection.json`;
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  const data = {
    infected: personId
  };
  
  return axios.post(url, data, config).then(response => ({
    status: response.status
  }));
};

export {
  createPersonApi,
  fetchPeopleApi,
  markPersonInfectedApi
};

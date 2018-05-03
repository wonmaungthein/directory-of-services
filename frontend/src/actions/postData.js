import axios from 'axios';

const api = 'http://localhost:3002/api' || `${process.env.API_URL}/api`;

function addOrganisation(data) {
  const saveOrganisation = () =>
    axios.post(`${api}/service/organisation/add`, data).then(res => res);
  return saveOrganisation
}

export default {
  addOrganisation
}

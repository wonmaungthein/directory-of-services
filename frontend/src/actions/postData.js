import axios from 'axios';

const api = 'http://localhost:3002/api' || `${process.env.API_URL}/api`;

export default function editOrganisation(data) {
  const saveOrganisation = () =>
   axios.patch(`${api}/service/organisation/edit`, data).then(res => res);
  return saveOrganisation
}

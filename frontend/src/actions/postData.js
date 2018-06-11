import axios from 'axios';

const api = process.env.REACT_APP_API_URL || process.env.REACT_APP_LOCALHOST_API_URL;

export function addOrganisation(data) {
  const saveOrganisation = () =>
    axios.post(`${api}/service/organisation/add`, data).then(res => res);
  return saveOrganisation
}

export function editOrganisation(data) {
  const saveOrganisation = () =>
    axios.patch(`${api}/service/organisation/edit`, data).then(res => res);
  return saveOrganisation
}

export function getBranchesFilteredByPost(data) {
  const sendInfo = () =>
    axios.post(`${api}/service/postcode`, data)
      .then(response => response)
      .catch(error => error.response);
  return sendInfo
}

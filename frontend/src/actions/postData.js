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

export function getBranchesFilteredByPostCode(data) {
  const sendInfo = async () => {
    try {
      const res = await axios.post(`${api}/service/postcode`, data)
      return res;
    } catch (err) {
      return err;
    }
  }
  return sendInfo
}

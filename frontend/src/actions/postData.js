import axios from 'axios';

const api = process.env.REACT_APP_API_URL || process.env.REACT_APP_LOCALHOST_API_URL;

export function addOrganisation(data) {
  const saveOrganisation = async () => {
    try {
      const res = await axios.post(`${api}/service/organisation/add`, data);
      return res;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  return saveOrganisation
}

export function editOrganisation(data) {
  const saveOrganisation = async () => {
    try {
      const res = await axios.patch(`${api}/service/organisation/edit`, data);
      return res;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  return saveOrganisation
}

export function requestRestPassword(data) {
  const requestFun = async () => {
    try {
      const res = await axios.post(`${api}/forgot`, data)
        .catch(err => err.response)
      return res;
    } catch (error) {
      return JSON.stringify(error)
    }
  }
  return requestFun
}

export function requestChangePassword(data) {
  const requestFun = async () => {
    try {
      const res = await axios.post(`${api}/reset/:token`, data);
      return res;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  return requestFun
}

export function validateToken(token) {
  const requestFun = async () => {
    try {
      const res = await axios.get(`${api}/reset/${token}`);
      return res;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  return requestFun
}

export function getBranchesFilteredByPostCode(data) {
  const sendInfo = async () => {
    try {
      const res = await axios.post(`${api}/service/postcode`, data);
      return res;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  return sendInfo
}

export function deleteBranch(data) {
  const { orgId, branchId } = data;
  const sendInfo = async () => {
    try {
      const res = await axios
      .delete(`${api}/service/organisation/delete/?orgId=${orgId}&&branchId=${branchId}`);
      return res.data;
    } catch (error) {
      let errMessage = JSON.stringify(error);
      errMessage = JSON.parse(errMessage).response.data
      return errMessage;
    }
  }
    return sendInfo
}

export function deleteUser(userId) {
  const sendInfo = async () => {
    try {
      const res = await axios.delete(`${api}/users/${userId}`);
      return res.data;
    } catch (error) {
      let errMessage = JSON.stringify(error);
      errMessage = JSON.parse(errMessage).response.data;
      return errMessage;
    }
  }
  return sendInfo
}

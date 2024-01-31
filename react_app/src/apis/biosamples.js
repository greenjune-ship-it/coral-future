import axios from 'axios';

const fetchBiosamples = async (backendUrl) => {
  try {
    const response = await axios.get(`${backendUrl}/api/biosamples`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchBiosamples };
import axios from 'axios';

const fetchBiosamples = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchBiosamples };
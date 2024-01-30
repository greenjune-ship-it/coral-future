import axios from 'axios';

const checkAuthentication = async (backendUrl) => {
  try {
    const response = await axios.get(`${backendUrl}/api/auth/status`, {
      withCredentials: true,
    });

    const { username, authenticated } = response.data;

    return {
      username: username,
      authenticated: authenticated,
    };
  } catch (error) {
    new Error(error.message);
  }
};

export { checkAuthentication };

import { useEffect } from 'react';
import { fetchBiosamples } from 'apis/biosamples';

const useFetchBiosamples = (backendUrl, setBiosamples) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const biosamplesData = await fetchBiosamples(backendUrl);
        setBiosamples(biosamplesData);
        console.log('Fetched BioSamples', biosamplesData)
      } catch (error) {
        console.error('Error fetching BioSamples:', error);
      }
    };

    fetchData();
  }, [backendUrl, setBiosamples]);
};

export default useFetchBiosamples;

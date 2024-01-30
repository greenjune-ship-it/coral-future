const filterBioSamples = (biosamples, filters) => {

  const { species, temperature, year } = filters;
  let filteredData = biosamples;

  // Apply species filter if it is present
  if (species !== '') {
    console.log('Applying species filter:', species);
    filteredData = filteredData.filter(biosample => {
      return biosample.species === species;
    });
    console.log('After species filter:', filteredData);
  }

  // Apply year filter if it is present
  if (year !== '') {
    console.log('Applying year filter:', year);
    filteredData = filteredData.filter(biosample => {
      return biosample.year === year;
    });
    console.log('After year filter:', filteredData);
  }

  console.log('Final filtered data:', filteredData);
  return filteredData;
};

export default filterBioSamples;

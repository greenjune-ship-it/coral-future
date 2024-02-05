const filterBioSamples = (filters, biosamples) => {
  // To load all biosamples when Map is loaded the first time
  if (filters && Object.keys(filters).length === 0) {
    return biosamples
  }

  if (!filters.species) {
    // If species filter is not provided, return all biosamples
    return biosamples;
  } else {
    // Filter biosamples based on selected species
    return biosamples.filter(biosample =>
      filters.species.includes(biosample.species)
    );
  }
};

export default filterBioSamples;
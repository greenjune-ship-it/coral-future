function filterColonies(filters, colonies) {
  // Make a copy of colonies array
  let filteredColonies = colonies.slice();

  // No species and no project - return all colonies
  if (!filters.species && !filters.project) {
    filteredColonies = colonies;
  }

  // Both species and project filters are empty - return all colonies
  if (filters.species === '' && filters.project === '') {
    filteredColonies = colonies;
  }

  if (filters.species && filters.species !== '') {
    filteredColonies = filteredColonies.filter(colony => colony.species === filters.species);
  }

  if (filters.project && filters.project !== '') {
    // Filter colonies based on related projects
    filteredColonies = filteredColonies.filter(colony => {
      // Check if any of the colony's projects include the specified project name
      return colony.projects.includes(filters.project);
    });
  }

  if (filters.temperatures && !filters.temperatures.includes(Infinity) && !filters.temperatures.includes(-Infinity)) {
    // Filter colonies based on temperature
    filteredColonies = filteredColonies.filter(colony => {
      // Check if the colony's temperature is within the specified range
      return colony.ed50_value >= filters.temperatures[0] && colony.ed50_value <= filters.temperatures[1];
    });
  }

  return filteredColonies;
}

export default filterColonies;

function filterColonies(filters, colonies) {
  // Make a copy of colonies array
  let filteredColonies = colonies.slice();

  // Case 1: No species and no project - return all colonies
  if (!filters.species && !filters.project) {
    return colonies;
  }

  // Case 2: Both species and project filters are empty - return all colonies
  if (filters.species === '' && filters.project === '') {
    return colonies;
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

  return filteredColonies;
}

export default filterColonies;

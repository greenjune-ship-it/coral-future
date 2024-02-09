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
    filteredColonies = filteredColonies.filter(colony => colony.project === filters.project);
  }

  return filteredColonies;
}

export default filterColonies;

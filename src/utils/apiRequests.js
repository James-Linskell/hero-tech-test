import axios from "axios";

/**
 * Request to get planets from SWAPI
 */
export const getPlanets = async () => {
  return axios.get("https://swapi.dev/api/planets/")
  .then(response => {
    // Access parsed JSON response data using response.data field
    const data = response.data
    // Return the list of planets
    return data.results;
  })
  .catch(error => {
    if (error.response) {
      // Get HTTP error code
      console.log(error.reponse.status)
    } else {
      console.log(error.message)
    }
  })
};
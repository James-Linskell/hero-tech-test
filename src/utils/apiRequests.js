import axios from "axios";

/**
 * Request to get planets from SWAPI
 * @param  {UUID} workflowId Id of workflow
 * @param  {Object} workflowRunBody workflow body object
 * @return {Response}  response data from endpoint
 */
export const getPlanets = async () => {
  return axios.get("https://swapi.dev/api/planets/")
  .then(response => {
    // access parsed JSON response data using response.data field
    const data = response.data
    return data.results;
  })
  .catch(error => {
    if (error.response) {
      //get HTTP error code
      console.log(error.reponse.status)
    } else {
      console.log(error.message)
    }
  })
};
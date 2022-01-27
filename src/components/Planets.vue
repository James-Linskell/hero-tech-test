<template>
  <div>
    <div class="container">
      <!-- The table -->
      <v-simple-table v-if="planets.length > 0 && planetHeaders.length > 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Climate
              </th>
              <th class="text-left">
                Residents
              </th>
              <th class="text-left">
                Terrain
              </th>
              <th class="text-left">
                Population
              </th>
              <th class="text-left">
                Area Covered by Water
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="planet in planets"
              :key="planet.name"
            >
              <td class="text-left"><a :href="planet.url" target="_blank" rel="noopener noreferrer">{{ formatString(planet.name) }}</a></td>
              <td class="text-left">{{ formatString(planet.climate) }}</td>
              <td class="text-left">{{ formatNumbers(planet.residents.length) }}</td>
              <td class="text-left">{{ formatString(planet.terrain) }}</td>
              <td class="text-left">{{ formatNumbers(planet.population) }}</td>
              <td class="text-left">{{ calculateSurfaceArea(planet) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div v-else-if="errorStatus">
        <v-card style="padding: 60px;">
          <h1>
            ERROR
          </h1>
          <h3 style="margin-top: 40px;">
            Planet loading failed
          </h3>
        </v-card>
      </div>
      <div v-else>
        <v-card style="padding: 60px;">
          <h1>
            Loading planets...
          </h1>
        <v-progress-circular indeterminate color="blue" size="200" width="20" style="margin: 40px;"></v-progress-circular>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import { getPlanets } from "../utils/apiRequests";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: false,
      planets: [],
      planetHeaders: [],
      errorStatus: false,
    }
  },
  methods: {
    // Load planets from SWAPI
    loadPlanets() {
      // Set loading spinner running
      this.isLoading = true;
      // Fetch planets
      getPlanets().then((response => {
        if (response.length > 0) {
          // Get a sample of the headers from the first result
          const headers = Object.keys(response[0]);
          this.planetHeaders = this.formatHeaders(headers);
          this.planets = this.sortAlphabetically(response);
          console.log(response);
          // Set loading to finished
          this.isLoading = false;
        }
      })).catch(() => {
        // Set error status to true so error page shows
        this.errorStatus = true;
        console.log("ERROR");
      });
    },
    // Sort planet objects alphabetically by name
    sortAlphabetically(planets) {
      // List of names for sorting alphabetcally
      const planetNames = [];
      // Dictionary with planet names as keys, to access the objects by name
      const planetsToSort = [];
      // List of sorted planet objects
      const sortedPlanets = [];

      // Collect the planet names and format the dictionary
      planets.forEach(planet => {
        planetNames.push(planet.name);
        planetsToSort[planet.name] = planet;
      })
      // Sort the planet names
      planetNames.sort();
      // Sort the planet objects in order by name
      planetNames.forEach(name => {
        sortedPlanets.push(planetsToSort[name]);
      })

      return sortedPlanets;
    },
    // Formats the headers and capitalises them for the v-table
    formatHeaders(headers) {
      const formattedHeaders = [];
      headers.forEach(header => {
        formattedHeaders.push({
          text: header.charAt(0).toUpperCase() + header.slice(1),
          value: header
        })
      })

      return formattedHeaders;
    },
    // Calculates the surface area assuming spherical planets
    calculateSurfaceArea(planet) {
      // Surface area = 4(pi)*r^2 * %water
      if (planet.diameter == "unknown" || planet.surface_water == "unknown") {
        return "?";
      } else {
        return Math.round(4 * Math.PI * (Math.pow(planet.diameter / 2, 2)) * (planet.surface_water / 100));
      }
    },
    // Formats numbers to "?" if the number is "unknown"
    formatNumbers(number) {
      if (number == "unknown") {
        return "?";
      } else {
        // Regex to split numbers into groups of 3 digits with commas
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    // Formats strings to "?" if the string is "unknown"
    formatString(string) {
      if (string == "unknown") {
        return "?";
      } else {
        return string;
      }
    }
  },
  mounted() {
    // Attempts to load the planets on page load
    this.loadPlanets();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template {
  background-color: black;
}
.container {
  margin: 40px;
  text-align: center;
}
.loadingSpinner {
  height: 30vh;
  width: 30vh;
}
</style>

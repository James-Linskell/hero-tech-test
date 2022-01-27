<template>
  <div>
    <div class="data-table">
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
              <td class="text-left"><a :href="planet.url" target="_blank" rel="noopener noreferrer">{{ planet.name }}</a></td>
              <td class="text-left">{{ planet.climate }}</td>
              <td class="text-left">{{ planet.residents.length }}</td>
              <td class="text-left">{{ planet.terrain }}</td>
              <td class="text-left">{{ planet.population }}</td>
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
      console.log(this.isLoading);
      // Fetch planets
      getPlanets().then((response => {
        // Get a sample of the headers from the first result
        const headers = Object.keys(response[0]);
        this.planetHeaders = this.formatHeaders(headers);
        this.planets = response;
        // Set loading to finished
        this.isLoading = false;

        console.log(this.isLoading);
        console.log(response);
      })).catch(() => {
        this.errorStatus = true;
        console.log("ERROR");
      });
    },
    // Formats the headers and capitalises them for the v-table
    formatHeaders(headers) {
      const formattedHeaders = [];
      headers.forEach(header => {
        formattedHeaders.push({
          text: header.charAt(0).toUpperCase() + header.slice(1),
          value: header
        })
        console.log(header);
      })

      console.log(formattedHeaders);
      return formattedHeaders;
    },
    calculateSurfaceArea(planet) {
      console.log(planet.diameter);
      console.log(planet.surface_water);
      return "test";
    }
  },
  mounted() {
    this.loadPlanets();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template {
  background-color: black;
}
.data-table {
  margin: 40px;
  text-align: center;
}
.loadingSpinner {
  height: 30vh;
  width: 30vh;
}
</style>

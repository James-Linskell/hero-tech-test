<template>
  <div>
  <v-simple-table v-if="planets.length > 0 && planetHeaders.length > 0">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Terrain
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in planets"
          :key="item.name"
        >
          <td><a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }}</a></td>
          <td>{{ item.terrain }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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
    }
  },
  mounted() {
    this.loadPlanets();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

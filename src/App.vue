<template>
  <v-app >
    <v-main class="app">
      <Planets/>
    </v-main>
  </v-app>
</template>

<script>
import Planets from './components/Planets';

export default {
  name: 'App',

  components: {
    Planets,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.app {
  background-color: black;
}
</style>
<template>
  <v-app>
    <v-main>
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

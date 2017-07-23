<template lang="pug">
  .sprinkler
    .name {{sprinkler.name}}
    .actions
      .button(v-click="start" v-on:click="start(sprinkler.id)") Start
      .button(v-click="stop" v-on:click="stop(sprinkler.id)") Stop
</template>


<script>
import axios from 'axios'
export default {
  props: [
    'sprinkler'
  ],
  methods: {
    start: (id) => {
      return axios.get(`/api/sprinklers/${id}/start`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    stop: (id) => {
      return axios.get(`/api/sprinklers/${id}/stop`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>


<style scoped>
  .sprinkler {
    display: block;
    margin-bottom: 10px;
  }
  .name {
    font-size: 20px;
  }
</style>

<template lang="pug">
  .container
    nuxt-link(to="/")
      img(src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo")
    h1.title Sprinklers
    .sprinklers
      Sprinkler(v-for="sprinkler in sprinklers" :key="sprinkler.id" :sprinkler="sprinkler")
</template>

<script>
import axios from '~plugins/axios'
import Sprinkler from '~components/Sprinkler'
export default {
  head() {
    return {
      title: 'Sprinklers'
    }
  },
  data() {
    return {
      sprinklers: []
    }
  },
  asyncData ({ req }) {
    return axios(req).get('/sprinklers').
      then((response) => {
        return {sprinklers: response.data}
      })
      .catch((error) => {
        console.log(error)
      })
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  components: {
    Sprinkler
  }
}
</script>

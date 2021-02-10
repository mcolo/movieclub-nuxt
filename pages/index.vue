<template>
  <div class="container">
    <input type="text" name="search" :value="search" @keyup="autocomplete" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    autocomplete() {
      const body = JSON.stringify({ query: this.search })
      fetch('/.netlify/functions/autocomplete', {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        },
        body
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log('Request failed', error)
        })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

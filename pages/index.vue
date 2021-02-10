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
      alert(this.search)
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

<template>
  <div class="menu" >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand txt" href="#"><router-link to="/" >RateMyCourse</router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#"><router-link to="/">Home</router-link><span class="sr-only">(current)</span></a>
          </li><li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/admin">Admin</router-link><span class="sr-only"></span></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Universities
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a @click="reloadPage(university.id)" v-for="university in universities" v-bind:key="university.id" class="dropdown-item" href="#">{{university.name}}</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    universities() {
      return this.$root.$data.universities;
    }
  },
  methods: {
    async reloadPage(id) {
      this.$router.push(`/university/${id}/`);
      this.$router.go();
    }
  }
}
</script>

<style scoped>

</style>
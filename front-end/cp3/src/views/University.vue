<template>
<div class="content" :style="{'background-color': university.color}">

  <img :src="university.logo">
  <div class="main">
    <div class="description card card-body">
      <h1>{{ university.name }}</h1>
      <p>{{ university.description }}</p>
    </div>
    
    <div class="courses card card-body">
      <div class="card-body">
        <h3>Courses</h3>
        <hr>
        <div v-for="course in courses" v-bind:key="course.name">
          <router-link :to="{ name: 'Course', params: { uni_id: university.id, course_id: course.id }}">
            {{course.title}} {{course.number}} : {{course.name}}
          </router-link>
        </div>
      </div>
    </div>

  </div> <!-- End of main -->
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'University',
  data() {
    return {
      university: {},
      courses: [],
    }
  },
  created() {
    const id = this.$route.params.id;
    this.getUniversity(id);
  },
  methods: {
    async getUniversity(id) {
      this.$root.$data.universities = (await axios.get('/api/universities')).data;
      this.university = this.$root.$data.universities.find(university => university.id === id);
      if (this.university)
        await this.getCourses();
      // TODO: SHOW ERROR if !this.university
    },
    async getCourses() {
      this.courses = (await axios.get('/api/courses/' + this.university.id)).data;
    }
  }
}
</script>

<style scoped>

img {
  width: 15%;
  padding: 32px 0px;
}
.content {
  text-align: center;
}

.main {
  display: flex;
  justify-content: center;
}

.description {
  margin: 0px 24px;
  width: 50%;
}

.description p {
  margin-top: 16px;
}

.courses {
  margin: 0px 24px;
  width: 20%
}


@media only screen and (max-width: 901px) {
  .main {
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .description, .courses {
    width: 95%;
    margin: 16px 8px;
  }
}


</style>

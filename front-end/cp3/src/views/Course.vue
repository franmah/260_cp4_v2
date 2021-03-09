<template>
<div class="content">
  <div class="content" :style="{'background-color': university.color}">
    <div class="info-section">
      <div class="basic-info">
        <h1>{{course.title}} {{course.number}}</h1>
        <h3>{{course.name}}</h3>
        <p>{{course.description}}</p>
      </div>

      <div class="vertical-line" :style="{'border-color': university.color}"></div>

      <div class="sup-info">
        <h3>Information</h3>
        <ul>
          <li>Credits: {{course.credits}}</li>
          <li>Average rating: {{courseAverageRating}}/10</li>
          <li>Professors: {{professors}}</li>
        </ul>
      </div>
    </div>
    
    <div class="comment-section">
      <div class="card">
        <div class="card-body form">
          <button class="show-add-comment" type="submit" @click.prevent="showAddComment">{{showAddCommentText}}</button>
          <div v-if="shouldShowAddComment" class="form">
            <input type="text" placeholder="author" v-model="author">
            <input type="text" placeholder="professor" v-model="professor">
            <input type="text" placeholder="rating" v-model="rating">
            <textarea type="text" placeholder="comment" v-model="content"></textarea>
            <button type="submit" @click.prevent="addComment">Add Comment</button>
          </div>
        </div>
      </div>

      <div class="card" v-for="comment in comments" v-bind:key="comment.id">
        <div class="card-body">
          <div class="comment-icons">
            <i class="fas fa-times" @click.prevent="deleteComment(comment.id)"></i>
          </div>
          
          <h5 class="card-title">Author: {{comment.author}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Professor: {{comment.professor}}</h6>
          <p class="card-subtitle mb-2 text-muted">Rating: {{comment.rating}}</p>
          <p class="card-text">{{comment.comment}}</p>
        
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { v4 } from 'uuid';
export default {
  name: 'University',
  data() {
    return {
      course: {},
      university: {},
      comments: [],
      commentToEdit: {},
      showAddCommentText: 'Add comment',
      shouldShowAddComment: false,
      author: '',
      professor: '',
      rating: '',
      content: ''
    }
  },
  methods: {
    showAddComment() {
      this.shouldShowAddComment = !this.shouldShowAddComment;
      this.showAddCommentText = this.shouldShowAddComment ? 'Hide' : 'Add comment';
    },
    async getCourseInfo(universityId, courseId) {
      try {
        this.$root.$data.universities = (await axios.get('/api/universities')).data;
        this.university = this.$root.$data.universities.find(university => university.id === universityId);
        this.course = (await axios.get('/api/course/' + courseId)).data;
        this.comments = (await axios.get('/api/comments/' + courseId)).data;
      } catch (error) {
        JSON.stringify(error);
      }
    },
    async addComment() {
      try {
        if (this.rating > 10 || this.rating < 0)
          return; // TODO: show error

        const id = v4();
        const timestamp = Date();
        const response = await axios.post('/api/comment', { 
          comment: {
            author: this.author,
            professor: this.professor,
            rating: this.rating,
            comment: this.content,
            timestamp: timestamp,
            id: id,
            courseId: this.course.id,
          }
        });
        this.comments.push(response.data);

        this.author = '';
        this.professor = '';
        this.rating = '';
        this.content = '';
      } catch (error) {
        JSON.stringify(error);
      }
    },
    async deleteComment(commentId) {
      try {
        await axios.delete('/api/comment/' + commentId);
        this.comments = (await axios.get('/api/comments/' + this.course.id)).data;
      } catch (error) {
        JSON.stringify(error);
      }
    }
  },
  computed: {
    professors() {
      if (this.course && this.course.professors)
        return this.course.professors.reduce((total, professor) => total += ', ' + professor);
      return "";
    },
    courseAverageRating() {
      if (this.comments.length === 0)
        return "-";
      const totalRating = this.comments.reduce((total, comment) => total += parseInt(comment.rating), 0);
      return totalRating / this.comments.length;
    }

  },
  created() {
    const universityId = this.$route.params.uni_id;
    const courseId = this.$route.params.course_id;
    this.getCourseInfo(universityId, courseId);
  }
}
</script>


<style scoped>
.content {
  padding-bottom: 16px;
}

.info-section {
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 24px 0px;
}

.basic-info {
  text-align: center;
  width: 60%;
  padding-right: 32px;
}

.sup-info {
  padding-left: 32px;
  width: 25%;
}

.comment-section {
  padding: 32px 32px;
  width: 75%;
  margin: 0 auto;
}

.vertical-line {
  margin: 8px 0px;
  border-left: 2px solid;
}

.card {
  margin-bottom: 24px;
}

.form {
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.form input, textarea {
  margin-bottom: 8px;
}

.comment-icons {
  float: right;
}

.comment-icons i {
  margin: 0px 12px;
}

.comment-icons .fa-times {
  color: red;
}

.show-add-comment {
  margin-bottom: 16px;
  
}

@media only screen and (max-width: 901px) {
  .info-section {
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .basic-info, .sup-info {
    text-align: center;
    width: 95%;
    list-style-type: none !important;
    padding: 0px;
  }

  .comment-section {
    width: 95%;
    margin: 0 auto;
    margin-top: 16px;
    padding-bottom: 16px;
    padding: 0px;
  }

  button {
    width: 100%;
  }

  .form {
    width: 95%;
  }
}
</style>

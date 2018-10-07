<template>
  <div id="new-theme">
    <h3>New Theme</h3>
    <div class="row">
      <form @submit.prevent="saveTheme" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="title" required>
            <label>Theme Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="heroes" required>
            <label>Heroes</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="theme_id" required>
            <label>ID</label>
          </div>
        </div>
        <button type="submit" class="btn">Add Theme</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'new-theme',
  data() {
    return {
      theme_id: null,
      title: null,
      heroes: null
    }
  },
  methods: {
    saveTheme() {
      db.collection('themes').add({
        theme_id: this.theme_id,
        title: this.title,
        heroes: this.heroes,
      })
      .then(docRef => this.$router.push('/'))
      .catch(error => console.log(err))
    }
  }
}
</script>
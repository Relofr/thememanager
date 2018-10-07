<template>
  <div id="edit-theme">
    <h3>Edit Theme</h3>
    <div class="row">
      <form @submit.prevent="updateTheme" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="title" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="heroes" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="theme_id" required>
          </div>
        </div>
        <button type="submit" class="btn">Update Theme</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'edit-theme',
  data() {
    return {
      theme_id:  null,
      heroes: null,
      title: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection('themes').where('theme_id', '==', to.params.theme_id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.theme_id = doc.data().theme_id
          vm.heroes = doc.data().heroes
          vm.title = doc.data().title
          vm.completed = doc.data().completed
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      db.collection('themes').where
      ('theme_id', '==', this.$route.params.theme_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.theme_id = doc.data().theme_id
          this.heroes = doc.data().heroes
          this.title = doc.data().title
          this.completed = doc.data().completed
        })
      })
    },
    updateTheme() {
      db.collection('themes').where
      ('theme_id', '==', this.$route.params.theme_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            theme_id: this.theme_id,
            title: this.title,
            heroes: this.heroes
          })
          .then(() => {
            this.$router.push({
              name: 'view-theme',
              params: {
                theme_id: this.theme_id
              }
            })
          })
        })
      })
    },
  }
}
</script>
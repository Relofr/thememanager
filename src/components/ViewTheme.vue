<template>
  <div id="view-theme">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{ title }}</h4></li>
      <li class="collection-item">ID#: {{ theme_id }}</li>
      <li class="collection-item">{{ heroes }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteTheme" class="btn red">Delete Theme</button>

    <div class="fixed-action-btn">
      <router-link :to="{ name: 'edit-theme', params: {themes_id: theme_id} }" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>

  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'view-theme',
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
    deleteTheme() {
      if (confirm('Are you sure?')) {
        db.collection('themes').where
        ('theme_id', '==', this.$route.params.theme_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>
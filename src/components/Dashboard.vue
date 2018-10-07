<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Themes</h4></li>
      <li v-for="theme in themes" :key="theme.id" class="collection-item">
        #{{ theme.theme_id }}
        <div class="chip">
          {{ theme.title }}
        </div>
          {{ theme.heroes }}
        <router-link class="secondary-content" :to="{name: 'view-theme', params: {theme_id: theme.theme_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data() {
    return {
      themes: []
    }
  },
  created() {
    db.collection('themes').orderBy('theme_id').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'theme_id': doc.data().theme_id,
          'title': doc.data().title,
          'heroes': doc.data().heroes,
          'completed': doc.data().completed
        }
        this.themes.push(data)
      })
    })
  }
}
</script>
<template>
  <div class="container">
    <header class="hero">
      <h1>Studio Belmusic</h1>
      <p>Bienvenue au studio — réservez votre session.</p>
    </header>

    <section class="artists">
      <h2>Artistes</h2>
      <button v-on:click="toggleListArtists">Afficher les artistes</button>
      <div v-if="loading">Chargement...</div>
      <div v-else-if="artists.length === 0">
        <p>Liste d'artistes masquée</p>
      </div>
      <ul v-else>
        <li v-for="a in artists" :key="a.id_artist" class="artist-card">
          <h3>{{ a.Nom }} <small v-if="a['Prénom']">{{ a['Prénom'] }}</small></h3>
          <p>Email: {{ a.Email }}</p>
          <p>Type ID: {{ a.id_type_artist }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const artists = ref<Array<any>>([])
const loading = ref(true)
const showlist = ref(false)

async function toggleListArtists() {
  if (showlist.value){
    showlist.value = false
    artists.value = []
    return
  }
 
  try {
    // call the preload-exposed API
    const res = await window.api.getAllArtists()
    artists.value = res || []
    showlist.value = true

  } catch (err) {
    console.error('Erreur chargement artistes', err)
    artists.value = []
  } finally {
    loading.value = false
  }
  
  
}

</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 24px auto;
  padding: 0 16px;
  font-family: Inter, system-ui, Arial
}

.hero {
  background: linear-gradient(90deg, #0f172a, #0b1220);
  color: #fff;
  padding: 24px;
  border-radius: 8px
}

.artists {
  margin-top: 20px
}

.artist-card {
  list-style: none;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px
}

.artist-card h3 {
  margin: 0;
  font-size: 1.1rem
}

.artist-card p {
  margin: 4px 0;
  color: #374151
}
</style>
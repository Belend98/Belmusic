<template>
  <div class="container">
    <header class="hero">
      <h1>Studio Belmusic</h1>
      <p>Bienvenue au studio — réservez votre session.</p>
      <button @click="redirectCreate">Ajoute un utilisateur</button>
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
          <h3>{{ a.nom }} <small v-if="a.prenom">{{ a.prenom }}</small></h3>
          <p>Id: {{ a.id_artist }}</p>
          <p>Email: {{ a.email }}</p>
          <p>Type ID: {{ a.id_type_artist }}</p>
          <p>Blaze: {{ a.pseudo }}</p>
          <div class="card-actions">
            <RouterLink :to="`/update/${a.id_artist}`" class="action-btn edit-btn">Modifier</RouterLink>
            <button @click="deleteOne(a.id_artist)" class="action-btn delete-btn">Supprimer</button>
          </div>
        </li>

      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import Artist from 'src/shared/artist';
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router';

const artists = ref<Array<Artist>>([])
const loading = ref(true)
const showlist = ref(false)
const router = useRouter();

const redirectCreate = () => {
  router.push('/creation')
}

async function toggleListArtists() {
  if (showlist.value) {
    showlist.value = false
    artists.value = []
    return
  }

  try {
    // call the preload-exposed API
    const res = await window.api.artistService.getAllArtists();
    artists.value = res || []
    showlist.value = true

  } catch (err) {
    console.error('Erreur chargement artistes', err)
    artists.value = []
  } finally {
    loading.value = false
  }
}

async function deleteOne(id: number) {
  try {
    await window.api.artistService.deleteArtist(id);
    artists.value = await window.api.artistService.getAllArtists();

  }
  catch (error) {
    console.error(error)

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

ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 16px;
}

.artist-card {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.artist-card h3 {
  margin-top: 0;
}

.card-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.action-btn {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  font-family: inherit; /* Assure que le bouton utilise la même police */
  font-size: 14px;
}

.edit-btn {
  background-color: #4f46e5;
  color: white;
}

.edit-btn:hover {
  background-color: #4338ca;
}

.delete-btn {
  background-color: #dc2626;
  color: white;
}

.delete-btn:hover {
  background-color: #b91c1c;
}
</style>
<template>
  <div class="page-container">
    <header class="page-header">
      <h1>Gestion des Artistes</h1>
      <button class="btn-primary" @click="redirectCreate">
        <span>Ajouter un artiste</span>
      </button>
    </header>

    <div class="filters-container">
      <div class="filter-group">
        <label>Rechercher (Nom ou Pseudo):</label>
        <input 
          v-model="inputArtist" 
          type="text" 
          class="filter-input" 
          placeholder="Rechercher..." 
        />
      </div>
    </div>

    <div class="content-panel">
      <div v-if="loading" class="loading-state">Chargement des données...</div>
      
      <div v-else-if="filteredArtists.length === 0" class="empty-state">
        <p>Aucun artiste trouvé.</p>
        <span>Cliquez sur "Ajouter un artiste" pour commencer.</span>
      </div>

      <table v-else class="data-table">
        <thead>
          <tr>
            <th>Nom Complet</th>
            <th>Pseudo</th>
            <th>Type</th>
            <th>Email</th>
            <th class="actions-column"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filteredArtists" :key="a.id_artist">
            <td>{{ a.nom }} {{ a.prenom }}</td>
            <td>{{ a.pseudo || '-' }}</td>
            <td>{{ a.type_artiste?.nom || '-' }}</td>
            <td>{{ a.email }}</td>
            <td class="actions-cell">
              <RouterLink :to="`/update/${a.id_artist}`" class="action-btn edit-btn">Modifier</RouterLink>
              <button @click="deleteOne(a.id_artist)" class="action-btn delete-btn">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useArtists } from '../../Composables/artistes';

const { artists, getAllArtists, deleteArtist } = useArtists();
const loading = ref(true);
const router = useRouter();
const inputArtist = ref('');

const filteredArtists = computed(() => {
  if (!inputArtist.value) return artists.value;
  const query = inputArtist.value.toLowerCase();
  return artists.value.filter(a => 
    a.nom.toLowerCase().includes(query) || 
    a.prenom.toLowerCase().includes(query) || 
    (a.pseudo && a.pseudo.toLowerCase().includes(query))
  );
});

const redirectCreate = () => {
  router.push('/creation');
};

onMounted(async () => {
  try {
    await getAllArtists();
  } catch (err) {
    console.error('Erreur chargement artistes', err);
  } finally {
    loading.value = false;
  }
});

async function deleteOne(id: number) {
    try {
      await deleteArtist(id);
    } catch (error) {
      console.error(error);
    }
  }

</script>

<style scoped>
.page-container {
  padding: 24px;
  background-color: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.content-panel {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden; 
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table thead {
  background-color: #f9fafb;
}

.data-table th {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.actions-column {
  text-align: right;
}

.loading-state, .empty-state {
  padding: 48px;
  text-align: center;
  color: #6b7280;
}

.empty-state p {
  font-size: 16px;
  margin: 0 0 8px 0;
}

.empty-state span {
  font-size: 14px;
}


.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.action-btn {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.2s, border-color 0.2s;
}

.edit-btn {
  background-color: #f0f2f5;
  color: #374151;
}

.edit-btn:hover {
  background-color: #e5e7eb;
}

.delete-btn {
  background-color: transparent;
  color: #ef4444;
}

.delete-btn:hover {
  background-color: #fef2f2;
  border-color: #fecaca;
}

.filters-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.filter-input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.filter-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}
</style>
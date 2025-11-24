<template>
  <div class="page-container">
    <header class="page-header">
      <h1>Gestion des Réservations</h1>
      <button class="btn-primary" @click="redirectCreate">
        <span>Ajouter une réservation</span>
      </button>
    </header>

    <div class="filters-container">
      <div class="filter-group">
        <label>Filtrer par artiste:</label>
        <select v-model="filterArtist" class="filter-select">
          <option value="">Tous les artistes</option>
          <option v-for="a in artists" :key="a.id_artist" :value="a.id_artist">
            {{ a.nom }} {{ a.prenom }} ({{ a.pseudo }})
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Filtrer par studio:</label>
        <select v-model="filterStudio" class="filter-select">
          <option value="">Tous les studios</option>
          <option v-for="s in studios" :key="s.id_studio" :value="s.id_studio">
            {{ s.nom }}
          </option>
        </select>
      </div>
    </div>

    <div class="content-panel">
      <div v-if="loading" class="loading-state">Chargement des données...</div>
      
      <div v-else-if="filteredReservations.length === 0" class="empty-state">
        <p>Aucune réservation trouvée.</p>
        <span>Cliquez sur "Ajouter une réservation" pour commencer.</span>
      </div>

      <table v-else class="data-table">
        <thead>
            <tr>
                <th>Artiste</th>
                <th>Studio</th>
                <th>Stack</th>
                <th>Programmation</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="r in filteredReservations" :key="r.id_reservation">

                <td>{{ r.artiste.nom }} {{ r.artiste.prenom }}</td>
                <td>{{ r.studio.nom }}</td>
                <td>{{ r.stack.nom }}</td>
                <td>{{ r.session.date.toDateString() }} -- {{ r.session.heure_debut.toLocaleTimeString() }} -- {{ r.session.heure_fin.toLocaleTimeString() }}</td>
                <td class="actions-cell">
                    <RouterLink :to="`/updateReservation/${r.id_reservation}`" class="action-btn edit-btn">Modifier</RouterLink>
                    <button @click="deleteOne(r.id_reservation!)" class="action-btn delete-btn">Supprimer</button>
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
import { useReservations } from '../../Composables/reservations';
import { useArtists } from '../../Composables/artistes';
import { useStudios } from '../../Composables/studios';

const { reservations, getAllReservations, deleteReservation } = useReservations();
const { artists, getAllArtists } = useArtists();
const { studios, getAllStudios } = useStudios();

const loading = ref(true);
const router = useRouter();

const filterArtist = ref('');
const filterStudio = ref('');

const filteredReservations = computed(() => {
    return reservations.value.filter(r => {
        const matchArtist = filterArtist.value === '' || r.artiste.id_artist === Number(filterArtist.value);
        const matchStudio = filterStudio.value === '' || r.studio.id_studio === Number(filterStudio.value);
        return matchArtist && matchStudio;
    });
});

const redirectCreate = () => {
  router.push('/reserver');
};

onMounted(async ()=>{
    try{
        await Promise.all([
            getAllReservations(),
            getAllArtists(),
            getAllStudios()
        ]);
    }
    catch(error){
        console.log(error)
    } finally {
        loading.value = false;
    }

})

async function deleteOne(id: number) {
        try {
            await deleteReservation(id);
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
  min-width: 200px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.filter-select:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}
</style>
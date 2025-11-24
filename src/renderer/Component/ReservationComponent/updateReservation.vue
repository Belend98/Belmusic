<template>
    <form @submit.prevent="onSubmit">
        <div style="position: relative;">
            <label for="artist">Artiste :</label>
            <input 
                type="text" 
                v-model="inputArtist" placeholder="Rechercher un artiste..." @focus="showArtistList = true" 
                @input="showArtistList = true" 

            />
            <ul v-if="showArtistList && filteredArtists.length > 0" class="suggestions-list">
                <li 
                    v-for="artist in filteredArtists" 
                    :key="artist.id_artist" 
                    @click="selectArtist(artist)"
                >
                    {{ artist.nom }} {{ artist.prenom }} ({{ artist.pseudo }})
                </li>
            </ul>
        </div>

        <div>
            <label for="studio">Studio :</label>
            <select v-model="studioId" id="studio" required>
                <option disabled value="">Sélectionnez un studio</option>
                <option v-for="studio in studios" :key="studio.id_studio" :value="studio.id_studio">
                    {{ studio.nom }} 
                </option>
            </select>
        </div>

        <div>
            <label for="stack">Stack :</label>
            <select v-model="stackId" id="stack" required>
                <option disabled value="">Sélectionnez un stack</option>
                <option v-for="stack in stacks" :key="stack.id_stack" :value="stack.id_stack">
                    {{ stack.nom }}
                </option>
            </select>
        </div>

        <div class="session-group">
            <h3>Session</h3>
            <div>
                <label for="date">Date :</label>
                <input v-model="date" id="date" type="date" required />
            </div>
            <div>
                <label for="startHour">Heure de début :</label>
                <select v-model="selectedStartHour" id="startHour" required>
                    <option disabled value="">Heure de début</option>
                    <option v-for="h in startHours" :key="h" :value="h">{{ h }}h00</option>
                </select>
            </div>
            <div>
                <label for="endHour">Heure de fin :</label>
                <select v-model="selectedEndHour" id="endHour" required>
                    <option disabled value="">Heure de fin</option>
                    <option v-for="h in endHours" :key="h" :value="h">{{ h }}h00</option>
                </select>
            </div>
        </div>

        <button type="submit">Modifier la réservation</button>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Reservation } from 'src/shared/Interface/IModel/reservation';
import Session from 'src/shared/Interface/IModel/session';
import { useArtists } from '../../Composables/artistes';
import { useStudios } from '../../Composables/studios';
import { useStacks } from '../../Composables/stacks';
import { useReservations } from '../../Composables/reservations';
import Artist from 'src/shared/Interface/IModel/artist';

const router = useRouter();
const route = useRoute();
const { artists, getAllArtists } = useArtists();
const { studios, getAllStudios } = useStudios();
const { stacks, getAllStacks } = useStacks();
const { getReservationById, updateReservation, reservations, getAllReservations } = useReservations();

const artistId = ref<number | string>('');
const inputArtist = ref('');
const showArtistList = ref(false);

const filteredArtists = computed(() => {
    if (!inputArtist.value) {
        return artists.value;
    }
    const query = inputArtist.value.toLowerCase();
    return artists.value.filter(artist => 
        artist.nom.toLowerCase().includes(query) || 
        artist.prenom.toLowerCase().includes(query) || 
        (artist.pseudo && artist.pseudo.toLowerCase().includes(query))
    );
});

function selectArtist(artist: Artist) {
    artistId.value = artist.id_artist!;
    inputArtist.value = `${artist.nom} ${artist.prenom} (${artist.pseudo})`;
    showArtistList.value = false;
}

const studioId = ref<number | string>('');
const stackId = ref<number | string>('');
const date = ref('');
const selectedStartHour = ref<number | string>('');
const selectedEndHour = ref<number | string>('');

const startHours = Array.from({ length: 12 }, (_, i) => i + 10); 
const endHours = computed(() => {
    if (!selectedStartHour.value) return Array.from({ length: 13 }, (_, i) => i + 10);
    const start = Number(selectedStartHour.value);
    return Array.from({ length: 22 - start }, (_, i) => start + 1 + i); 
});

onMounted(async () => {
    try {
        await getAllArtists();
        await getAllStudios();
        await getAllStacks();

        const id = Number(route.params.id);
        if (id) {
            const reservation = await getReservationById(id);
            if (reservation) {
                artistId.value = reservation.artiste.id_artist!;
                inputArtist.value = `${reservation.artiste.nom} ${reservation.artiste.prenom} (${reservation.artiste.pseudo})`;
                
                studioId.value = reservation.studio.id_studio!;
                stackId.value = reservation.stack.id_stack!;
                
                const sessionDate = new Date(reservation.session.date);
                date.value = sessionDate.toISOString().split('T')[0];
                
                const start = new Date(reservation.session.heure_debut);
                selectedStartHour.value = start.getHours();
                
                const end = new Date(reservation.session.heure_fin);
                selectedEndHour.value = end.getHours();
            }
        }
    } catch (error) {
        console.error(error);
    }
});

async function onSubmit() {
    if (!artistId.value || !studioId.value || !stackId.value || !date.value || !selectedStartHour.value || !selectedEndHour.value) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const artist = artists.value.find(a => a.id_artist === Number(artistId.value));
    const studio = studios.value.find(a => a.id_studio === Number(studioId.value));
    const stack = stacks.value.find((a)=> a.id_stack === Number(stackId.value));

    const startH = Number(selectedStartHour.value);
    const endH = Number(selectedEndHour.value);

    const session: Session = {
        date: new Date(date.value),
        heure_debut: new Date(`${date.value}T${startH.toString().padStart(2, '0')}:00:00`),
        heure_fin: new Date(`${date.value}T${endH.toString().padStart(2, '0')}:00:00`)
    };

    const id = Number(route.params.id);

    
    await getAllReservations();
    const conflict = reservations.value.find(r => {
        if (r.id_reservation === id) return false;
        
        
        if (r.studio.id_studio !== Number(studioId.value)) return false;

        const rDate = new Date(r.session.date);
        const sDate = new Date(session.date);
        
        if (rDate.toDateString() !== sDate.toDateString()) return false;

        
        const rStart = new Date(r.session.heure_debut);
        rStart.setFullYear(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
        
        const rEnd = new Date(r.session.heure_fin);
        rEnd.setFullYear(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());

        const sStart = new Date(session.heure_debut);
        sStart.setFullYear(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());

        const sEnd = new Date(session.heure_fin);
        sEnd.setFullYear(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());

        return (sStart.getTime() < rEnd.getTime() && sEnd.getTime() > rStart.getTime());
    });

    if (conflict) {
        alert("Cette plage horaire est déjà réservée pour ce studio.");
        return;
    }

    try {
        const originalReservation = await getReservationById(id);
        if (originalReservation && originalReservation.session) {
            session.id_session = originalReservation.session.id_session;
        }
    } catch (e) {
        console.error( e);
    }

    const updatedReservation: Reservation = {
        etat: true,
        artiste: toRaw(artist!),
        studio: toRaw(studio!),
        stack: toRaw(stack!),
        session: session
    };

    try {
        await updateReservation(id, updatedReservation);
        router.push('/dashboard');
    } catch (error) {
        console.error(error);
        const msg = error.message ? error.message : "Une erreur est survenue.";
        alert(msg);
    }
}

</script>

<style scoped>
form {
    width: 100%;
    max-width: 480px;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
    color: #374151;
}

input,
select {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 1rem;
}

input:focus,
select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

button {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    background: #4f46e5;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #4338ca;
}

.session-group {
    border: 1px solid #e5e7eb;
    padding: 1rem;
    border-radius: 6px;
    background-color: #f9fafb;
}

.session-group h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #1f2937;
}

.suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0 0 6px 6px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.suggestions-list li {
    padding: 0.5rem 0.6rem;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
}

.suggestions-list li:hover {
    background-color: #f3f4f6;
}

@media (max-width: 420px) {
    form {
        padding: 0.5rem;
    }
}
</style>

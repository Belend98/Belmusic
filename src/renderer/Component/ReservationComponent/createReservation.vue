<template>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="artist">Artiste :</label>
            <select v-model="artistId" id="artist" required>
                <option disabled value="">Sélectionnez un artiste</option>
                <option v-for="artist in artists" :key="artist.id_artist" :value="artist.id_artist">
                    {{ artist.nom }} {{ artist.prenom }} ({{ artist.pseudo }})
                </option>
            </select>
        </div>

        <div>
            <label for="studio">Studio :</label>
            <select v-model="studioId" id="studio" required>
                <option disabled value="">Sélectionnez un studio</option>
                <option v-for="studio in studios" :key="studio.id_studio" :value="studio.id_studio">
                    {{ studio.nom }} {{ studio.etat }}
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
                <label for="startTime">Heure de début :</label>
                <input v-model="heure_debut" id="startTime" type="time" required />
            </div>
            <div>
                <label for="endTime">Heure de fin :</label>
                <input v-model="heure_fin" id="endTime" type="time" required />
            </div>
        </div>

        <button type="submit">Enregistrer la réservation</button>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Reservation } from 'src/shared/Interface/IModel/reservation';
import Artist from 'src/shared/Interface/IModel/artist';
import Studio from 'src/shared/Interface/IModel/studio';
import Stack from 'src/shared/Interface/IModel/stack';
import Session from 'src/shared/Interface/IModel/session';

const router = useRouter();
const artists = ref<Artist[]>([]);
const studios = ref<Studio[]>([]);
const stacks = ref<Stack[]>([]);

const artistId = ref<number | string>('');
const studioId = ref<number | string>('');
const stackId = ref<number | string>('');
const date = ref('');
const heure_debut = ref('');
const heure_fin = ref('');

onMounted(async () => {
    try {
        artists.value = await window.api.artistService.getAllArtists();


    } catch (error) {
        console.error(error);
    }

    try {

        studios.value = await window.api.studioService.getAllStudios();
    } catch (error) {
        console.error(error);
    }

    try {

        stacks.value = await window.api.stackService.getAllStacks();

    } catch (error) {
        console.error(error);
    }
});

async function onSubmit() {
    if (!artistId.value || !studioId.value || !stackId.value || !date.value || !heure_debut.value || !heure_fin.value) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const artist = artists.value.find(a => a.id_artist === Number(artistId.value));
    const studio = studios.value.find(a => a.id_studio === Number(studioId.value));
    const stack = stacks.value.find((a)=> a.id_stack === Number(stackId.value));

    const session: Session = {
        date: new Date(date.value),
        heure_debut: new Date(`${date.value}T${heure_debut.value}`),
        heure_fin: new Date(`${date.value}T${heure_fin.value}`)
    };

    const newReservation: Reservation = {
        etat: true,
        artiste: artist!,
        studio: studio,
        stack: stack,
        session: session
    };

    try {
        await window.api.reservationService.createReservation(newReservation);
        router.push('/reservations');
    } catch (error) {
        console.error("Erreur lors de la création de la réservation:", error);
        alert("Erreur lors de la création. Vérifiez la console.");
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

@media (max-width: 420px) {
    form {
        padding: 0.5rem;
    }
}
</style>

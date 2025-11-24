<template>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="nom"> Nom :</label>
            <input v-model="a.nom" id="nom" name="name" type="text" />
        </div>
        <div>
            <label for="prenom"> Prénom :</label>
            <input v-model="a.prenom" id="prenom" name="prenom" type="text" />
        </div>
        <div>
            <label for="pseudo"> Blaze :</label>
            <input v-model="a.pseudo" id="pseudo" name="pseudo" type="text" />
        </div>
        <div>
            <label for="type">Type d'artiste :</label>
            <select v-model="a.id_type_artist" id="type" required>
                <option v-for="t in typeArtistes" :key="t.id_type_artiste" :value="t.id_type_artiste">
                    {{ t.nom }}
                </option>
            </select>
        </div>
        <div>
            <label for="email"> E-mail :</label>
            <input v-model="a.email" id="email" name="email" type="text" />
        </div>
        <div>
            <label for="telephone"> Téléphone :</label>
            <input v-model="a.telephone" id="telephone" name="telephone" type="text" />
        </div>


        <button type="submit">Modifier l'artiste</button>

    </form>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import Artist from 'src/shared/Interface/IModel/artist';
import { useArtists } from '../../Composables/artistes';
import { useTypeArtistes } from '../../Composables/typeArtistes';


const router = useRouter();
const route = useRoute();
const artistId = Number(route.params.id)
const { getArtistById, updateArtist } = useArtists();
const { typeArtistes, getAllTypeArtistes } = useTypeArtistes();


const a = ref<Artist>({

    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    id_type_artist: 1,
    pseudo: ''
})

onMounted(async () => {
    try {
        await getAllTypeArtistes();
        const artistData = await getArtistById(artistId)

        if (artistData) {
            a.value = artistData;
        } else {
            console.error("artiste non trouvé");
            router.push("/list");
        }
    }
    catch (error) {
        console.error(error)
    }
});

async function onSubmit() {
    const jsArtist = { ...a.value }
    try {
        await updateArtist(artistId, jsArtist)
        router.push('/list')
    }
    catch (error) {
        console.error(error)
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
</style>
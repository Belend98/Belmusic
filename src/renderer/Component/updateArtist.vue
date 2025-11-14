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
import Artist from 'src/shared/artist';

const router = useRouter();
const route = useRoute();
const artistId = Number(route.params.id)


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
        const artistData = await window.api.artistService.getArtistById(artistId)

        if (artistData) {
            a.value = artistData;
        } else{
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
        await window.api.artistService.updateArtist(artistId, jsArtist)
        router.push('/list')
    }
    catch (error) {
        console.error(error)
    }

}





</script>
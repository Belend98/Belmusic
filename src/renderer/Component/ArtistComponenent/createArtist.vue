<template>
    <form @submit.prevent="onSubmit" >
        <div>
            <label for="nom"> Nom :</label>
            <input v-model="a.nom" id="nom" name="name" type="text"/>
        </div>
        <div>
            <label for="prenom"> Prénom :</label>
            <input v-model="a.prenom" id="prenom" name="prenom" type="text"/>
        </div>
        <div>
            <label for="pseudo"> Blaze :</label>
            <input v-model="a.pseudo" id="pseudo" name="pseudo" type="text"/>
        </div>
        <div>
            <label for="email"> E-mail :</label>
            <input v-model="a.email" id="email" name="email" type="email"/>
        </div>
        <div>
            <label for="type_artist"> Type d'artiste : </label>
            <input v-model="a.id_type_artist" id="type_artist" name="type_artist" type="text"/>
        </div> 
        <div>
            <label for=""> Téléphone :</label>
            <input v-model="a.telephone" id="telephone" name="telephone" type="text"/>
        </div> 
        
        <button @click="creation" type="submit" >Enregistrer l'artiste</button>

    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Artist from 'src/shared/Interface/IModel/artist';


const router = useRouter();

const a = ref<Artist>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    id_type_artist: 1,
    pseudo: ''
})

function onSubmit(){
    
}

async function creation(): Promise<void>{
    if (!a.value) {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    const jsArtist = {...a.value}
    try{
        await window.api.artistService.createArtist(jsArtist)  
        router.push('/list')
    }
    catch(error) {
        console.error(error)
    }
}

</script>

<style scoped>

form {
    width: 100%;
    max-width: 480px;
    display: grid;
    gap: 0.6rem;
}

label { display: block; font-size: 0.95rem; margin-bottom: 0.25rem; }
input { width: 100%; padding: 0.5rem 0.6rem; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
button { margin-top: 0.6rem; padding: 0.6rem 1rem; border-radius: 8px; background: #4f46e5; color: #fff; border: none; cursor: pointer; }

@media (max-width: 420px) {
    form { padding: 0 0.5rem; }
}
</style>
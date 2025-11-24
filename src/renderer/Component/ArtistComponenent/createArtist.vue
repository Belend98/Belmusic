<template>
    <form @submit.prevent="onSubmit" >
        <div>
            <label for="nom"> Nom :</label>
            <input v-model="a.nom" id="nom" name="name" type="text" required/>
        </div>
        <div>
            <label for="prenom"> Prénom :</label>
            <input v-model="a.prenom" id="prenom" name="prenom" type="text" required/>
        </div>
        <div>
            <label for="pseudo"> Blaze :</label>
            <input v-model="a.pseudo" id="pseudo" name="pseudo" type="text"/>
        </div>
        <div>
            <label for="email"> E-mail :</label>
            <input v-model="a.email" id="email" name="email" type="email" required/>
        </div>
        <div>
            <label for="type_artist"> Type d'artiste : </label>
            <select v-model="a.id_type_artist" id="type_artist" name="type_artist" required>
                <option disabled :value="0">Sélectionnez un type</option>
                <option v-for="type in typeArtistes" :key="type.id_type_artiste" :value="type.id_type_artiste">
                    {{ type.nom }}
                </option>
            </select>
        </div> 
        <div>
            <label for="telephone"> Téléphone :</label>
            <input v-model="a.telephone" id="telephone" name="telephone" type="text" required placeholder="+32470123456"
                pattern="^\+[0-9]{8,15}$"
                title="Format international requis: (ex: +32470123456)"/>
        </div> 
        
        <button @click="creation" type="submit" >Enregistrer l'artiste</button>

    </form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Artist from 'src/shared/Interface/IModel/artist';
import { useTypeArtistes } from '../../Composables/typeArtistes';
import { useArtists } from '../../Composables/artistes';


const router = useRouter();
const { typeArtistes, getAllTypeArtistes } = useTypeArtistes();
const { createArtist } = useArtists();

const a = ref<Artist>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    id_type_artist: 0,
    pseudo: ''
})

onMounted(async () => {
    try {
        await getAllTypeArtistes();
    } catch (error) {
        console.error(error);
    }
});

function onSubmit(){
    
}

async function creation(): Promise<void>{
    if (!a.value.nom || !a.value.prenom || !a.value.email || !a.value.telephone || !a.value.id_type_artist) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    const phoneRegex = /^\+[0-9]{8,15}$/;
    if (!phoneRegex.test(a.value.telephone)) {
        alert("Le numéro de téléphone doit être au format international (+XX..., sans espaces ni tirets).");
        return;
    }

    const jsArtist = {...a.value}
    try{
        await createArtist(jsArtist)  
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
input, select { width: 100%; padding: 0.5rem 0.6rem; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
button { margin-top: 0.6rem; padding: 0.6rem 1rem; border-radius: 8px; background: #4f46e5; color: #fff; border: none; cursor: pointer; }

@media (max-width: 420px) {
    form { padding: 0 0.5rem; }
}
</style>
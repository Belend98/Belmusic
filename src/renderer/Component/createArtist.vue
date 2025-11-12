<template>
    <form >
        <div>
            <label for="nom"> Nom :</label>
            <input id="nom" name="name" type="text"/>
        </div>
        <div>
            <label for="prenom"> Prénom :</label>
            <input id="prenom" name="prenom" type="text"/>
        </div>
        <div>
            <label for="pseudo"> Blaze :</label>
            <input id="pseudo" name="pseudo" type="text"/>
        </div>
        <div>
            <label for="email"> E-mail :</label>
            <input id="email" name="email" type="email"/>
        </div>
        <div>
            <label for="telephone"> Téléphone :</label>
            <input id="telephone" name="telephone" type="text"/>
        </div> 
        
        <button @submit.prevent="onSubmit">Enregistrer l'artiste</button>

    </form>
</template>

<script setup lang="ts">

function onSubmit(): void{

}
</script>
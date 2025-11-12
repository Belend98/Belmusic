<template>
    <div class="reservation">
    <form v-on:submit.prevent="onSubmit">
            <div>
                <label for="nom">Nom</label>
                <input id="nom" name="nom" type="text" />
            </div>

            <div>
                <label for="prenom">Prénom</label>
                <input id="prenom" name="prenom" type="text" />
            </div>

            <div>
                <label for="email">Email</label>
                <input id="email" name="email" type="email" />
            </div>

            <div>
                <label for="date">Date</label>
                <input id="date" name="date" type="date" />
            </div>

            <div>
                <label for="time">Heure</label>
                <input id="time" name="time" type="time" />
            </div>

            <div>
                <button type="submit">Réserver</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

function onSubmit(): void {
    console.log("hello")
    
}
</script>

<style scoped>
.reservation {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
}

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
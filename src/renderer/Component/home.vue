<template>
    <div class="top" :style="{ backgroundImage: `url(${img})` }">
        <div class="overlay">
            <div class="cta">
                <h1>Bienvenue chez Belmusic</h1>
                <p>Réservez votre créneau horaire en studio dès maintenant.</p>
                <button class="reserve-btn" v-on:click="handleclick">Réserver un créneau</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import img from '../image/image studio.png'

const router = useRouter();
const handleclick = () => {
    router.push('/reserver');

}

</script>

<style scoped>
.top {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.overlay {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
}

.cta {
    max-width: 720px;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem 2.5rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.cta h1 {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
    color: #111;
}

.cta p {
    margin: 0 0 1.25rem 0;
    color: #222;
}

.reserve-btn {
    background: #4f46e5; 
    color: white;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    transition-duration: 1000ms;
    cursor: pointer;
}

.reserve-btn:hover {
    background: #3427c6; 
    border-radius:50px;
}

@media (max-width: 600px) {
    .cta { padding: 1.25rem; }
    .cta h1 { font-size: 1.25rem; }
}
</style>
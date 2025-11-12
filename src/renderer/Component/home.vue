<template>
    <div class="top" :style="{ backgroundImage: `url(${img})` }">
        <div class="overlay">
            <div class="cta">
                <h1>Bienvenue chez Belmusic</h1>
                <p>Réservez votre créneau horaire en studio dès maintenant.</p>
                <button class="reserve-btn">Réserver un créneau</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import img from '../image/image studio.png'

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
    background: rgba(0, 0, 0, 0.35);
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
    background: #4f46e5; /* indigo-600 */
    color: white;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}

.reserve-btn:hover {
    background: #4338ca; /* indigo-700 */
}

@media (max-width: 600px) {
    .cta { padding: 1.25rem; }
    .cta h1 { font-size: 1.25rem; }
}
</style>
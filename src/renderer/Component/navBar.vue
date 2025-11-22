<template>
    <header class="navbarcontainer">
        <div class="brand">
            <img :src="logo" alt="logo" class="logo" />
            <span class="title">Belmusic</span>
        </div>

        <nav class="navbar">
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/list">Liste Artistes</RouterLink>
            <RouterLink to="/dashboard">Tableau de Bord</RouterLink>
            <RouterLink to="/calendar">Calendrier</RouterLink>
            <RouterLink to="/reserver" class="cta">Réserver</RouterLink>
        </nav>
    </header>
</template>

<script setup>
import logo from '../image/Gemini_Generated_Image_j4myrnj4myrnj4my.png'
</script>

<style scoped>
.navbarcontainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem 1rem;
    background: linear-gradient(90deg, #7f54c9 0%, #7c3aed 100%);
    color: #fff;
    box-shadow: 0 6px 18px rgba(17, 24, 39, 0.12);
}

.brand { 
    display: flex; align-items: center; gap: 0.6rem; 
}
.logo { 
    height: 44px; width: auto; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.18); 
}
.title { 
    font-weight: 700; font-size: 1.05rem; letter-spacing: 0.2px; 
}

.navbar { 
    display: flex; gap: 0.6rem; align-items: center; 
}
.navbar a { 
    color: rgba(255,255,255,0.95); text-decoration: none; padding: 0.5rem 0.7rem; border-radius: 8px; transition: background-color .15s, transform .08s; 
}
.navbar a:hover { 
    background: rgba(255,255,255,0.08); transform: translateY(-1px); 
}
.router-link-active { 
    background: rgba(56, 2, 88, 0.5); 
}

.cta { 
    background: #9b3434; color: #5b21b6; font-weight: 700; padding: 0.45rem 0.9rem; 
}


@media (max-width: 720px) {
    .navbarcontainer { padding: 0.5rem; }
    .navbar { gap: 0.4rem; }
    .title { display: none; }
}

</style>

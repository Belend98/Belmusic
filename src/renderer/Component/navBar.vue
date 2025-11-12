<template>
    <div class="navbarcontainer">
        <img src="C:\Users\Lenovo\Documents\Projet-info\Belmusic\src\renderer\image\Gemini_Generated_Image_j4myrnj4myrnj4my.png" alt="logo" height="50">
        <nav class="navbar">
            <RouterLink to="/list">Liste Artistes</RouterLink>
            <RouterLink to="/dashboard">Tableau de Bord </RouterLink>
        </nav>
    </div>


</template>

<style>

.navbar {
   background-color: rgb(196, 190, 233);
   display: flex;
   gap: 10px;
   margin: 0;
   color:lch(from color l c h)
}
.navbarcontainer{
    background-color: blueviolet;
    display: flex;
    justify-content: space-between;
}
</style>

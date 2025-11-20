<template>
    <table>
        <thead>
            <tr>
                <th>Artiste</th>
                <th>Studio</th>
                <th>Stack</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="r in reservations" :key="r.id_reservation">

                <td>{{ r.artiste.nom }} {{ r.artiste.prenom }}</td>
                <td>{{ r.studio.nom }}</td>
                <td>{{ r.stack.nom }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { Reservation } from 'src/shared/Interface/IModel/reservation';
import { onMounted, ref } from 'vue';


const reservations = ref<Reservation[]>([])

onMounted(async ()=>{
    try{
        reservations.value = await window.api.reservationService.getAllReservation();
        console.log("donnée recup")
    }
    catch(error){
        console.log(error)
    }

})

</script>
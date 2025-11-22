import { createMemoryHistory, createRouter, RouteRecordRaw, } from "vue-router";
import notFound from "./Component/notFound.vue";
import Home from "./Component/home.vue";
import DashBoard from "./Component/dashBoard.vue";
import Calendar from "./Component/calendar.vue";
import CreateArtist from "./Component/ArtistComponenent/createArtist.vue";
import Artists from "./Component/ArtistComponenent/artists.vue";
import UpdateArtist from "./Component/ArtistComponenent/updateArtist.vue";
import CreateReservation from "./Component/ReservationComponent/createReservation.vue";



const routes = [
    { path: '/list', component: Artists },
    { path: '/update/:id', component: UpdateArtist },
    { path: '/creation', component: CreateArtist },
    { path: '/reserver', component: CreateReservation },
    { path: '/', component: Home },
    { path: '/dashboard', component: DashBoard },
    { path: '/calendar', component: Calendar },
    { path: '/notfound', component: notFound }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
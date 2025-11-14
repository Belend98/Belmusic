import { createMemoryHistory, createRouter, RouteRecordRaw, } from "vue-router";
import notFound from "./Component/notFound.vue";
import Home from "./Component/home.vue";
import NavBar from "./Component/navBar.vue";
import DashBoard from "./Component/dashBoard.vue";
import Reservation from "./Component/reservation.vue";
import Calendar from "./Component/calendar.vue";
import CreateArtist from "./Component/createArtist.vue";
import Artists from "./Component/artists.vue";
import UpdateArtist from "./Component/updateArtist.vue";



const routes = [
    { path: '/list', component: Artists },
    { path: '/update/:id', component: UpdateArtist },
    { path: '/creation', component: CreateArtist },
    { path: '/', component: Home },
    { path: '/dashboard', component: DashBoard },
    { path: '/reservation', component: Reservation },
    { path: '/calendar', component: Calendar },
    { path: '/navbar', component: NavBar },
    { path: '/notfound', component: notFound }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
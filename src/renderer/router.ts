import { createMemoryHistory, createRouter,  } from "vue-router";
import ArtistCard from "./Component/artistCard.vue";
import notFound from "./Component/notFound.vue";
import Home from "./Component/home.vue";
import NavBar from "./Component/navBar.vue";
import DashBoard from "./Component/dashBoard.vue";


const routes = [
    {path:'/list', component: ArtistCard}, 
    {path:'/', component: Home}, 
    {path:'/dashboard', component: DashBoard},
    {path:'/navbar', component: NavBar}, 
    {path:'/notfound', component: notFound}
]
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
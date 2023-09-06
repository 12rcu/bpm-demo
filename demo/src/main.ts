import { createApp } from 'vue'
import './assets/base.scss'
import App from "@/App.vue";
import HomeComponent from "@/components/struc/main/HomeComponent.vue";
import FilteringComponent from "@/components/struc/main/FilteringComponent.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import UserComponent from "@/components/struc/main/UserComponent.vue";
import ItemComponent from "@/components/struc/main/ItemComponent.vue";
import AuthComponent from "@/components/struc/main/AuthComponent.vue";

const routes = [
    { path: '/', component: HomeComponent },
    { path: '/filtering', component: FilteringComponent },
    { path: '/user', component: UserComponent },
    { path: '/items', component: ItemComponent },
    { path: '/authentication', component: AuthComponent },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/style.css" //buradaki @ /src anlamına geliyor
import appHeader from "@/components/appHeader"

const app= createApp(App)

app.component("app-header",appHeader)

app.mount('#app');

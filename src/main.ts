import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import "element-plus/theme-chalk/dark/css-vars.css";
// fade/zoom
import "element-plus/theme-chalk/base.css";
const app = createApp(App);
app.use(createPinia());
app.mount("#app");

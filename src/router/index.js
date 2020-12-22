import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddTODO from "../components/AddTODO.vue";
import TodoList from "../views/TodoList.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/TodoList",
    name: "TodoList",
    component: TodoList
  },
  {
    path: "/AddTODO",
    name: "AddTODO",
    component: AddTODO
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

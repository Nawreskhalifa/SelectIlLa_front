import { createWebHistory, createRouter } from "vue-router";
import AddVehicle from "@/pages/Vehicle/AddVehicle.vue"
import VehicleList from "@/pages/Vehicle/VehicleList.vue"

const routes = [
  {
    path: "/addvehicle",
    name: "addvehicle",
    component: AddVehicle,
  },
  {
    path: "/vehiclelist",
    name: "vehiclelist",
    component: VehicleList,
  }
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
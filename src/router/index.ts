import { createWebHistory, createRouter } from "vue-router";
import AddVehicle from "@/pages/Vehicle/AddVehicle.vue"
import VehicleList from "@/pages/Vehicle/VehicleList.vue"
 import VillaList from "@/pages/Villa/VillaList.vue"
import AddVilla from "@/pages/Villa/AddVilla.vue"
import AddVehicleCategory from "../pages/Categories/Vehicle/AddVehicleCategory.vue"
import VehicleListCategory from "../pages/Categories/Vehicle/VehicleListCategory.vue"

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
  },
  {
    path: "/villalist",
    name: "villalist",
    component: VillaList,
  },
  {
    path: "/addvilla",
    name: "addvilla",
    component: AddVilla,
  },
  {
    path: "/AddVehicleCategory",
    name: "AddVehicleCategory",
    component: AddVehicleCategory,
  },
  {
    path: "/VehicleListCategory",
    name: "VehicleListCategory",
    component: VehicleListCategory,
  },
  // {
  //   path: "/vehicledetails",
  //   name: "vehicledetails",
  //   component: VehicleDetails,
  // }
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
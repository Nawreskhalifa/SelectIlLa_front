
import { createWebHistory, createRouter } from "vue-router";
import AddVehicle from "@/pages/Vehicle/AddVehicle.vue"
import VehicleList from "@/pages/Vehicle/VehicleList.vue"
 import VillaList from "@/pages/Villa/VillaList.vue"
import AddVilla from "@/pages/Villa/AddVilla.vue"
import AddVehicleCategory from "../pages/Categories/Vehicle/AddVehicleCategory.vue"
import VehicleListCategory from "../pages/Categories/Vehicle/VehicleListCategory.vue"
import AddVillaCategory from "../pages/Categories/Villa/AddVillaCategorie.vue"
import VillaListCategory from "../pages/Categories/Villa/ListVillaCategory.vue"
import ContactPage from "../pages/ContactPage/ContactPage.vue"
import CategoriesEventPage from "../pages/CategoriesEvent/CategoriesEventPage.vue";
import CreateNewCategoryEventPage from "../pages/CategoriesEvent/CreateNewCategoryEventPage.vue";
import CategoryEventDetailsPage from "../pages/CategoriesEvent/CategoryEventDetailsPage.vue";
import EditCategoryEventPage from "../pages/CategoriesEvent/EditCategoryEventPage.vue";
import EventListPage from "../pages/Events/EventListPage.vue";
import AddEventPage from "../pages/Events/AddEventPage.vue";
import EventsGridPage from "../pages/Events/EventsGridPage.vue";
import EventDetailsPage from "../pages/Events/EventDetailsPage.vue";
import CustomersListPage from "../pages/Users/Customers/CustomersListPage.vue";
import CustomersPage from "../pages/Ecommerce/CustomersPage.vue";
import AddCustomerPage from "../pages/Users/Customers/AddCustomerPage.vue"
import CustomerDetailPage from '../pages/Users/Customers/CustomerDetailPage.vue';
import LoginPage from "../pages/Authentication/LoginPage.vue";

  
const routes = [
  {
    path: "/customers",
    name: "CustomersPage",
    component: CustomersPage,
  },
  {
    
    path: "/customersList",
    name: "CustomersListPage",
    component: CustomersListPage,
  },
  {
    path: "/add-customer",
    name: "AddCustomerPage",
    component: AddCustomerPage,
  },
  {
    path: "/customer-detail/:customerId",
    name: "CustomerDetailPage",
    component: CustomerDetailPage,
    props: true,
  },
  {
    path: "/categories-event",
    name: "CategoriesEventPage",
    component: CategoriesEventPage,
  },
  {
    path: "/category-event-details/:idCategoryEvent",
    name: "CategoryEventDetails",
    component: CategoryEventDetailsPage,
  },
  {
    path: "/create-new-category-event",
    name: "CreateNewCategoryEventPage",
    component: CreateNewCategoryEventPage,
  },
  {
    path: "/edit-category-event/:idCategoryEvent",
    name: "EditCategoryEventPage",
    component: EditCategoryEventPage,
  },
  {
    path: "/events",
    name: "EventListPage",
    component: EventListPage,
  },
  {
    path: "/event-details/:idEvent",
    name: "EventDetailsPage",
    component: EventDetailsPage,
  },
  {
    path: "/add-event",
    name: "AddEventPage",
    component: AddEventPage,
  },
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
  {
    path: "/AddVillaCategory",
    name: "AddVillaCategory",
    component: AddVillaCategory,
  },
  {
    path: "/VillaListCategory",
    name: "VillaListCategory",
    component: VillaListCategory,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  }
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
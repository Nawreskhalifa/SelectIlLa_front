
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
import Dashboard from "../pages/Dashboard/EcommercePage.vue";
import EditEventPage from "../pages/Events/EditEventPage.vue";
import store from "../store/modules/users"
import PartnersPage from "../pages/Partners/PartnersList/PartnersList.vue"
import ReservationListPage from "../pages/Reservation/ReservationList.vue"
import AcceptReservation from "../pages/Reservation/AcceptedReservation.vue"
import ErrorPage from "../pages/ErrorPage.vue"
import LogOut from "../pages/LogoutPage.vue"
import PdfViewer from "../pages/PDF/PdfVww.vue"
function guardMyroute(to, from, next) {
  const isAuthenticated = localStorage.getItem('user');

  if (to.name === 'LoginPage') {
     if (isAuthenticated) {
      next('/dashboard');
    } else {
      next();
    }
  } else {
     if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  }
}

 const routes = [
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    beforeEnter : guardMyroute,
     meta :{auth : false}
  },
  {
    path: "/customers",
    name: "CustomersPage",
    component: CustomersPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {

    path: "/customersList",
    name: "CustomersListPage",
    component: CustomersListPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}
  },
  {
    path: "/add-customer",
    name: "AddCustomerPage",
    component: AddCustomerPage,
    beforeEnter : guardMyroute,
    meta :{auth : true}

  },
  {
    path: "/partnersList",
    name: "partnersList",
    component: PartnersPage,
    beforeEnter : guardMyroute,
    meta :{auth : true}

  },
  {
    path: "/reservationList",
    name: "reservationList",
    component: ReservationListPage,
    beforeEnter : guardMyroute,
    meta :{auth : true}
  },
  {
    path: "/acceptedres",
    name: "acceptedres",
    component: AcceptReservation,
    beforeEnter : guardMyroute,
    meta :{auth : true}
  },
  {
    path: "/customer-detail/:customerId",
    name: "CustomerDetailPage",
    component: CustomerDetailPage,
    beforeEnter : guardMyroute,

    props: true,
    meta :{auth : true}

  },
  {
    path: "/categories-event",
    name: "CategoriesEventPage",
    component: CategoriesEventPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/category-event-details/:idCategoryEvent",
    name: "CategoryEventDetails",
    component: CategoryEventDetailsPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/create-new-category-event",
    name: "CreateNewCategoryEventPage",
    component: CreateNewCategoryEventPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/edit-category-event/:idCategoryEvent",
    name: "EditCategoryEventPage",
    component: EditCategoryEventPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/events",
    name: "EventListPage",
    component: EventListPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/event-details/:idEvent",
    name: "EventDetailsPage",
    component: EventDetailsPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/add-event",
    name: "AddEventPage",
    component: AddEventPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/addvehicle",
    name: "addvehicle",
    component: AddVehicle,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/vehiclelist",
    name: "vehiclelist",
    component: VehicleList,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/pdf/:id",
    name: "pdf",
    component: PdfViewer,
    beforeEnter: guardMyroute,
    meta: { auth: true }
  },
  {
    path: "/villalist",
    name: "villalist",
    component: VillaList,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/addvilla",
    name: "addvilla",
    component: AddVilla,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/AddVehicleCategory",
    name: "AddVehicleCategory",
    component: AddVehicleCategory,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/VehicleListCategory",
    name: "VehicleListCategory",
    component: VehicleListCategory,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/AddVillaCategory",
    name: "AddVillaCategory",
    component: AddVillaCategory,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/VillaListCategory",
    name: "VillaListCategory",
    component: VillaListCategory,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
    path: "/edit-event/:idEvent",
    name: "EditEventPage",
    component: EditEventPage,
    beforeEnter : guardMyroute,

    meta :{auth : true}

  },
  {
      path: "/dashboard",
      name: "dashboard",
      beforeEnter : guardMyroute,
      meta :{auth : true},
       component: Dashboard,
  },
  {
    path: "/error",
    name: "error",
       component: ErrorPage,
},

];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
   next('/dashboard');
 } else if (to.matched.length === 0) {
    next('/error');
 } else {
    next();
 }
});



export default router;
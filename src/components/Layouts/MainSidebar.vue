<template>
  <div
    :class="[
      'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
      { active: stateStoreInstance.open },
    ]"
    id="sidebar-area"
  >
    <div class="logo position-absolute start-0 end-0 top-0 bg-black">
      <router-link
        to="/"
        class="d-flex align-items-center text-white text-decoration-none"
      >
        <img src="../../assets/selectIt.png" />
      </router-link>
      <div class="border-bottom"></div>
      <button
        class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange"
      >
        <i class="ph-duotone ph-caret-double-right"></i>
      </button>
    </div>
    <div class="sidebar-menu">
      <!--/i> -->

      <ul
        class="sidebar-navbar-nav ps-0 mb-0 list-unstyled accordion customSide"
        id="sidebarNavAccordion"
      >
        <li class="sidebar-nav-item">
          <router-link to="/file-manager" class="sidebar-nav-link d-block">
            <i class="flaticon-more-1"></i>
            <span class="title">Dashboard</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/file-manager" class="sidebar-nav-link d-block">
            <i class="flaticon-people"></i>
            <span class="title">Customers</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/file-manager" class="sidebar-nav-link d-block">
            <i class="flaticon-ticket"></i>
            <span class="title">Events</span>
          </router-link>
        </li>

        <li
          class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0"
        >
          <a
            class="accordion-button collapsed rounded-0 shadow-none bg-transparent d-block"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseThree"
            aria-expanded="false"
            aria-controls="sidebarCollapseThree"
          >
            <i class="fa fa-car" aria-hidden="true"></i>
            <span class="title">Vehicles</span>
          </a>
          <div
            id="sidebarCollapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarNavAccordion"
          >
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link to="/VehicleList" class="sidebar-sub-menu-link">
                    Vehicles List
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link to="/AddVehicle" class="sidebar-sub-menu-link">
                    Add Vehicle
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li
          class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0"
        >
          <a
            class="accordion-button collapsed rounded-0 shadow-none bg-transparent d-block"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapseTwo"
            aria-expanded="false"
            aria-controls="sidebarCollapseTwo"
          >
            <i class="flaticon-home"></i>
            <span class="title">Villas</span>
          </a>
          <div
            id="sidebarCollapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#sidebarNavAccordion"
          >
            <div class="accordion-body">
              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">
                <li class="sidebar-sub-menu-item">
                  <router-link
                    to="/crm-customers"
                    class="sidebar-sub-menu-link"
                  >
                    Villas List
                  </router-link>
                </li>
                <li class="sidebar-sub-menu-item">
                  <router-link
                    to="/crm-customers"
                    class="sidebar-sub-menu-link"
                  >
                    Add Villa
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li class="sidebar-nav-item">
          <router-link to="/changelog" class="sidebar-nav-link d-block">
            <i class="fa fa-address-book" aria-hidden="true"></i>
            <span class="title">Contacts</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";
import { keys } from "../../utils/storageKeys";
export default defineComponent({
  name: "MainSidebar",
  setup() {
    const stateStoreInstance = stateStore;
    return {
      stateStoreInstance,
    };
  },

  methods: {
    logout() {
      window.localStorage.removeItem(keys.token);
      window.localStorage.removeItem(keys.userData);
      this.$router.push({ name: "LogoutPage" });
    },
  },
});
</script>

<style scoped>
.customSide {
  padding-top: 130px;
}
</style>

<template>
  <BreadCrumb PageTitle="Vehicles" />
  <VehiclesList />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import VehiclesList from "../../components/Vehicles/VehicleGrid/VehicleGrid.vue";

export default defineComponent({
  name: "ProductsGridPage",
  components: {
    BreadCrumb,
    VehiclesList,
  },
});
</script>

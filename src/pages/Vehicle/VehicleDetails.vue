<template>
  <BreadCrumb PageTitle="Vehicles" />
  <VehicleDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import VehicleDetails from "../../components/Vehicles/VehicleDetails/VehicleDetails.vue";

export default defineComponent({
  name: "ProductsGridPage",
  components: {
    BreadCrumb,
    VehicleDetails,
  },
});
</script>

<template>
  <BreadCrumb PageTitle="Add Vehicle" />
  <AddVehicle />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddVehicle from "../../components/Vehicles/AddVehicle/AddVehicle.vue";

export default defineComponent({
  name: "AddVehiclePage",
  components: {
    BreadCrumb,
    AddVehicle,
  },
});
</script>
    
<template>
  <VehicleDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

 import VehicleDetails from "../../components/Vehicles/VehicleDetailsPage/VehicleDetailsPage.vue";

export default defineComponent({
  name: "ProductsGridPage",
  components: {
     VehicleDetails,
  },
});
</script>

<template>
      <BreadCrumb :PrevPage="'VehicleList'" :url="'/vehiclelist'" PageTitle="Update Vehicle" />
   <UpdateVehicle />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BreadCrumb from "../../components/Common/BreadCrumb.vue";
 import UpdateVehicle from "../../components/Vehicles/UpdateVehiclePage/UpdateVehiclePage.vue";
export default defineComponent({
  name: "ProductsGridPage",
  components: {
    BreadCrumb ,
     UpdateVehicle,
   },
});
</script>

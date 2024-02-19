<template>
  <BreadCrumb :PrevPage="'List Villas'" :url="'/villalist'" PageTitle="Update Villa" />
  <UpdateVillaPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import UpdateVillaPage from "../../components/Villa/UpdateVillaPage/UpdateVillaPage.vue";

export default defineComponent({
  name: "AddVehiclePage",
  components: {
    BreadCrumb,
    UpdateVillaPage,
  },
});
</script>

<template>
  <BreadCrumb PageTitle="Add Villa" />
  <AddVilla />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddVilla from "../../components/Villa/AddVilla/AddVilla.vue";

export default defineComponent({
  name: "AddVehiclePage",
  components: {
    BreadCrumb,
    AddVilla,
  },
});
</script>

<template>
  <BreadCrumb PageTitle="Edit Event" />
  <EditEvent />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import EditEvent from "../../components/Events/EditEvent.vue";

export default defineComponent({
  name: "EditEventPage",
  components: {
    BreadCrumb,
    EditEvent,
  },
});
</script>
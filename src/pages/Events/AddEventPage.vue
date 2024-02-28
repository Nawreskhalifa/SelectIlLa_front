<template>
  <BreadCrumb PageTitle="Add New Event" />
  <AddEvent />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import AddEvent from "../../components/Events/AddEvent.vue";

export default defineComponent({
  name: "AddEventPage",
  components: {
    BreadCrumb,
    AddEvent,
  },
});
</script>
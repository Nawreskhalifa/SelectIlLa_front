<template>
  <EventDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EventDetails from "../../components/Events/EventDetails.vue";

export default defineComponent({
  name: "EventDetailsPage",
  components: {
    EventDetails,
  },
});
</script>

<template>
  <EditEvent />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditEvent from "../../components/Events/EditEvent.vue";

export default defineComponent({
  name: "EditEventPage",
  components: {
    EditEvent,
  },
});
</script>

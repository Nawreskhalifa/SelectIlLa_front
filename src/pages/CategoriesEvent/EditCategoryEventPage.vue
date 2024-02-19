<template>
  <EditCategoryEvent />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditCategoryEvent from "../../components/CategoriesEvent/EditCategoryEvent.vue";

export default defineComponent({
  name: "EditCategoryEventPage",
  components: {
    EditCategoryEvent,
  },
});
</script>

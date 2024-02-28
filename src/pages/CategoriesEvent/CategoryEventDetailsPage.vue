<template>
  <CategoryEventDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CategoryEventDetails from "@/components/CategoriesEvent/CategoryEventDetails.vue";

export default defineComponent({
  name: "CategoryEventDetailsPage",
  components: {
    CategoryEventDetails,
  },
});
</script>

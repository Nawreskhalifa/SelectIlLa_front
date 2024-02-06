<template>
  <BreadCrumb PageTitle="Edit Category" />
  <EditCategoryEvent />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import EditCategoryEvent from "../../components/CategoriesEvent/EditCategoryEvent.vue";

export default defineComponent({
  name: "EditCategoryEventPage",
  components: {
    BreadCrumb,
    EditCategoryEvent,
  },
});
</script>

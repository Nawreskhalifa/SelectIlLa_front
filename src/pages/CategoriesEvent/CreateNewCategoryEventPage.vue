<template>
  <BreadCrumb PageTitle="Create New Category" />
  <CreateNewCategoryEvent />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import CreateNewCategoryEvent from "../../components/CategoriesEvent/CreateNewCategoryEvent.vue";

export default defineComponent({
  name: "CreateNewCategoryEventPage",
  components: {
    BreadCrumb,
    CreateNewCategoryEvent,
  },
});
</script>

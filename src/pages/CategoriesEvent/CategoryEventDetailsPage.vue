<template>
  <BreadCrumb PageTitle="Category Details" />
  <CategoryEventDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import CategoryEventDetails from "@/components/CategoriesEvent/CategoryEventDetails.vue";

export default defineComponent({
  name: "CategoryEventDetailsPage",
  components: {
    BreadCrumb,
    CategoryEventDetails,
  },
});
</script>

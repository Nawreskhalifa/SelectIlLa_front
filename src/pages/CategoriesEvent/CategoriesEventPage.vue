<template>
  <BreadCrumb PageTitle="Categories of Event" />
  <CategoriesEventList />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import CategoriesEventList from "../../components/CategoriesEvent/CategoriesEventList.vue";

export default defineComponent({
  name: "CategoriesEventPage",
  components: {
    BreadCrumb,
    CategoriesEventList ,
  },
});
</script>

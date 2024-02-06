<template>
  <BreadCrumb PageTitle="Add Villa Category" />
  <AddVillaCategory />
</template>

<script>
import AddVillaCategory from "@/components/VillaCategories/AddVillaCategory/AddVillaCategory.vue";
import BreadCrumb from "../../../components/Common/BreadCrumb.vue";

export default {
  components: {
    AddVillaCategory,
    BreadCrumb,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

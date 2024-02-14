<template>
  <BreadCrumb PageTitle=" Categories List" />
  <CategoriesList />
</template>

<script>
import CategoriesList from "@/components/VehicleCategories/CategoriesList/CategoriesList.vue";
import BreadCrumb from "../../../components/Common/BreadCrumb.vue";

export default {
  components: {
    CategoriesList,
    BreadCrumb,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

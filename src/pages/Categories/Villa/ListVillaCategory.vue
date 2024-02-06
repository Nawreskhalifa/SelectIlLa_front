<template>
  <BreadCrumb PageTitle="  Villa Category List" />
  <villaCategoryList />
</template>

<script>
import villaCategoryList from "@/components/VillaCategories/CategoriesVillaList/CategoriesVillaList.vue";
import BreadCrumb from "../../../components/Common/BreadCrumb.vue";

export default {
  components: {
    villaCategoryList,
    BreadCrumb,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

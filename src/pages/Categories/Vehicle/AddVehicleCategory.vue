<template>
  <BreadCrumb PageTitle="Add vehicle Category" />
  <AddVehicleCategory></AddVehicleCategory>
</template>

<script>
import AddVehicleCategory from "@/components/VehicleCategories/AddCategory/AddCategory.vue";
import BreadCrumb from "../../../components/Common/BreadCrumb.vue";

export default {
  components: {
    AddVehicleCategory,
    BreadCrumb,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

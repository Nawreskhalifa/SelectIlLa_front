<template>
    <BreadCrumb PageTitle="Add Customer" />
    <AddCustomer />
  </template>

  <script lang="ts">
  import { defineComponent } from "vue";

  import BreadCrumb from "../../../components/Common/BreadCrumb.vue";
  import AddCustomer from "../../../components/Users/Customers/AddCustomer.vue";

  export default defineComponent({
    name: "AddCustomerPage",
    components: {
      BreadCrumb,
      AddCustomer,
    },
  });
  </script>
<template>
  <BreadCrumb PageTitle="Customers List" />
  <CustomersList />
</template>

<script>
import { defineComponent } from "vue";

import BreadCrumb from "../../../components/Common/BreadCrumb.vue";
import CustomersList from "../../../components/Users/Customers/Customers.vue";

export default defineComponent({
  name: "CustomersListPage",
  components: {
    BreadCrumb,
    CustomersList,
  },
});
</script>

<template>
  <BreadCrumb PageTitle="Customer Details" />
  <CoverImage />
  <CustomerDetail :customerId="customerId"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../../components/Common/BreadCrumb.vue";
import CustomerDetail from "../../../components/Users/Customers/CustomerDetail.vue";
export default defineComponent({
  name: "CustomerDetailPage",
  components: {
    BreadCrumb,
    CustomerDetail,
  },
  props: {
    // Define the 'customer' prop
    customerId: {
      type: [Number],
      required: true,
    },}
});
</script>

<template>
  <BreadCrumb PageTitle="Edit Customer" />
  <EditCustomer />
</template>

<script>
import { defineComponent } from "vue";

import BreadCrumb from "../../../components/Common/BreadCrumb.vue";
import EditCustomer from "../../../components/Users/Customers/EditCustomer.vue";

export default defineComponent({
  name: "EditCustomerPage",
  components: {
    BreadCrumb,
    EditCustomer,
  },
});
</script>

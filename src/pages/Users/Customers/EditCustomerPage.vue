<template>
  <EditCustomer />
</template>

<script>
import { defineComponent } from "vue";

import EditCustomer from "../../../components/Users/Customers/EditCustomer.vue";

export default defineComponent({
  name: "EditCustomerPage",
  components: {
    EditCustomer,
  },
});
</script>

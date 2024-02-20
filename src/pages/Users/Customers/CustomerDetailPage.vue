<template>
  <CustomerDetail :customerId="customerId" />
</template>

<script>
import { defineComponent } from "vue";

import CustomerDetail from "../../../components/Users/Customers/CustomerDetail.vue";
export default defineComponent({
  name: "CustomerDetailPage",
  components: {
    CustomerDetail,
  },
  data() {
    return {
      customerId:
        this.$route.params && this.$route.params.customerId
          ? this.$route.params.customerId
          : null,
    };
  },
  async mounted() {
    if (this.$route.params && this.$route.params.customerId)
    this.customerId = this.$route.params.customerId;
  },
});
</script>

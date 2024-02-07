<template>
  <BreadCrumb PageTitle="Customer Details" />
  <CustomerDetail :customerId="customerId" />
</template>

<script>
import { defineComponent } from "vue";

import BreadCrumb from "../../../components/Common/BreadCrumb.vue";
import CustomerDetail from "../../../components/Users/Customers/CustomerDetail.vue";
export default defineComponent({
  name: "CustomerDetailPage",
  components: {
    BreadCrumb,
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
      console.log("ddhdjk", this.$route.params.customerId);
    this.customerId = this.$route.params.customerId;
    console.log("aaa", this.customerId);

    // await this.findCustomer(this.customerId);
  },
});
</script>

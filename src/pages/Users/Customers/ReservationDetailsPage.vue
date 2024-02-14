<template>
  <BreadCrumb PageTitle="Reservation Details" />
  <ReservationDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../../components/Common/BreadCrumb.vue";
import ReservationDetails from "../../../components/Users/Customers/Reservation/ReservationDetails.vue";

export default defineComponent({
  name: "ReservationDetailsPage",
  components: {
    BreadCrumb,
    ReservationDetails,
  },
});
</script>

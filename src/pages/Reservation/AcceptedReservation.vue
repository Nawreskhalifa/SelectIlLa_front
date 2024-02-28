<template>
  <BreadCrumb PageTitle="Accepted Reservation" />
  <AcceptedRes />
</template>

<script>
import AcceptedRes from "@/components/Reservations/AcceptedReservation/AcceptedReservations.vue";
import BreadCrumb from "../../components/Common/BreadCrumb.vue";

export default {
  components: {
    AcceptedRes,
    BreadCrumb,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

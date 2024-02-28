<template>
  <BreadCrumb PageTitle="Reservation List" />
  <ReservationList />
</template>

<script>
import ReservationList from "@/components/Reservations/ReservationList/ReservationList.vue";
import BreadCrumb from "../../components/Common/BreadCrumb.vue";

export default {
  components: {
    ReservationList,
    BreadCrumb,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

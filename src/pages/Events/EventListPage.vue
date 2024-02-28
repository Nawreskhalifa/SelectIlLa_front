<template>
  <BreadCrumb PageTitle="Events" />
  <ListEvents />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import ListEvents from "../../components/Events/ListEvents.vue";

export default defineComponent({
  name: "EventListPage",
  components: {
    BreadCrumb,
    ListEvents,
  },
});
</script>
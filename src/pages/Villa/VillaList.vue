<template>
  <BreadCrumb PageTitle="Villas" />
  <VillaList />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import VillaList from "../../components/Villa/VillaGrid/VillaGrid.vue";

export default defineComponent({
  name: "ProductsGridPage",
  components: {
    BreadCrumb,
    VillaList,
  },
});
</script>

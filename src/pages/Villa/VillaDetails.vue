<template>
   <VillaDetails />
</template>

<script lang="ts">
import { defineComponent } from "vue";

 import VillaDetails from "../../components/Villa/VillaDetailsPage/VillaDetailsPage.vue";

export default defineComponent({
  name: "ProductsGridPage",
  components: {
     VillaDetails,
  },
});
</script>

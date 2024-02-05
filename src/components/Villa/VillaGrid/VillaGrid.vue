<template>
  <div class="row">
    <div class="col-lg-4 col-xxxl-3">
      <VillaFiltre @newFiltredData="filtredData" />
    </div>
    <div class="col-lg-8 col-xxxl-9">
      <div class="row">
        <VillaItem
          v-for="villa in villas"
          :key="villa.id"
          :villa="villa"
          @itemDeleted="handleItemDeleted"
          @itemUpdated="handleItemUpdated"
        />
      </div>

      <div
        class="pagination-area d-md-flex mb-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">{{ villas.length }}</span> out of
          <span class="fw-bold">{{ villas.length }}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link active" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import VillaItem from "./SingleItem.vue";
import VillaFiltre from "./VillaFiltre.vue";
import { fetchVilla, deleteVilla } from "@/services/apiService";
import { search } from "@/services/apiService";

export default defineComponent({
  name: "ProductsGrid",
  components: {
    VillaFiltre,
    VillaItem,
  },
  setup() {
    const villas = ref([]);

    const fetchData = async () => {
      try {
        const data = await fetchVilla();
        villas.value = data.data;
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    const filtredData = async (searchInput) => {
      try {
        const data = await search("villas", "make", "$contains", searchInput);
        const reactiveFoo = reactive(data.data);
        villas.value = data.data;

        console.log(reactiveFoo);
        console.log(data.data);
      } catch (error) {
        console.error("Error in filtredData:", error);
      }
    };

    const handleItemDeleted = async (villaId) => {
      try {
        villas.value = villas.value.filter((item) => item.id !== villaId);
        await deleteVilla(villaId);
      } catch (error) {
        console.error("Error handling item deletion:", error);
      }
    };

    const handleItemUpdated = () => {
      fetchData();
    };

    fetchData();

    return {
      villas,
      fetchData,
      filtredData,
      handleItemDeleted,
      handleItemUpdated,
    };
  },
});
</script>

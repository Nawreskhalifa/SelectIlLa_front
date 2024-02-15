<template>
  <div class="row">
    <div class="col-lg-4 col-xxxl-3">
     <VillaFiltre @newFiltredData="filtredData" @allSelected="selectedData" @filtreBycategory="byCategory" />

      <div class="products-sidebar-filter bg-white letter-spacing mb-25" v-if="selected.length > 0">
        <div class="title" style="display: flex; flex-direction: row;">
          <h5 class="mb-0 fw-semibold text-secondary">Available Actions</h5>
          <div class="button"  style="display: flex; flex-direction: row;">
            <button class="active btn  " @click="deleteAll">
            <i class="fas fa-trash"></i>
            </button>
            <button class="active btn" @click="desactivateAll">
                <i class="fas fa-ban"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-xxxl-9">
      <div class="row" v-if="selected.length > 0">
        <VillaItem
          v-for="villa in selected"
          :key="villa.id"
          :villa="villa"
          :isSelected="true"
          @itemDeleted="handleItemDeleted"
          @itemUpdated="handleItemUpdated"
          @isActive="changeStatus"
        />
      </div>
      <div class="row" v-else>
        <VillaItem
          v-for="villa in villas"
          :key="villa.id"
          :villa="villa"
          @itemDeleted="handleItemDeleted"
          @itemUpdated="handleItemUpdated"
          @isActive="changeStatus"
        />
      </div>


      <div class="pagination-area d-md-flex mb-25 justify-content-between align-items-center">
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">{{ villas.length }}</span> out of
          <span class="fw-bold">{{ totalPages }}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" @click="fetchPreviousPage" aria-label="Previous">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': currentPage === pageNumber }">
              <a class="page-link" @click="fetchPage(pageNumber)">{{ pageNumber }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" @click="fetchNextPage" aria-label="Next">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <loading
      v-model:active="isLoading"
      :can-cancel="true"
       :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import VillaItem from "./SingleItem.vue";
import VillaFiltre from "./VillaFiltre.vue";
import { fetchVilla, deleteVilla, updateVilla } from "@/services/apiService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default defineComponent({
  name: "VillaGrid",
  components: {
    VillaFiltre,
    VillaItem,
    Loading
  },
  setup() {
     const villas = ref([]);
    const selected = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);

    const fetchData = async (start = 0, limit = 8) => {
      isLoading.value=true
      try {
        const data = await fetchVilla(start, limit);
        villas.value = data.data;
        totalPages.value = Math.ceil(data.meta.pagination.total / limit);
      } catch (error) {
        console.error("Error in fetchData:", error);
      } finally{
        isLoading.value = false
      }
    };
 const byCategory = (event) => {
  if (event.category !== "") {

    const categoryId = event.category.id;
    if (categoryId) {
      const filteredVillas = villas.value.filter((villa) => {
        if (
          villa.attributes &&
          villa.attributes.category_villas &&
          villa.attributes.category_villas.data
        ) {
          return villa.attributes.category_villas.data.some(
            (category) => category.id === categoryId
          );
        }
        return false;
      });
      villas.value = filteredVillas;
    }
  } else {
    fetchData();
  }
};

    const fetchPage = async (pageNumber) => {
      const start = (pageNumber - 1) * 8;
      await fetchData(start);
      currentPage.value = pageNumber;
    };

    const fetchNextPage = async () => {
      if (currentPage.value < totalPages.value) {
        await fetchPage(currentPage.value + 1);
      }
    };

    const fetchPreviousPage = async () => {
      if (currentPage.value > 1) {
        await fetchPage(currentPage.value - 1);
      }
    };

    const selectedData = (event ) => {
      if(event){
        selected.value = [...villas.value];
      }else{
        selected.value = [];
      }
      console.log('selectedData' , selected.value)
    };

    const changeStatus = (event) => {
  villas.value = villas.value.map((item) => {
    if (item.id === event.id) {
      item.attributes.isActive = event.status;
    }
    return item;
  });
};
const deleteAll = async ()=>{
  isLoading.value = true;
  for (const item of selected.value) {
    try {
      await deleteVilla(item.id);
    this.villas.value = []
    } catch (error) {
      console.error("Error updating villa:", error);
    }
  }

  isLoading.value = false;
}
const desactivateAll = async () => {
  isLoading.value = true;
  const updatedData = {
    data: {
      isActive: true,
    },
  };

  for (const item of selected.value) {
    try {
      await updateVilla(item.id, updatedData);
      item.attributes.isActive = true;
    } catch (error) {
      console.error("Error updating villa:", error);
    }
  }

  isLoading.value = false;
};

    const filtredData = async (searchInput) => {
      try {
        console.log(searchInput)
        if (searchInput.trim()) {
          villas.value = villas.value.filter(villa =>
            villa.attributes.name.toLowerCase().includes(searchInput.toLowerCase())
          );
        } else {
          await fetchData();
        }
      } catch (error) {
        console.error("Error in filtredData:", error);
      }
    };
    const handleItemDeleted = async (villaId) => {
      try {
        villas.value = villas.value.filter((villa) => villa.id !== villaId);
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
      selected,
      isLoading,
      currentPage,
      totalPages,
      changeStatus,
      fetchData,
      fetchPage,
      fetchNextPage,
      fetchPreviousPage,
      selectedData,
      filtredData,
      deleteAll,
      byCategory,
      handleItemDeleted,
      handleItemUpdated,
      desactivateAll
    };
  },
});
</script>

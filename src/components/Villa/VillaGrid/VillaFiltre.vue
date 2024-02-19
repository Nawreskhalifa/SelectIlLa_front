<template>
  <div class="products-sidebar-filter bg-white letter-spacing mb-25">
    <div
      class="title"
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      "
    >
      <h5 class="mb-0 fw-semibold text-secondary">Options</h5>
      <div>
         <!-- <div class="checkbox-wrapper">
          <input type="checkbox" id="selectAllCheckbox" v-model="selectAll"  />
          <label class="checkbox-label" for="selectAllCheckbox">
             <i v-if="selectAll" class="fas fa-check"></i>
          </label>
        </div> -->
<div class="dropdown">
                  <button
                    class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="flaticon-dots"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <!-- <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click.prevent="openEdit(partner)"
                        ><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Add</a
                      >
                    </li> -->
                     <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        ><i
                          class="fas fa-check lh-1 me-8 position-relative top-1"
                        ></i>
                        Select  All </a
                      >
                    </li>
                     <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        ><i
                          class="flaticon-delete lh-1 me-8 position-relative top-1"
                        ></i>
                        Delete All </a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                         ><i
                          class="fas fa-ban lh-1 me-8 position-relative top-1"
                        ></i>
                        Disable All </a
                      >
                    </li>
                  </ul>
                </div>
      </div>

    </div>
      <router-link to="/addvilla" class="btn btn-primary d-block w-100 mt-15 mb-25">ADD VILLA</router-link>

    <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">Search</h6>
      <div class="search-box -relative mb-15">
        <input
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search product"
          v-model="searchInput"
        />
      </div>
    </div>
    <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">Categories</h6>
       <ul class="categories-list ps-0 mb-0 list-unstyled">
  <li class="cat" v-if="categories.length > 0">
    <span class="d-block fs-md-15 fw-medium" @click="byCategory()">All</span>
        <span class="d-block fw-medium text-muted">{{ totalVehiclesCount  }}</span>

  </li>
  <li v-for="category in categoriesWithVehicles" :key="category.id" @click="byCategory(category)" class="cat">
     <span class="d-block fs-md-15 fw-medium">{{ category.attributes.Name }}</span>
    <span class="d-block fw-medium text-muted">{{ category.attributes.villas.data.length }}</span>
   </li>
</ul>

    </div>
  </div>

</template>

<script>
import { fetchVillaCategories } from "@/services/apiService";

export default {
  data() {
    return {
      categories: [],
      searchInput: "",
      selectAll: false,
    };
  },
  watch: {
    async searchInput(newValue, oldValue) {
      this.$emit("newFiltredData", newValue);
    },
    selectAll(newValue, prevValue) {
        this.$emit("allSelected", newValue);
    },
  },
  computed:{
  categoriesWithVehicles() {
      return this.categories.filter(category => category.attributes.villas.data.length > 0);
    },
      totalVehiclesCount() {
      return this.categories.reduce((total, category) => total + category.attributes.villas.data.length, 0);
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const data = await fetchVillaCategories("populate=*");
        this.categories = data.data;
        console.log("Categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
      byCategory(categorie=""){
        console.log("okay",categorie)
this.$emit("filtreBycategory", { category: categorie });
    }
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
 .checkbox-wrapper {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
}

.checkbox-wrapper input[type="checkbox"] {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox-label i {
  color: #333;
}


.cat:hover {
  background-color: #6560F0;
  border-radius: 5px;
  color: white
}

.cat {
  padding:6px;
  cursor: pointer;
}
</style>

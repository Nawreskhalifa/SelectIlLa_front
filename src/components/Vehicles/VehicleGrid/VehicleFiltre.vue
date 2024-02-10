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
      <h5 class="mb-0 fw-semibold text-secondary">Select All</h5>
      <div>
         <div class="checkbox-wrapper">
          <input type="checkbox" id="selectAllCheckbox" v-model="selectAll"  />
          <label class="checkbox-label" for="selectAllCheckbox">
             <i v-if="selectAll" class="fas fa-check"></i>
          </label>
        </div>
      </div>
    </div>
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
        <li class="cat">
          <span class="d-block fs-md-15 fw-medium">All</span>
        </li>
        <li v-for="category in categories" :key="category.id" @click="byCategory" class="cat">
          <span class="d-block fs-md-15 fw-medium">{{
            category.attributes.name
          }}</span>
          <span
            class="d-block fw-medium text-muted"
            v-if="
              category.attributes &&
              category.attributes.vehicles &&
              category.attributes.vehicles.data
            "
            >{{ category.attributes.vehicles.data.length }}
          </span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { fetchVehicleCategories } from "@/services/apiService";

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
  methods: {
    async fetchCategories() {
      try {
        const data = await fetchVehicleCategories("populate=*");
        this.categories = data.data;
        console.log("Categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
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
  background-color: #999999;
}

.cat {
  cursor: pointer;
}
</style>

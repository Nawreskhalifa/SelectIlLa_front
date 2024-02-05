<template>
  <div class="products-sidebar-filter bg-white letter-spacing mb-25">
    <div class="title">
      <h5 class="mb-0 fw-semibold text-secondary">Filters</h5>
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
        <button
          type="submit"
          class="bg-transparent text-primary transition p-0 border-0"
        >
          <i class="flaticon-search-interface-symbol"></i>
        </button>
      </div>
    </div>
    <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">Categories</h6>
      <ul class="categories-list ps-0 mb-0 list-unstyled">
        <li>
          <span class="d-block fs-md-15 fw-medium">All</span>
        </li>
        <li v-for="category in categories" :key="category.id">
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
import { fetchVillaCategories } from "@/services/apiService";
export default {
  data() {
    return {
      categories: [],
      searchInput: "",
    };
  },
  watch: {
    async searchInput(newValue, oldValue) {
      this.$emit("newFiltredData", newValue);
    },
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
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

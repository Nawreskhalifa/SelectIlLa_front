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
        <div class="onoffswitch">
          <input
            type="radio"
            name="onoffswitch"
            class="onoffswitch-checkbox"
            id="myonoffswitch"
            v-model="selectAll"
            value="false"
            checked
          />
          <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
          </label>
        </div>

        <div class="onoffswitch">
          <input
            type="radio"
            v-model="selectAll"
            value="true"
            name="onoffswitch"
            class="onoffswitch-checkbox"
            id="myonoffswitch2"
          />
          <label class="onoffswitch-label" for="myonoffswitch2">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
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
        <!-- <button
          type="submit"
          class="bg-transparent text-primary transition p-0 border-0"
        >
          <i class="flaticon-search-interface-symbol"></i>
        </button> -->
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
import { fetchVehicleCategories } from "@/services/apiService";
// search(table, field , query , searchInput)
export default {
  data() {
    return {
      categories: [],
      searchInput: "",
      selectAll: Boolean,
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

<style scope>
.onoffswitch {
  position: relative;
  width: 70px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  margin-bottom: 10px;
}
.onoffswitch-checkbox {
  display: none;
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #999999;
  border-radius: 20px;
}
.onoffswitch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  -moz-transition: margin 0.3s ease-in 0s;
  -webkit-transition: margin 0.3s ease-in 0s;
  -o-transition: margin 0.3s ease-in 0s;
  transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before,
.onoffswitch-inner:after {
  display: block;
  float: left;
  width: 50%;
  height: 30px;
  padding: 0;
  line-height: 30px;
  font-size: 14px;
  color: white;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.onoffswitch-inner:before {
  content: "OFF";
  padding-left: 10px;
  background-color: #3c3a56;
  color: #ffffff;
}
.onoffswitch-inner:after {
  content: "ON";
  padding-right: 10px;
  background-color: #eeeeee;
  color: #999999;
  text-align: right;
}
.onoffswitch-switch {
  display: block;
  width: 18px;
  margin: 6px;
  background: #ffffff;
  border: 2px solid #999999;
  border-radius: 20px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 38px;
  -moz-transition: all 0.3s ease-in 0s;
  -webkit-transition: all 0.3s ease-in 0s;
  -o-transition: all 0.3s ease-in 0s;
  transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
}
</style>

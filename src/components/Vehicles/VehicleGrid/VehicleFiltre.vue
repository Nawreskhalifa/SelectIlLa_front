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
    <div class="sidebar-item">
  <router-link to="/addvehicle" class="btn btn-primary d-block w-100 mt-15 mb-25">ADD VEHICLE</router-link>

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
      <h6 class="text-black fw-bold fs-md-15">Makes</h6>
      <ul class="categories-list ps-0 mb-0 list-unstyled">
        <li  @click="byCategory('All')" class="cat">
            <span class="d-block fs-md-15 fw-medium">All</span>
            <span class="d-block fw-medium text-muted">{{makes.length}}</span>
         </li>
<li v-for="item in makes" :key="item.id"  class="cat" @click="byCategory(item) ">
    <span class="d-block fs-md-15 fw-medium">{{item.attributes.name}}</span>
            <span class="d-block fw-medium text-muted">{{item?.attributes?.vehicles?.data?.length }}</span>
</li>
    <button
          v-if="moreMakesAvailable"
          type="button"
          class="see-more-btn mt-15 bg-transparent p-0 border-0 position-relative text-uppercase text-primary fw-medium fs-13"
          @click="seeMoreMakes"
        >
        See More
      </button>
      </ul>
      <!-- <button
        type="button"
        class="see-more-btn mt-15 bg-transparent p-0 border-0 position-relative text-uppercase text-primary fw-medium fs-13"
      >
        See More
      </button> -->
    </div>
    <!-- <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">Brands</h6>
      <ul class="brands-list ps-0 mb-0 list-unstyled">
        <li
          class="d-flex align-items-center justify-content-between text-paragraph"
          @click="byBrand('All')"
        >
          <div class="form-check mb-0">
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="allBrands"
            />
            <label class="form-check-label fs-md-15 fw-medium" for="allBrands">
              All
            </label>
          </div>
          <span class="d-block fw-medium text-muted">{{brands.length}}</span>
        </li>

        <li
          class="d-flex align-items-center justify-content-between text-paragraph"
          v-for="item in brands" :key="item.id"
          @click="byBrand(item)"
        >
          <div class="form-check mb-0">
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              id="sugarBrand"
            />
            <label class="form-check-label fs-md-15 fw-medium" for="sugarBrand">
              {{item.attributes.name}}
            </label>
          </div>
          <span class="d-block fw-medium text-muted">{{item.attributes?.vehicles?.data?.length}}</span>
        </li>
           <button
          v-if="moreBrandsAvailable"
          type="button"
          class="see-more-btn mt-15 bg-transparent p-0 border-0 position-relative text-uppercase text-primary fw-medium fs-13"
          @click="seeMoreBrands"
        >
        See More
      </button>
      </ul> -->
      <!-- <button
        type="button"
        class="see-more-btn mt-15 bg-transparent p-0 border-0 position-relative text-uppercase text-primary fw-medium fs-13"
      >
        See More
      </button> -->
     <!-- </div> -->
  </div>

</template>

<script>
import { fetchVehicleCategories ,fetchBrands,fetchMakes } from "@/services/apiService";

export default {
  data() {
    return {
      categories: [],
      searchInput: "",
      selectAll: false,
    makes: [],
      brands: [],
      makeLimit: 4,
      brandLimit: 4,
      moreMakesAvailable: true,
      moreBrandsAvailable: true
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
    // async fetchCategories() {
    //   try {
    //     const data = await fetchVehicleCategories("populate=*");
    //     this.categories = data.data;
    //     console.log("Categories:", this.categories);
    //   } catch (error) {
    //     console.error("Error fetching categories:", error);
    //   }
    // },
    async seeMoreMakes() {
      const { data } = await fetchMakes(`pagination[start]=${this.makes.length}&pagination[limit]=${this.makeLimit}`);
       this.makes = await this.makes.concat(data);
      console.log(this.makes,"okay")
      this.moreMakesAvailable = data.length === this.makeLimit;
    },
    async seeMoreBrands() {
      const { data } = await fetchBrands(`pagination[start]=${this.brands.length}&pagination[limit]=${this.brandLimit}`);
      this.brands = this.brands.concat(data);
      this.moreBrandsAvailable = data.length === this.brandLimit;
    },
async getMakesAndBrands(queryMakes="" , queryBrands=""){
  const {data} = await fetchMakes(queryMakes)
    this.makes = data
    console.log(this.makes,"oks")
  const br = await fetchBrands(queryBrands)
   this.brands = br.data
} ,
   async byCategory(category) {
    console.log(category)
  if (category === "All") {
    this.$emit("byCategory", "");
  } else {
    this.$emit("byCategory", category);
  }
},

    async byBrand(brand) {
  if (brand === "All") {
    this.$emit("byBrand", "");
  } else {
    this.$emit("byBrand", brand);
  }
}

  },
  mounted() {
    console.log("ok")
    this.seeMoreMakes();
    this.seeMoreBrands();
    this.getMakesAndBrands("pagination[start]=4&pagination[limit]=4","pagination[start]=4&pagination[limit]=5")
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

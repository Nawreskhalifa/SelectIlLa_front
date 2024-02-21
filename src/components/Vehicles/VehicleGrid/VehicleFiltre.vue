<template>
  <div class="products-sidebar-filter bg-white letter-spacing mb-25">

    <div class="sidebar-item" style="padding-top: 30px;">
      <router-link
        to="/addvehicle"
        class="btn btn-primary d-block w-100 mt-15 mb-25"
        >+ ADD VEHICLE</router-link
      >

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
      <ul
        class="categories-list ps-0 mb-0 list-unstyled"
        style="max-height: 200px; overflow-y: auto; padding-right: 5px"
      >
        <li @click="byCategory('All')" class="cat">
          <span class="d-block fs-md-15 fw-medium">All</span>
          <span class="d-block fw-medium text-muted">{{ allVehicles }}</span>
        </li>
        <li
          v-for="item in makesWithVehicles(makes)"
          :key="item.id"
          class="cat"
          @click="byCategory(item)"
        >
          <span class="d-block fs-md-15 fw-medium">{{
            item.attributes.name
          }}</span>
          <span class="d-block fw-medium text-muted">{{
            item?.attributes?.vehicles?.data?.length
          }}</span>
        </li>
      </ul>

    </div>
      <div class="sidebar-item" v-if="brands.length > 0">
    <h6 class="text-black fw-bold fs-md-15">Brands</h6>
    <ul class="brands-list ps-0 mb-0 list-unstyled" style="max-height: 200px; overflow-y: auto; padding-right: 5px">
      <li class="d-flex align-items-center justify-content-between text-paragraph">
        <div class="form-check mb-0">
          <input
            class="form-check-input shadow-none"
            type="radio"
            name="brandSelection"
            id="allBrands"
            @click="byBrand('All')"
          />
          <label class="form-check-label fs-md-15 fw-medium" for="allBrands">All</label>
        </div>
        <span class="d-block fw-medium text-muted">{{ allVehiclesByBrand }}</span>
      </li>

      <li
        v-for="item in filteredBrands"
        :key="item.id"
        class="d-flex align-items-center justify-content-between text-paragraph"
        @click="byBrand(item)"
      >
        <div class="form-check mb-0">
          <input
            class="form-check-input shadow-none"
            type="radio"
            name="brandSelection"
            :id="'brand_' + item.id"
          />
          <label :for="'brand_' + item.id" class="form-check-label fs-md-15 fw-medium">{{ item.attributes.name }}</label>
        </div>
        <span class="d-block fw-medium text-muted">{{ item.attributes?.vehicles?.data?.length }}</span>
      </li>
    </ul>
  </div>
    <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">Daily</h6>
      <div class="pricing-filter" id="pricing-filter">
        <div class="range-slider">
          <input
            type="range"
            class="min-price"
            min="1"
            v-model="minPrice"
            @change="updateRange"
          />
          <input
            type="range"
            class="max-price"
            max="1000"
            v-model="maxPrice"
            @change="updateRange"
          />
        </div>
        <div
          class="price-content d-flex align-items-center justify-content-between"
        >
          <span id="min-value" class="d-block text-black fw-medium fs-13">
            ${{ minPrice }}
          </span>
          <span id="max-value" class="d-block text-black fw-medium fs-13">
            ${{ maxPrice }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMakesFiltre } from "@/services/apiService";

export default {
  data() {
    return {
      categories: [],
      selectedMake: {},
      searchInput: "",
      selectAll: false,
      makes: [],
      brands: [],
      makeLimit: 4,
      brandLimit: 4,
      moreMakesAvailable: true,
      moreBrandsAvailable: true,
      minPrice: 10,
      maxPrice: 1000,
            debounceTimeout: null,

    };
  },
  watch: {
    minPrice(newValue, oldValue) {
      this.updateRange();
      this.debouncedPriceRangeChanged();
    },
    maxPrice(newValue, oldValue) {
      this.updateRange();
      this.debouncedPriceRangeChanged();
    },
    async searchInput(newValue, oldValue) {
      this.$emit("newFiltredData", newValue);
    },
    selectAll(newValue, prevValue) {
      this.$emit("allSelected", newValue);
    },
  },
  methods: {
    debouncedPriceRangeChanged() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.$emit("priceRangeChanged", { min: this.minPrice, max: this.maxPrice });
      }, 500);
    },
    makesWithVehicles(makes) {
      return makes.filter((item) => {
        return (
          item &&
          item.attributes.vehicles &&
          item.attributes.vehicles.data &&
          item.attributes.vehicles.data.length != 0
        );
      });
    },

    updateRange() {
      if (parseInt(this.minPrice) > parseInt(this.maxPrice)) {
        [this.minPrice, this.maxPrice] = [this.maxPrice, this.minPrice];
      }
    },
    async seeMoreMakes() {
      const { data } = await fetchMakesFiltre(
        `pagination[start]=${this.makes.length}&pagination[limit]=${this.makeLimit}`
      );
      this.makes = await this.makes.concat(data);
      console.log(this.makes, "okay");
      this.moreMakesAvailable = data.length === this.makeLimit;
    },
    async getMakesAndBrands() {
      const { data } = await fetchMakesFiltre();
      this.makes = data;
      console.log(this.makes, "oks");
    },

    async byCategory(category) {
      if (category === "All") {
        this.$emit("byCategory", "");
        this.brands = [];
      } else {
        if (
          category &&
          category.attributes &&
          category.attributes.brands &&
          category.attributes.brands.data
        )
          this.brands = category.attributes.brands.data;
        this.$emit("byCategory", category);
        this.selectedMake = category;
      }
    },


    byBrand(brand) {
      if (brand === 'All') {
        this.$emit('byCategory', this.selectedMake);
      } else {
         const radioButtons = document.getElementsByName('brandSelection');
        radioButtons.forEach(button => button.checked = false);

         const radioButton = document.getElementById('brand_' + brand.id);
        radioButton.checked = true;

        this.$emit('byBrand', brand);
      }
    },
   },
  mounted() {
    console.log("ok");
    this.seeMoreMakes();
    this.getMakesAndBrands();
  },
  computed: {
allVehiclesByBrand() {
      if (!this.selectedMake || !this.selectedMake.attributes?.vehicles?.data) return 0;
      return this.selectedMake.attributes.vehicles.data.length;
    },
     filteredBrands() {
      return this.brands.filter(brand => {
        return brand.attributes?.vehicles?.data?.length > 0;
      });
    },
    allVehicles() {
      let totalVehicles = 0;
      if (this.makes) {
        this.makes.forEach((item) => {
          if (item.attributes.vehicles && item.attributes.vehicles.data) {
            totalVehicles += item.attributes.vehicles.data.length;
          }
        });
      }
      return totalVehicles;
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: grey;
}
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
  background-color: #6560f0;
  border-radius: 5px;
  color: white;
}

.cat {
  padding: 6px;
  cursor: pointer;
}
</style>

<template>
  <div class="products-sidebar-filter bg-white letter-spacing mb-25">

    <div class="sidebar-item" style="padding-top: 30px;">
       <router-link to="/addvilla" class="btn btn-primary d-block w-100 mt-15 mb-25"> + ADD VILLA</router-link>



       <div class="search-box -relative mb-15 "  >
        <!-- <input
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search Vehicles"
          v-model="searchInput"
        /> -->
        <div class="input-group" style="display: flex; align-items: center;">
            <input
              type="text"
              class="form-control shadow-none fw-medium ps-1 pt-10 pe-0 letter-spacing "
              placeholder="Search"

              v-model="searchInput"
            />
            <button
              class="default-btn   transition border-0 text-white ps-12 pe-12 rounded-1"
              disabled
              style="height: 100%   !important; align-self: flex-end; z-index: 100; position:absolute; right: 0;"
              type="button"
            >
              <i class="flaticon-search-interface-symbol "></i>
            </button>
          </div>
      </div>
    </div>

    <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">Categories</h6>
       <ul class="categories-list ps-0 mb-0 list-unstyled" style="max-height: 200px; overflow-y: auto; padding-right: 5px ;  cursor:pointer">
  <li class="cat cursor-pointer" v-if="categories.length > 0 " @click="byCategory() , toggleCategorySelection()"  :class="{selected:  all}"  >
    <span class=" cursor-pointer fs-md-15 fw-medium"   >All</span>
        <span class="cursor-pointer fw-medium text-muted"   >{{ totalVehiclesCount  }} {{categories?.attributes?.villas.data}}</span>

  </li>
  <li v-for="category in categoriesWithVehicles" :key="category.id" @click="byCategory(category),toggleCategorySelection(category)"  class="cat" :class="{ selected: category.selected }" >
     <span class="  fs-md-15 fw-medium">{{ category.attributes.Name }}</span>
    <span class="  fw-medium text-muted">{{ category.attributes.villas.data.length }}</span>
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

      <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">NEW DAILY </h6>
      <div class="pricing-filter" id="pricing-filter">
        <div class="range-slider">
          <input
            type="range"
            class="min-price"
            min="1000"
            max="100000"
            v-model="minMsrp"
            @change="updateRangeMsrp"
          />
          <input
            type="range"
            class="max-price"
            max="40000"
            v-model="maxMsrp"
            @change="updateRangeMsrp"
          />
        </div>
        <div
          class="price-content d-flex align-items-center justify-content-between"
        >
          <span id="min-value" class="d-block text-black fw-medium fs-13">
            ${{ minMsrp }}
          </span>
          <span id="max-value" class="d-block text-black fw-medium fs-13">
            ${{ maxMsrp }}
          </span>
        </div>
      </div>
    </div>
    <div class="sidebar-item" style="display: flex ;  justify-content: start; align-items: center; width: 100% !important;" >
       <div style="width: 100%;">
         <h6 class="text-black fw-bold fs-md-15">Partner</h6>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 " style="width: 100%;" >
          <option v-for="partner in partners" :key="partner.id">{{partner.name}}</option>
        </select>
       </div>
    </div>

  </div>
</template>

<script>
import { fetchVillaCategories, fetchPartners} from "@/services/apiService";

export default {
  data() {
    return {
      categories: [],
       searchInput: "",
       partners:[],
      selectAll: false,
   all: true,
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

   computed:{
  categoriesWithVehicles() {
      return this.categories.filter(category => category.attributes.villas.data.length > 0);
    },

      totalVehiclesCount() {
      return this.categories.reduce((total, category) => total + category.attributes.villas.data.length, 0);
    }
  },
    methods: {
       async getPartner (){
     const data= await  fetchPartners()
     console.log(data,"partners")
     this.partners = data
     },
        debouncedPriceRangeChanged() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.$emit("priceRangeChanged", { min: this.minPrice, max: this.maxPrice });
      }, 500);
    },
          updateRange() {
      if (parseInt(this.minPrice) > parseInt(this.maxPrice)) {
        [this.minPrice, this.maxPrice] = [this.maxPrice, this.minPrice];
      }
    },
     toggleCategorySelection(category) {
  this.categories.forEach(cat => {
    if (cat !== category) {
      cat.selected = false;
    }
  });
  if (category) {
    this.all = false
    category.selected = !category.selected;
  } else {

    this.all = !this.all
  }
},
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
 async  mounted() {
  await this.getPartner()
  await   this.fetchCategories();
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
.cat.selected {
  background-color: #6560f0;
  color: #fff !important;
}
.cat.selected  > span {
   color: #fff !important;
}

.cat.selected:hover {
  background-color:  #6560f0;
    color: #fff !important;

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

.cat {
  padding: 6px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  cursor: pointer !important;
}

.cat:hover {
  background-color: #6560f0;
  border-radius: 5px;
}

.cat:hover > span {
  color: white !important;
    cursor: pointer;

}

</style>

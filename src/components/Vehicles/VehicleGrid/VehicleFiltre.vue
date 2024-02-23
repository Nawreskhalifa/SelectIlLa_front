<template>
  <div class="products-sidebar-filter bg-white letter-spacing mb-25">

    <div class="sidebar-item" style="padding-top: 30px;">
      <router-link
        to="/addvehicle"
        class="btn btn-primary d-block w-100 mt-15 mb-25"
        >+ ADD VEHICLE</router-link
      >

      <!-- <h6 class="text-black fw-bold fs-md-15">Search</h6> -->
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
      <h6 class="text-black fw-bold fs-md-15">Makes</h6>
      <ul
        class="categories-list ps-0 mb-0 list-unstyled"
        style="max-height: 200px; overflow-y: auto; padding-right: 5px ;"
      >
        <li @click="byCategory('All'), toggleCategorySelection()" class="cat"    :class="{ selected: all }">
          <span class="d-block fs-md-15 fw-medium">All</span>
          <span class="d-block fw-medium text-muted  " >{{ allVehicles }}</span>
        </li>
        <li
          v-for="item in makesWithVehicles(makes)"
          :key="item.id"

          class="cat"
          @click="byCategory(item),toggleCategorySelection(item)"
           :class="{ selected: item.selected}"
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
    <div class="sidebar-item">
      <h6 class="text-black fw-bold fs-md-15">MSRP</h6>
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

   <div class="sidebar-item" style="display: flex; justify-content: start; align-items: center; width: 100% !important;">
    <div style="width: 100%;">
      <h6 class="text-black fw-bold fs-md-15">Partner</h6>
      <select v-model="selectedPartner" class="project-select form-select shadow-none fw-semibold rounded-1" style="width: 100%;" @change="handlePartnerSelection">
        <option v-for="partner in partners" :key="partner.id" :value="partner.id">{{ partner.name }}</option>
      </select>
    </div>
  </div>

  <div class="sidebar-item" style="display: flex; justify-content: start; align-items: center; width: 100% !important;">
    <div style="width: 100%;">
      <h6 class="text-black fw-bold fs-md-15">Styles</h6>
      <select v-model="selectedStyle" class="project-select form-select shadow-none fw-semibold rounded-1" style="width: 100%;" @change="handleStyleSelection">
        <option v-for="style in styles" :key="style.id" :value="style.id">{{ style?.attributes?.name }}</option>
      </select>
    </div>
  </div>
      <div class="sidebar-item" style="display: flex ;  justify-content: start; align-items: center; width: 100% !important;" >
       <div style="width: 100%; ">
         <button @click="reset" class="btn " style="width: 100%; background-color: #6560f0;  color: white;"><i class="fas fa-refresh"> </i> </button>
       </div>
    </div>
 <!-- <div class="sidebar-item">
  <h6 class="text-black fw-bold fs-md-15">Tags</h6>
  <div class="chips-container">

    <div class="chip" v-for="t in tags  " :key="t.id" :value>{{ t.attributes.name }} <span class="chip-count"> </span></div>


   </div>
</div> -->



</div>
 </template>

<script>
import { fetchMakesFiltre ,fetchStyles ,fetchPartners ,fetchTags} from "@/services/apiService";

export default {
  data() {
    return {
      categories: [],
      selectedMake: {},
      searchInput: "",
      selectAll: false,
      makes: [],
      styles :[],
      all : true ,
      brands: [],
      partners:[],
  selectedPartner: null,
      selectedStyle: null,
      makeLimit: 4,
      brandLimit: 4,
      moreMakesAvailable: true,
      moreBrandsAvailable: true,
      minPrice: 10,
      maxPrice: 1000,
      minMsrp:10000,
      maxMsrp: 100000,
            debounceTimeout: null,
            tags : [] ,
            tag :''

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
  reset() {
   this.searchInput = "";
  this.selectedMake = {};
  this.selectAll = false;
  this.minPrice = 10;
  this.maxPrice = 1000;
  this.minMsrp = 10000;
  this.maxMsrp = 100000;
  this.selectedPartner = null;
  this.selectedStyle = null;
  this.all = true;

   this.$emit('reset', true);
},

 updateRangeMsrp() {
     this.$emit('msrpRangeChanged', { min: this.minMsrp, max: this.maxMsrp });
  },
 handlePartnerSelection() {
      this.$emit('partnerSelected', this.selectedPartner);
    },

    handleStyleSelection() {
      this.$emit('styleSelected', this.selectedStyle);
    },

    handleTagSelection() {
      this.$emit('tagSelected', this.tag);
    },
    async fetTags(){
 const data= await fetchTags()
 this.tags = data.data
    },
   async getStyles(){
  const data =await fetchStyles()
   this.styles = data.data
   console.log(this.styles,"styles")
   } ,
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
toggleCategorySelection(make) {
  this.makes.forEach(item => {
    if (item !== make) {
      item.selected = false;
    }
  });
  if (make) {
    this.all = false
    make.selected = !make.selected;
  } else {
    this.all = !this.all
  }
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
 async  mounted() {
    console.log("ok");
    await this.getPartner()
    await this.getStyles()
   await  this.seeMoreMakes();
   await  this.getMakesAndBrands();
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
 .chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.chip {
  background-color: #f0f0f0;
  color: #333;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chip:hover {
  background-color: #6560f0;
  color: white;
}

.chip-count {
  margin-left: 5px;
  font-weight: bold;
}

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
.cat.selected {
  background-color: #6560f0;
  color: #fff;
}

.cat.selected:hover {
  background-color:  #6560f0;
cursor: pointer   !important;
}
.cat.selected > span{
    color: white !important;
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
   cursor:pointer;
    pointer-events: auto;
}

.cat:hover > span {
  color: white !important;
 cursor:pointer;
    pointer-events: auto;
        font: bold;
   padding-left: 2px;
}

</style>

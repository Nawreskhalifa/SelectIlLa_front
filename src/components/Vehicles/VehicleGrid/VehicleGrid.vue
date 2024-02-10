<template>
  <div class="row" style=" position: relative !important; ">
    <div class="col-lg-4 col-xxxl-3">
      <VehicleFiltre
        @newFiltredData="filtredData"
        @allSelected="selectedData"
      />
      <div class="products-sidebar-filter bg-white letter-spacing mb-25" v-if="selected.length > 0 ">
        <div
          class="title"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h5 class="mb-0 fw-semibold text-secondary">Avaible Actions</h5>
          <div class="button" >
            <button class="active btn  " @click="deleteAll">
            <span>delete</span>   <i class="fas fa-trash"> </i>
            </button>
            <button class="active btn  " @click="desactivateAll">
              <span>disable</span> <i class="fas fa-ban"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-8 col-xxxl-9" >
      <div class="row" v-if="selected.length > 0">
        <VehicleItem
          v-for="vehicle in selected"
          :key="vehicle.id"
          :vehicle="vehicle"
          :isSelected="true"
          @itemDeleted="handleItemDeleted"
          @itemUpdated="handleItemUpdated"
        />
      </div>
      <div class="row" v-else>
        <VehicleItem
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          @itemDeleted="handleItemDeleted"
          @itemUpdated="handleItemUpdated"
          @isActive="changeStatus"
        />
      </div>


      <div
        class="pagination-area d-md-flex mb-25 justify-content-between align-items-center"
      >

        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">{{ vehicles.length }}</span> out of
          <span class="fw-bold">{{ vehicles.length }}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link"   aria-label="Previous" @click="fetchPreviousPage">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': currentPage === pageNumber }">
              <a class="page-link"   @click="fetchPage(pageNumber)">{{ pageNumber }}</a>
            </li>
            <li class="page-item">
              <a class="page-link"   aria-label="Next" @click="fetchNextPage">
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
import { ref } from "vue";
import VehicleItem from "./SingleItem.vue";
import VehicleFiltre from "./VehicleFiltre.vue";
import { fetchVehicles, deleteVehicle } from "@/services/apiService";
import { search } from "@/services/apiService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { updateVehicle } from "@/services/apiService";
export default {
  name: "ProductsGrid",
  components: {
    VehicleFiltre,
    VehicleItem,
    Loading,
  },

  data() {
    return {
      vehicles: [],
      newData: [],
      selected: [],
      isSelected: false,
      isLoading: false,
      fullPage: true,
      currentPage: 1,
    totalPages: []
    };
  },
  methods: {
    changeStatus(event) {
      this.vehicles = this.vehicles.map((item) => {
        if (item.id === event.id) {
          item.attributes.isActive = event.status;
        }
        return item;
      });
    },
    clickOnSelected() {
      console.log(
        "You already clicked on the selectt all desactivate it first "
      );
    },

    async fetchData(start = 0, limit = 8) {
  try {
    const data = await fetchVehicles(start, limit);
    this.vehicles = data.data;
    console.log(data,"data")
     this.totalPages = Math.ceil(data.meta.pagination.total / limit);
   console.log(this.totalPages,"toal")
   console.log(data.meta.pagination.total ,"total",limit , "limit")
  } catch (error) {
    console.error("Error in fetchData:", error);
  }
},


    // async filtredData(searchInput) {
    //   try {

    //      const data = await search("vehicles", "make", "$contains", searchInput);
    //     this.vehicles = data.data;
    //   } catch (error) {
    //     console.error("Error in filtredData:", error);
    //   }
    // },
    async filtredData(searchInput) {
  try {
    if (searchInput.trim()) {
       console.log("Search input:", searchInput);
      console.log("New data:", this.newData);
      this.vehicles = this.vehicles.filter(vehicle => vehicle.attributes.make.toLowerCase().includes(searchInput.toLowerCase()));
    } else {
      console.log("No search input provided.");
       await this.fetchData();
    }
    console.log("Filtered vehicles:", this.vehicles);
  } catch (error) {
    console.error("Error in filtredData:", error);
  }
},


    async handleItemDeleted(vehicleId) {
      try {
        this.vehicles = this.vehicles.filter((item) => item.id !== vehicleId);
        await deleteVehicle(vehicleId);
      } catch (error) {
        console.error("Error handling item deletion:", error);
      }
    },
    changeSelected() {
      this.isSelected = !this.isSelected;
      console.log(this.isSelected);
    },

    selectedData() {
      this.isSelected = !this.isSelected;
      if (this.isSelected) {
        this.selected = [...this.vehicles];
      } else {
        this.selected = [];
      }
    },
    handleItemUpdated() {
      this.fetchData();
    },
    desactivateAll() {
      this.isLoading = true;
      const updatedData = {
        data: {
          isActive: true,
        },
      };
      this.selected.forEach(async (item) => {
        const res = await updateVehicle(item.id, updatedData);
        if (res) {
          setTimeout(async () => {
            this.isLoading = false;
            item.attributes.isActive = true;

            await this.fetchData();
          }, 2000);
        }
      });
    },
    async fetchPage(pageNumber) {
      const start = (pageNumber - 1) * 8;
      this.fetchData(start);
      this.currentPage = pageNumber;
    },



    async fetchNextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchPage(this.currentPage + 1);
      }
    } ,
    async fetchPreviousPage() {
      if (this.currentPage > 1) {
        this.fetchPage(this.currentPage - 1);
      }
    },
  },
  watch: {

},
async created() {
 await   this.fetchData();
}
}
 </script>
 <style scoped>

 </style>

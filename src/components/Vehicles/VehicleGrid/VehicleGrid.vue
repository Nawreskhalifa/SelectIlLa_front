<template>
  <div class="row">
    <div class="col-lg-4 col-xxxl-3">
      <VehicleFiltre
        @newFiltredData="filtredData"
        @allSelected="selectedData"
      />
    </div>
    <div class="col-lg-8 col-xxxl-9">
      <div class="row" v-if="selected.length > 0">
        <VehicleItem
          v-for="vehicle in selected"
          style="
            background-color: blue;
            margin-left: 0.3px;
            margin-right: 0.3px;
          "
          :key="vehicle.id"
          :vehicle="vehicle"
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
              <a class="page-link" href="#" aria-label="Previous">
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link active" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import VehicleItem from "./SingleItem.vue";
import VehicleFiltre from "./VehicleFiltre.vue";
import { fetchVehicles, deleteVehicle } from "@/services/apiService";
import { search } from "@/services/apiService";

export default {
  name: "ProductsGrid",
  components: {
    VehicleFiltre,
    VehicleItem,
  },
  data() {
    return {
      vehicles: [],
      newData: [],
      selected: [],
      isSelected: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        const data = await fetchVehicles();
        this.vehicles = data.data;
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    },
    async filtredData(searchInput) {
      try {
        this.vehicles = [];
        console.log(this.vehicles);
        const data = await search("vehicles", "make", "$contains", searchInput);
        this.vehicles = data.data;
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
  },
  created() {
    this.fetchData();
  },
};
</script>

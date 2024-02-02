<template>
  <div class="row">
    <div class="col-lg-4 col-xxxl-3">
      <VehicleFiltre />
    </div>
    <div class="col-lg-8 col-xxxl-9">
      <div class="row">
        <!-- Use v-for to iterate over vehicles and render VehicleItem components -->
        <VehicleItem
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>

      <div
        class="pagination-area d-md-flex mb-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">{{ vehicles.length }}</span> out of
          <span class="fw-bold">1354</span> results
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
import { defineComponent } from "vue";
import VehicleItem from "./SingleItem.vue";
import VehicleFiltre from "./VehicleFiltre.vue";
import { fetchVehicles } from "@/services/apiService";

export default defineComponent({
  name: "ProductsGrid",
  components: {
    VehicleFiltre,
    VehicleItem,
  },
  data() {
    return {
      vehicles: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        // Assuming fetchVehicles returns an array of vehicles
        this.vehicles = await fetchVehicles();
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>

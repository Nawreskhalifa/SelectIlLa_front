<template>
  <div class="row" style="position: relative !important">
    <div class="col-lg-4 col-xxxl-3">
      <VehicleFiltre
        @newFiltredData="filtredData"
        @allSelected="selectedData"
        @byCategory="getByCat"
        @byBrand="getByBrand"
        @priceRangeChanged="handlePriceRangeChange"
        @msrpRangeChanged="handleMsrpRangeChanged"
      @partnerSelected="handlePartnerSelected"
      @styleSelected="handleStyleSelected"
      @reset="resetFilters"
      />
    </div>
    <div class="col-lg-8 col-xxxl-9">
      <div v-if="!isLoading" class="row">
        <div
          class="title"
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <span></span>
          <div>
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
                <li>
                  <a
                    v-if="!isAllSelected"
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="selectAll"
                    style="cursor: pointer"
                    ><i
                      class="fas fa-check lh-1 me-8 position-relative top-1"
                    ></i>
                    Select All
                  </a>
                  <a
                    v-if="isAllSelected"
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="deselectAll"
                    style="cursor: pointer"
                    ><i
                      class="fas fa-check lh-1 me-8 position-relative top-1"
                    ></i>
                    Deselect ALL
                  </a>
                </li>
                <li v-if="isAnySelected">
                  <a
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="deleteSelected"
                    ><i
                      class="flaticon-delete lh-1 me-8 position-relative top-1"
                    ></i>
                    Delete Selected
                  </a>
                </li>
                <li v-if="isAnySelected">
                  <a
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="desactiveteSelected"
                    ><i
                      class="flaticon-delete lh-1 me-8 position-relative top-1"
                    ></i>
                    Desactivate Selected
                  </a>
                </li>
                <li>
                  <a
                    v-if="!isAllSelected && !isAnySelected"
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="deleteAll"
                    ><i
                      class="flaticon-delete lh-1 me-8 position-relative top-1"
                    ></i>
                    Delete All
                  </a>
                </li>
                <li>
                  <a
                    v-if="!isAllSelected && isAllDeactivated && !isAnySelected"
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="deactivateAll"
                    ><i
                      class="fas fa-ban lh-1 me-8 position-relative top-1"
                    ></i>
                    Disable All
                  </a>
                </li>
                <li v-if="!isAllDeactivated">
                  <a
                    class="dropdown-item d-flex align-items-center"
                    @click.prevent="activateAll"
                  >
                    <i class="fas fa-eye lh-1 me-8 position-relative top-1"></i>
                    Enable All
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="col-sm-6 col-lg-6 col-xxxl-3"
          :class="{ seletedElement: isSelected }"
          v-for="vehicle in paginatedVehicles"
          :key="vehicle?.id"
        >
          <div
            class="card mb-25 border-0 rounded-0 bg-white single-product-box"
          >
            <div class="card-body p-0 letter-spacing">
              <div
                class="image position-relative"
                v-if="
                  vehicle &&
                  vehicle.attributes &&
                  vehicle.attributes.photos &&
                  vehicle.attributes.photos.data &&
                  vehicle.attributes.photos.data.length > 0
                "
              >
                <img
                  @click="toggleModal(vehicle.id)"
                  :src="
                    getFullImageUrl(
                      vehicle.attributes?.photos.data[vehicle?.attributes?.cover_image_index].attributes?.url
                    )
                  "
                  class="imagev"
                  alt="vehicle"
                  style="max-width: 100%; height: 200px"
                />

                <button
                  class="fav position-absolute bg-white rounded-circle border-0 p-0 d-inline-block"
                  type="button"
                  @click="toggleDeleteModal(vehicle.id)"
                >
                  <i
                    style="color: #6560f0 !important"
                    class="fa fa-trash"
                    aria-hidden="true"
                  ></i>
                </button>
                <button
                  v-if="isSelected"
                  class="bg-dark text-white rounded-1 border-1 p-2 d-inline-block"
                  type="button"
                >
                  <i class="fas fa-solid fa-check"></i>
                </button>
              </div>
              <div class="content p-20">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <h4 class="mb-10 fw-semibold fs-16 fs-lg-18">
                    <span>
                      {{
                        vehicle.attributes?.make?.data?.attributes?.name
                      }}</span
                    >
                    -
                    <span
                      >{{ vehicle.attributes.brand?.data?.attributes?.name }}
                    </span>
                  </h4>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      :checked="vehicle.selected"
                      @change="toggleSelected(vehicle)"
                    />
                  </div>
                </div>

                <div
                  class="mt-10 price d-flex align-items-center justify-content-between"
                >
                  <span class="text-primary fw-bold fs-md-15 fs-lg-16">{{
                    vehicle?.attributes?.daily
                  }} $ </span>
                  <div class="lockbtn reviews d-flex align-items-center">
                    <button
                      @click="active(false, vehicle.id)"
                      class="lock"
                      v-if="vehicle?.attributes?.isActive"
                    >
                      <i class="fas fa-solid fa-eye-slash"></i>
                    </button>
                    <button
                      @click="active(true, vehicle.id)"
                      class="lock"
                      v-if="!vehicle.attributes?.isActive"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
                <span>
                  published :
                  <span v-date="vehicle.attributes?.publishedAt"></span>
                </span>
                <br />
                <span>
                  updated : <span v-date="vehicle.attributes?.updatedAt"></span>
                </span>
                <button
                  type="button"
                  class="add-to-cart-btn text-center d-block mt-15 fw-medium transition w-100 rounded-1 position-relative"
                  @click="updateVehicle(vehicle?.id)"
                >
                  Update This
                  <i class="fas fa-edit"></i>
                </button>

              </div>
            </div>
            <DeleteModal
                  :show="deleteModalVisible"
                  :propToDelete="
                    vehicle.attributes?.brand?.data?.attributes?.name
                  "
                  @delete="handleDelete"
                />
          </div>
        </div>

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
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                aria-label="Previous"
                @click="fetchPreviousPage"
              >
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li
              class="page-item"
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              :class="{ active: currentPage === pageNumber }"
            >
              <a class="page-link" @click="fetchPage(pageNumber)">{{
                pageNumber
              }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a class="page-link" aria-label="Next" @click="fetchNextPage">
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
import VehicleFiltre from "./VehicleFiltre.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import DeleteModal from "@/components/Common/DeleteModal.vue";
import {
  allVehiclesApi,
  searchVehicle,
  fetchVehicles,
  updateVehicle,
  deleteVehicle,
} from "@/services/apiService";

export default {
  data() {
    return {
      originalVehicles: [],
      vehicles: [],
      isSelected: false,
      isLoading: false,
      fullPage: true,
      itemsPerPage: 2,
      currentPage: 1,
      deleteModalVisible: false,
      itemToRemove: "",
      make: "",
      brand: "",
      minPrice: 0,
      maxPrice: 0,
      searchQuery: "",
       partner: "",
      style: "" ,
      maxRange : 0 ,
minRange :0,

    };
  },
    watch: {
        partner(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
      style(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
      maxRange(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
  minRange(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
    make(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
    brand(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
    minPrice(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
    maxPrice(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
    searchQuery(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVehicles();
      }
    },
  },
  computed: {
    isAnySelected() {
      return this.vehicles.some((vehicle) => vehicle.selected);
    },
    isAllSelected() {
      return this.vehicles.every((vehicle) => vehicle.selected);
    },
    isAnyActive() {
      return this.vehicles.some((vehicle) => vehicle.attributes.isActive);
    },
    isAllDeactivated() {
      return !this.isAnyActive;
    },
    paginatedVehicles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.vehicles.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.vehicles.length / this.itemsPerPage);
    },
  },
  methods: {
 resetFilters() {
      this.category = "";
      this.minPrice = 1;
      this.maxPrice = 6000;
      this.searchQuery = "";
      this.minRooms = 0;
      this.maxRooms = 0;
      this.minNewDaily = 0;
      this.maxNewDaily = 0;
      this.minSleep = 0;
      this.maxSleep = 0;
      this.partner = "";
      this.fetchVehicles();
    },
    handleMsrpRangeChanged(range) {
      this.minRange = range.min
      this.maxRange =range.max
     },
    handlePartnerSelected(partner) {
      this.partner= partner
     },
    handleStyleSelected(style) {
      this.style = style
     },
 async fetchVehicles() {
  try {
    this.isLoading = true;
    const filters = {
      make: this.make,
      brand: this.brand,
      daily: [parseInt(this.minPrice), parseInt(this.maxPrice)],
      msrp: [parseInt(this.minRange), parseInt(this.maxRange)],
      partnerId: this.partner,
      styleId: this.style,
      searchQuery: this.searchQuery,
    };

     Object.keys(filters).forEach(key => {
      if (filters[key] === 0 || filters[key] === "") {
        delete filters[key];
      } else if (Array.isArray(filters[key]) && filters[key].some(value => value === 0 || value === "")) {
         filters[key] = filters[key].filter(value => value !== 0 && value !== "");
      }
    });

    console.log(filters);

    const data = await allVehiclesApi(filters);
    this.originalVehicles = data.data;
    this.vehicles = [...this.originalVehicles];
  } catch (error) {
    console.error("Error fetching vehicles:", error);
  } finally {
    this.isLoading = false;
  }
},


 handlePriceRangeChange(range) {
console.log(range)
       this.minPrice =range.min
       this.maxPrice= range.max
     },

    toggleModal(id) {
     this.$router.push({ name: 'vehicledetails', params: { id: id } });
  },

    activateAll() {
       this.vehicles.forEach(async (vehicle) => {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        await updateVehicle(vehicle.id, updatedData);
        vehicle.attributes.isActive = false;
      });
    },
    deselectAll() {
      this.isAllSelected = false;
      this.vehicles.forEach((vehicle) => {
        if (vehicle.selected) {
          vehicle.selected = false;
        }
      });
    },
    deleteSelected() {
      this.vehicles.forEach(async (vehicle,i) => {
        if (vehicle.selected) {
          await deleteVehicle(vehicle.id);
      this.vehicles.splice(i, 1);
        }
      });
    },
    selectAll() {
      this.isAllSelected = true;
      this.vehicles.forEach((vehicle) => {
        vehicle.selected = true;
      });
    },
    desactiveteSelected() {
      this.vehicles.forEach(async (vehicle) => {
        if (vehicle.selected) {
          const updatedData = {
            data: {
              isActive: true,
            },
          };
          vehicle.attributes.isActive = true;
          await updateVehicle(vehicle.id, updatedData);
        }
      });
    },
    toggleSelected(vehicle) {
      this.isAllSelected = true;
      vehicle.selected = !vehicle.selected;
    },
    deleteAll() {
      this.vehicles.forEach(async (vehicle) => {
        await deleteVehicle(vehicle.id);
      });
      this.vehicles = [];
    },
    deactivateAll() {
      this.vehicles.forEach(async (vehicle) => {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        vehicle.attributes.isActive = true;
        await updateVehicle(vehicle.id, updatedData);
      });
    },
    fetchPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    fetchNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    fetchPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async getByCat(event) {
    if(event != ""){
this.make=event.attributes.name

    }else{
const data = await allVehiclesApi("");
    this.originalVehicles = data.data;
    this.vehicles = [...this.originalVehicles];
    }
    },
    async getByBrand(brand) {
this.brand =             brand.id

    },
    async fetchData() {
      try {
        const data = await allVehiclesApi("");
        this.originalVehicles = data.data;
        this.vehicles = [...this.originalVehicles];
      } catch (error) {
        console.error("Error in fetchData:", error);
      } finally {
        this.isLoading = false;
      }
    },
 async filtredData(searchInput) {
  try {
    this.isLoading = true;
    this.searchQuery = searchInput;
  } catch (error) {
    console.error("Error in filtredData:", error);
  } finally {
    this.isLoading = false;
  }
}
,
    async active(value, id) {
      if (value === true) {
        const updatedData = {
          data: {
            isActive: true,
          },
        };
        this.vehicles = this.vehicles.map((item) => {
          if (item.id === id) {
            item.attributes.isActive = true;
          }
          return item;
        });
        const res = await updateVehicle(id, updatedData);
      } else {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        this.vehicles = this.vehicles.map((item) => {
          if (item.id === id) {
            item.attributes.isActive = false;
          }
          return item;
        });
        const res = await updateVehicle(id, updatedData);
      }
    },
    async handleDelete(confirmed) {
      if (confirmed && this.itemToRemove) {
        this.vehicles = this.vehicles.filter(
          (item) => item.id !== this.itemToRemove
        );
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        if (this.vehicles.slice(startIndex, endIndex).length === 0) {
          if (this.currentPage > 1) {
            this.currentPage--;
          }
        }

        await deleteVehicle(this.itemToRemove);
        this.vehicles = this.vehicles.filter(
          (item) => item.id !== this.itemToRemove
        );
      } else {
        console.log("Deletion cancelled.");
      }

      this.deleteModalVisible = false;
      this.itemToRemove = "";
    },
    toggleDeleteModal(id) {
      this.itemToRemove = id;
      this.deleteModalVisible = !this.deleteModalVisible;
    },
    updateVehicle(id) {
      this.$router.push({ name: "updatevehicle", params: { id: id } });
    },
    getFullImageUrl(relativePath) {
      const stockage = process.env.VUE_APP_STORAGE_URL;
      return `${stockage}${relativePath}`;
    },
  },
  directives: {
    date: {
      mounted(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
      updated(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchVehicles();
    this.isLoading= false
  },
  components: {
    VehicleFiltre,
    Loading,
    DeleteModal,
  },
};
</script>
<style scoped>
.imagev {
  width: 100%;
}
.lock {
  color: #2b2a3f;
  background-color: white;
  border: none;
  width: 50px;
  height: 40px;
  margin-right: 3px;
  border-radius: 40%;
}
.lockbtn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.single-product-box {
  transition: box-shadow 0.3s ease;
}

.single-product-box:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 6px 20px rgba(0, 0, 0, 0.19);
}
</style>

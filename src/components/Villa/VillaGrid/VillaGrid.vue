<template>
  <div class="row" style="position: relative !important">
    <div class="col-lg-4 col-xxxl-3">
      <VillaFiltreBased
        @newFiltredData="filtredData"
        @filtreBycategory="getByCat"
        @priceRangeChanged="handlePriceRangeChange"
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
          v-for="villa in paginatedVilla"
          :key="villa?.id"
        >
          <div
            class="card mb-25 border-0 rounded-0 bg-white single-product-box"
          >
            <div class="card-body p-0 letter-spacing">
              <div
                class="image position-relative"
                v-if="
                  villa &&
                  villa.attributes &&
                  villa.attributes.photos &&
                  villa.attributes.photos.data &&
                  villa.attributes.photos.data.length > 0
                "
              >
                <img
                  @click="toggleModal(villa.id)"
                  :src="
                    getFullImageUrl(
                      villa.attributes?.photos.data[0].attributes?.url
                    )
                  "
                  class="imagev"
                  alt="villa"
                  style="max-width: 100%; height: 200px"
                />

                <button
                  class="fav position-absolute bg-white rounded-circle border-0 p-0 d-inline-block"
                  type="button"
                  @click="toggleDeleteModal(villa.id)"
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
                        villa.attributes?.name
                      }}</span
                    >

                  </h4>
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      :checked="villa.selected"
                      @change="toggleSelected(villa)"
                    />
                  </div>
                </div>

                <div
                  class="mt-10 price d-flex align-items-center justify-content-between"
                >
                  <span class="text-primary fw-bold fs-md-15 fs-lg-16">{{
                    villa?.attributes?.daily
                  }} $ </span>
                  <div class="lockbtn reviews d-flex align-items-center">
                    <button
                      @click="active(false, villa.id)"
                      class="lock"
                      v-if="villa?.attributes?.isActive"
                    >
                      <i class="fas fa-solid fa-eye-slash"></i>
                    </button>
                    <button
                      @click="active(true, villa.id)"
                      class="lock"
                      v-if="!villa.attributes?.isActive"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
                <span>
                  published :
                  <span v-date="villa.attributes?.publishedAt"></span>
                </span>
                <br />
                <span>
                  updated : <span v-date="villa.attributes?.updatedAt"></span>
                </span>
                <button
                  type="button"
                  class="add-to-cart-btn text-center d-block mt-15 fw-medium transition w-100 rounded-1 position-relative"
                  @click="updateVilla(villa?.id)"
                >
                  Update This
                  <i class="fas fa-edit"></i>
                </button>

              </div>
            </div>
            <DeleteModal
                  :show="deleteModalVisible"
                  :propToDelete=" villa.attributes?.name"
                  @delete="handleDelete"
                />
          </div>
        </div>

      </div>

      <div
        class="pagination-area d-md-flex mb-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing <span class="fw-bold">{{ villas.length }}</span> out of
          <span class="fw-bold">{{ villas.length }}</span> results
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
import VillaFiltreBased from "./VillaFiltreBased.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import DeleteModal from "@/components/Common/DeleteModal.vue";
import {

    updateVilla,
   deleteVilla,
  AllVillaApi,
} from "@/services/apiService";

export default {
  data() {
    return {
      originalvillas: [],
      villas: [],
      isSelected: false,
      isLoading: false,
      fullPage: true,
      itemsPerPage:4,
      currentPage: 1,
      deleteModalVisible: false,
      itemToRemove: "",
      category: "" ,
      minPrice: 1,
      maxPrice: 6000,
      searchQuery: ""
    };
  },
    watch: {
    category(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVillasAp();
      }
    },
    minPrice(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVillasAp();
      }
    },
    maxPrice(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVillasAp();
      }
    },
    searchQuery(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchVillasAp();
      }
    },
  },
  computed: {
    isAnySelected() {
      return this.villas.some((villa) => villa.selected);
    },
    isAllSelected() {
      return this.villas.every((villa) => villa.selected);
    },
    isAnyActive() {
      return this.villas.some((villa) => villa.attributes.isActive);
    },
    isAllDeactivated() {
      return !this.isAnyActive;
    },
    paginatedVilla() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.villas.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.villas.length / this.itemsPerPage);
    },
  },
  methods: {
       async fetchVillasAp() {
      try {
        this.isLoading = true;
        const filters = {
          daily: [this.minPrice, this.maxPrice],
          name: this.searchQuery,
          category_villas: this.category,
          searchQuery: this.searchQuery,
        };

        const data = await AllVillaApi(filters);
        this.originalvillas = data.data;
        this.villas = [...this.originalvillas];
      } catch (error) {
        console.error('Error fetching villas:', error);
      } finally {
        this.isLoading = false;
      }
    },

  //      async fetchVehicles() {
  // try {
  //   this.isLoading = true;
  //   const filters = {
  //     make:this.make,
  //     brand: this.brand,
  //       daily: [parseInt( this.minPrice), parseInt(this.maxPrice)],
      // minPrice: this.minPrice,
      // maxPrice: this.maxPrice,
//       searchQuery: this.searchQuery,
//     };
//             console.log(filters,"daily")

//     const data = await allVehiclesApi(filters);
//     this.originalVehicles = data.data;
//     this.villas = [...this.originalVehicles];
//   } catch (error) {
//     console.error("Error fetching villas:", error);
//   } finally {
//     this.isLoading = false;
//   }
// },

 handlePriceRangeChange(range) {
console.log(range)
       this.minPrice =range.min
       this.maxPrice= range.max
     },

    toggleModal(id) {
     this.$router.push({ name: 'villadetails', params: { id: id } });
  },

    activateAll() {
      this.villas.forEach(async (villa) => {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        await updateVilla(villa.id, updatedData);
        villa.attributes.isActive = false;
      });
    },
    deselectAll() {
      this.isAllSelected = false;
      this.villas.forEach((villa) => {
        if (villa.selected) {
          villa.selected = false;
        }
      });
    },
    deleteSelected() {
      this.villas.forEach(async (villa,i) => {
        if (villa.selected) {
          await deleteVilla(villa.id);
      this.villas.splice(i, 1);
        }
      });
    },
    selectAll() {
      this.isAllSelected = true;
      this.villas.forEach((villa) => {
        villa.selected = true;
      });
    },
    desactiveteSelected() {
      this.villas.forEach(async (villa) => {
        if (villa.selected) {
          const updatedData = {
            data: {
              isActive: true,
            },
          };
          villa.attributes.isActive = true;
          await updateVilla(villa.id, updatedData);
        }
      });
    },
    toggleSelected(villa) {
      this.isAllSelected = true;
      villa.selected = !villa.selected;
    },
    deleteAll() {
      this.villas.forEach(async (villa) => {
        await deleteVilla(villa.id);
      });
      this.villas = [];
    },
    deactivateAll() {
      this.villas.forEach(async (villa) => {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        villa.attributes.isActive = true;
        await updateVilla(villa.id, updatedData);
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
    if(event.category != ""){
this.category=event.category
    }else{
this.isLoading = true
const data = await AllVillaApi(" ");
    this.originalvillas = data.data;
    this.villas = [...this.originalvillas];
    this.isLoading = false
    }
    },

    async fetchData() {
      try {
        const data = await AllVillaApi("");
        this.originalvillas = data.data;
        this.villas = [...this.originalvillas];
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
    console.log(searchInput)
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
        this.villas = this.villas.map((item) => {
          if (item.id === id) {
            item.attributes.isActive = true;
          }
          return item;
        });
        const res = await updateVilla(id, updatedData);
      } else {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        this.villas = this.villas.map((item) => {
          if (item.id === id) {
            item.attributes.isActive = false;
          }
          return item;
        });
        const res = await updateVilla(id, updatedData);
      }
    },
  async handleDelete(confirmed) {
  console.log(this.villas)
  if (confirmed && this.itemToRemove) {
       await deleteVilla(this.itemToRemove);
      this.villas = await this.villas.filter((villa) => villa.id !== this.itemToRemove);
    console.log("Deletion cancelled.");
      this.deleteModalVisible = false;
  this.itemToRemove = "";
  }


},


    toggleDeleteModal(id) {
     console.log(this.villas,"villas")
      this.itemToRemove = id;
      this.deleteModalVisible = !this.deleteModalVisible;
    },
    updateVilla(id) {
      this.$router.push({ name: "updatevilla", params: { id: id } });
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
    await this.fetchVillasAp("");
    this.isLoading= false
  },
  components: {
    VillaFiltreBased,
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

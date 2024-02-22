<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="search-box position-relative">
        <input
          @input="change"
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search Partner"
          v-model="searchInput"
        />
      </div>
        <div class="d-sm-flex align-items-center gap-2">
        <div class="reviews-select rounded-1 d-flex me-10 mt-10 mt-lg-0">
          <span class="text-muted fs-12 position-relative fw-medium text-uppercase">
            Ressources
          </span>
       <select class="form-select shadow-none bg-transparent border-0 fw-semibold rounded-0" v-model="selectedStatus" @change="handleOptionClick(selectedStatus)">
  <option value="All">All</option>
  <option value="Villas">Villas</option>
  <option value="Events">Events</option>
  <option value="Vehicles">Vehicles</option>
</select>
</div>

             <!-- <div class="dropdown">
    <button
      class="dropdown-toggle position-relative top-2 lh-1 bg-transparent border-0 shadow-none p-0 transition"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="flaticon-dots"></i>
    </button>
    <ul class="dropdown-menu">
      <li>
        <a
          class="dropdown-item d-flex align-items-center"
                  @click="allData"

        >
          <i class="flaticon-view lh-1 me-8"></i>
          Detail
        </a>
      </li>
      <li>
        <a
          class="dropdown-item d-flex align-items-center"
                    @click="vehicleData"

        >
          <i class="flaticon-view lh-1 me-8"></i>
          Vehicles
        </a>
      </li>
      <li  >
        <a
          class="dropdown-item d-flex align-items-center"
                    @click="eventData"

         >
          <i class="flaticon-pen lh-1 me-8"></i>
          Events
        </a>
      </li>
      <li  >
        <a
          class="dropdown-item d-flex align-items-center"
                   @click="villaData"

        >
          <i class="flaticon-delete lh-1 me-8"></i>
          Villas
         </a>
      </li>
    </ul>
  </div> -->
        <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
          :class="{ selected: allCheckboxesChecked }"
          @click="allData"
        >
          All
        </button>

        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
          :class="{ selected: vehicleSelected }"
          @click="vehicleData"
        >
          Vehicle
        </button>
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
          :class="{ selected: eventSelected }"
          @click="eventData"
        >
          Events
        </button>
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
          :class="{ selected: villaSelected }"
          @click="villaData"
        >
          Villas
        </button> -->
        <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
          <router-link
            to="/add-partner"
            class="btn btn-primary position-relative border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-primary fs-md-15 fs-lg-16 d-inline-block d-inline-block text-decoration-none"
          >
            Add Partner
            <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          </router-link>
          <!-- <select
              class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            >
              <option selected>All (32)</option>
              <option value="1">In Process</option>
              <option value="2">On Hold</option>
              <option value="3">Completed</option>
            </select>
            <div class="dropdown mt-10 mt-sm-0 ms-sm-10">
              <button
                class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="flaticon-dots"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="javascript:void(0);"
                    ><i
                      class="flaticon-view lh-1 me-8 position-relative top-1"
                    ></i>
                    View</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="javascript:void(0);"
                    ><i
                      class="flaticon-pen lh-1 me-8 position-relative top-1"
                    ></i>
                    Edit</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="javascript:void(0);"
                    ><i
                      class="flaticon-delete lh-1 me-8 position-relative top-1"
                    ></i>
                    Delete</a
                  >
                </li>
              </ul> -->
        </div>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Name
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                surname
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                phone
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Type Ressource
              </th>
              <!-- <th
              scope="col"
              class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
                Check
            </th> -->
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="partner in paginatedPartners" :key="partner.id">
              <td
                class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
              >
                <div class="d-flex align-items-center">
                  <!-- <div class="form-check mb-0">
                    <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                    />
                  </div> -->
                  <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                    <img
                      v-if="
                        partner &&
                        partner.user &&
                        partner.user.photo &&
                        partner.user.photo.url
                      "
                      :src="getFullImageUrl(partner.user.photo.url)"
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />
                    <img
                      v-else
                      src="../../../assets/guest.png"
                      class="rounded-circle me-8"
                      width="24"
                      height="24"
                      alt="user"
                    />

                    {{ partner.name }}
                  </div>
                </div>
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ partner.surname }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ partner.phone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      :checked="partner.vehicles.length > 0"
                      v-model="partner.hasVehicle"
                      disabled
                      class="form-check-input"
                    />
                    Vehicle
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      :checked="partner.villas.length > 0"
                      v-model="partner.hasVillas"
                      disabled
                      class="form-check-input"
                    />
                    Villas
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      :checked="partner.events.length > 0"
                      disabled
                      v-model="partner.hasEvents"
                      class="form-check-input"
                    />
                    Events
                  </label>
                </div>
              </td>
              <!--
               <td class="shadow-none lh-1 fw-medium text-paragraph">
                <i @click="openRessources(partner)" class="fas fa-eye" style="cursor: pointer;"></i>
              </td> -->
              <td
                class="shadow-none lh-1 fw-medium text-paragraph text-end pe-0"
              >
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
                        @click.prevent="openEdit(partner)"
                        ><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click.prevent="openDetails(partner)"
                        ><i
                          class="flaticon-eye lh-1 me-8 position-relative top-1"
                        ></i>
                        Details</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        @click.prevent="deletePartner(partner.id)"
                        ><i
                          class="flaticon-delete lh-1 me-8 position-relative top-1"
                        ></i>
                        Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <p class="mb-0 text-paragraph">
          Showing
          <span class="fw-bold">{{ paginatedPartners.length }}</span> out of
          <span class="fw-bold">{{ partners.length }}</span> results
        </p>
        <nav class="mt-15 mt-md-0">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click="prevPage"
              >
                <i class="flaticon-chevron-1"></i>
              </a>
            </li>
            <li class="page-item" v-for="page in maxPage" :key="page">
            <a
  class="page-link"
  :class="{ active: page === currentPage }"
  @click="currentPage = page"
>{{ page }}</a>
            </li>
            <li class="page-item">
              <a class="page-link" aria-label="Next" @click="nextPage">
                <i class="flaticon-chevron"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div v-if="partnerEdit">
    <!-- <UpdateModal
      :show="ModalVisible"
      :partner="partnerEdit"
      @close="closeModal"
     /> -->
  </div>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="'false'"
  />
</template>

<script>
import {
  fetchVillaCategories,
  deleteVillaCategory,
  search,
} from "@/services/apiService";
// import UpdateModal from "../AddPartner/EditPartners.vue";
import { fetchPartners, fetchUserByPartner } from "@/services/apiService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  name: "PartnersList ",
  components: {
    Loading,
  },
  data() {
    return {
      partners: [],
      checkList: {
        vehicle: true,
        villa: true,
        event: true,
      },
      currentPage: 1,
      pageSize: 3,
      isLoading: false,

      ModalVisible: false,
      ressourcesModalVisible: false,
      partnerEdit: "",
      searchInput: "",
      secondAllPartners: [],
    };
  },
  methods: {
   async   handleOptionClick(option) {
                     this.isLoading = true;

      switch (option) {
        case 'All':
         await  this.allData();

          break;
        case 'Villas':
         await  this.villaData();

          break;
        case 'Events':
       await    this.eventData();

          break;
        case 'Vehicles':
       await    this.vehicleData();

          break;
        default:
          break;
      }
                     this.isLoading = false;

    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      const maxPage = Math.ceil(this.partners.length / this.pageSize);
      if (this.currentPage < maxPage) {
        this.currentPage++;
      }
    },
    getFullImageUrl(relativePath) {
      const stockage = process.env.VUE_APP_STORAGE_URL;
      return `${stockage}${relativePath}`;
    },
    async fetchAllPartners() {
      try {
        const data = await fetchPartners();
        this.partners = data;
        this.secondAllPartners = data;
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    },
    async deletePartner(id) {
      this.partners = this.partners.filter((item) => {
        return item.id !== id;
      });
      const response = await deleteVillaCategory(id);
    },
    async openEdit(partner) {
      this.$router.push({name: 'updatepartner', params: { id : partner.id }})
      this.ModalVisible = !this.ModalVisible;
      this.partnerEdit = partner;
    },

    closeModal() {
      this.ModalVisible = !this.ModalVisible;
    },
    closeRessources() {
      this.ressourcesModalVisible = false;
    },
    async updated() {
      await this.fetchAllPartners();
      this.ModalVisible = !this.ModalVisible;
    },
    openDetails(partner) {
      console.log(partner);
      this.$router.push({ name: "partnerdetails", params: { id: partner.id } });
    },
    async change() {
      try {
        this.partners = await this.secondAllPartners;

        this.currentPage = 1;

        const searchInput = this.searchInput.trim().toLowerCase();
        if (searchInput !== "") {
          this.partners = this.partners.filter((partner) =>
            partner.name.toLowerCase().includes(searchInput)
          );
        } else {
          this.partners = await this.secondAllPartners;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async vehicleData() {
      await this.fetchAllPartners();

      this.checkList.event = false;
      this.checkList.villa = false;
      this.checkList.vehicle = true;

      this.partners = this.partners.filter((partner) => {
        return partner.vehicles.length > 0;
      });
    },
    async villaData() {
      await this.fetchAllPartners();

      this.checkList.event = false;
      this.checkList.villa = true;
      this.checkList.vehicle = false;

      this.partners = this.partners.filter((partner) => {
        return partner.villas.length > 0;
      });
    },
    async eventData() {
      await this.fetchAllPartners();

      this.checkList.event = true;
      this.checkList.villa = false;
      this.checkList.vehicle = false;

      this.partners = this.partners.filter((partner) => {
        return partner.events.length > 0;
      });
    },

    async allData() {
                  this.loading = true;

      this.checkList.event = true;
      this.checkList.villa = true;
      this.checkList.vehicle = true;
      await this.fetchAllPartners();
                        this.loading = false;

    },
    openRessources(partner) {
      this.partnerEdit = partner;
      this.ressourcesModalVisible = true;
    },
  },
  computed: {
    allCheckboxesChecked() {
      return (
        this.checkList.vehicle && this.checkList.villa && this.checkList.event
      );
    },
    vehicleSelected() {
      return this.checkList.vehicle === true;
    },
    villaSelected() {
      return this.checkList.villa === true;
    },
    eventSelected() {
      return this.checkList.event === true;
    },
    chechIfPartner() {
      if (this.partners) {
        const onlyPartner = this.partners.filter((item) => {
          if (item.user?.role?.name === "Partner") {
            return item;
          }
        });
        return onlyPartner;
      } else {
        return [];
      }
    },
    paginatedPartners() {
      if (this.partners) {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.chechIfPartner.slice(startIndex, endIndex);
      } else {
        return [];
      }
    },
    maxPage() {
      const totalPartners = this.chechIfPartner.length;
      return Math.ceil(totalPartners / this.pageSize);
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

    await this.fetchAllPartners();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.selected {
  background-color: rgb(89, 64, 231) !important ;
  color: white !important;
}
.active {
background-color: rgb(89, 64, 231) !important ;
  color: white !important;
}
</style>

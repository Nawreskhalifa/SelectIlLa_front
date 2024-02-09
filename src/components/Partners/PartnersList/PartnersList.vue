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

        <button
        class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
        type="button"
        :class="{ 'selected':allCheckboxesChecked }"
        @click="allData"
      >
        All
      </button>


      <button
      class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
      type="button"
      :class="{ 'selected':vehicleSelected }"
      @click="vehicleData"

    >
      Vehicle
     </button>
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
          :class="{ 'selected':eventSelected }"
          @click="eventData"
        >
          Events
         </button>
         <button
         class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
         type="button"
         :class="{ 'selected':villaSelected }"
         @click="villaData"
       >
         Villas
        </button>
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
              <th
              scope="col"
              class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
                Check
            </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="partner in partners" :key="partner.id">
              <td class="shadow-none lh-1 fw-medium text-paragraph">  {{ partner.name }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ partner.surname }}

              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ partner.phone }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">

  <div >
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

               <td class="shadow-none lh-1 fw-medium text-paragraph">
                <i @click="openRessources(partner)" class="fas fa-database" style="cursor: pointer;"></i>
              </td>
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
          Showing <span class="fw-bold">10</span> out of
          <span class="fw-bold">134</span> results
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
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
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
  <div v-if="partnerEdit">
    <UpdateModal
      :show="ModalVisible"
      :partner="partnerEdit"
      @close="closeModal"
     />
     <RessourcesModal
     :show="ressourcesModalVisible"
     @close="closeRessources"
     :ressources="partnerEdit"
    />
  </div>


</template>

<script>
import {
  fetchVillaCategories,
  deleteVillaCategory,
  search,
} from "@/services/apiService";
import UpdateModal from "../EditPartners/EditPartners.vue";
import {fetchPartners, fetchUserByPartner} from "@/services/apiService"
import RessourcesModal from '../Ressources/RessourcesModal.vue'
export default {
  name: "PartnersList ",
  components: {
    UpdateModal,
    RessourcesModal
  },
  data() {
    return {
      partners: [],
      checkList: {
      vehicle: true,
      villa: true,
      event: true
    },
      ModalVisible: false,
      ressourcesModalVisible : false,
      partnerEdit: "",
      searchInput: "",
     };
  },
  methods: {
    async fetchAllPartners() {
      const data = await fetchPartners();
       this.partners = data;
       console.log(this.partners,"ok")
    },
    async deletePartner(id) {
      this.partners = this.partners.filter((item) => {
        return item.id !== id;
      });
      const response = await deleteVillaCategory(id);
    },
    async openEdit(partner) {
      this.ModalVisible = !this.ModalVisible;
      this.partnerEdit = partner;
      },

    closeModal() {
      this.ModalVisible = !this.ModalVisible;
    },
    closeRessources(){
   this.ressourcesModalVisible = false
    },
    async updated() {
      await this.fetchAllPartners();
      this.ModalVisible = !this.ModalVisible;
    },
    async change() {
      try {
        console.log("searchinput", this.searchInput);
        const data = await search(
          "category-villas",
          "Name",
          "$contains",
          this.searchInput
        );
        console.log(data.data.data, "+ change ", this.categories);
        this.categories = data.data.data;
      } catch (error) {
        console.error("Error searching for vehicles:", error);
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
  this.checkList.event = true;
  this.checkList.villa = true;
  this.checkList.vehicle = true;
  await this.fetchAllPartners();
},
openRessources(partner){
    this.partnerEdit= partner
 this.ressourcesModalVisible  = true;
}
  },
  computed:{
    allCheckboxesChecked() {
      return this.checkList.vehicle && this.checkList.villa && this.checkList.event;
    },
    vehicleSelected(){
      return this.checkList.vehicle === true
    },
    villaSelected(){
      return this.checkList.villa === true

    },
     eventSelected(){
      return this.checkList.event === true

    }
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
  mounted() {
    this.fetchAllPartners();
  },
};
</script>

<style scoped>
.selected {
  background-color: darkslategray !important ;
  color: white !important;
}





</style>
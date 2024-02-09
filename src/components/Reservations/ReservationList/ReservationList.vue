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
          placeholder="Search Reservation"
          v-model="searchInput"
        />
      </div>
      <div class="d-sm-flex align-items-center">
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
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
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Pickup Date
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Drop-off Date
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Pickup Location
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Drop-off Location
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Phone
              </th>


            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id" @click="openModal(reservation)">
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.pickup_date }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.drop_off_date }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.pickup_location }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.drop_off_location }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.phone }}
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
       </div>
    </div>
    <div v-if="reserveData">
      <AcceptRef
      :show="ModalVisible"
      :dataProp="reserveData"
      @close="closeModal"
      @updated="updated"
    />
    </div>

  </div>
</template>

<script>
import { fetchReservations, deleteReservation ,fetchAcceptedReservations } from "@/services/apiService";
import AcceptRef from "../ReservationModal/ReservationModal.vue"
export default {
  name: "ReservationList",
  components:{
    AcceptRef
  },
  data() {
    return {
      reservations: [],
      searchInput: "",
      reserveData:"",
      ModalVisible:false
    };
  },
  methods: {
    async fetchReservationsData() {
      try {
        const data = await fetchReservations();
        this.reservations = data.data;
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    },
    async deleteReservation(id) {
      try {
        this.reservations = this.reservations.filter((reservation) => reservation.id !== id);
        await deleteReservation(id);
      } catch (error) {
        console.error(`Error deleting reservation with ID ${id}:`, error);
      }
    },
    async change() {
      // Handle search functionality
    },
    closeModal(){
 this.ModalVisible =  false
    } ,
    openModal(reservation){
    this.ModalVisible=!this.ModalVisible
    this.reserveData = reservation
    },
    async fetchAccepted(){
      const res = await fetchAcceptedReservations()
      console.log(res)
    }
  },
  mounted() {
    this.fetchReservationsData();
     this.fetchAccepted()
  },
};
</script>

<style>
th,
td {
   padding: 8px;
  text-align: left;
}

/* Apply styles to table cells when hovered */
table tbody tr:hover td {
  background-color: #f5f5f5;
}

</style>

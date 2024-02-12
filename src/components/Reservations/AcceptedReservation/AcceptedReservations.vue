<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <!-- Search input -->
    <div
      class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="search-box position-relative">
        <input
          @input="change"
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search Accepted Reservation"
          v-model="searchInput"
        />
      </div>
      <!-- Export button -->
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
      <!-- Table -->
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Customer Name
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Customer Email
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Customer Address
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Total Price
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reservation in paginatedReservations"
              :key="reservation.id"
              @click="openModal(reservation)"
            >
                 <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.customer.data.attributes.name }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph" v-if="reservation.attributes.customer.data.attributes.user && reservation.attributes.customer.data.attributes.user.data && reservation.attributes.customer.data.attributes.user.data.attributes">
                {{  reservation.attributes.customer.data.attributes.user.data.attributes.email }}
              </td>

              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.customer.data.attributes.name }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.reservation_demand.data.attributes.total_amount }}
              </td>
                <td class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.reservation_demand.data.attributes.createdAt }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">
                <button
                  @click="deleteReservation(reservation.id)"
                  class="bg-white rounded-circle"
                  style="border: none"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                            <!-- Existing button -->
<button @click="checkReservation(reservation.id)" class="bg-white rounded-circle" style="border: none">
  <i class="fas fa-eye" aria-hidden="true"></i>
</button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination
        :total="totalPages"
        v-model="currentPage"
        @input="fetchReservationsData"
      />
    </div>
    <div v-if="reserveData"></div>
  </div>
</template>

<script>
import {
  fetchAcceptedReservations,
  deleteAcceptedReservation,
} from "@/services/apiService";

export default {
  components: {},
  data() {
    return {
      reservations: [],
      searchInput: "",
      reserveData: "",
      ModalVisible: false,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredReservations() {
      return this.reservations.filter((reservation) => {
        const address =
          reservation.attributes.customer.data.attributes.address.toLowerCase();
        const phone =
          reservation.attributes.customer.data.attributes.phone.toLowerCase();
        const name =
          reservation.attributes.customer.data.attributes.name.toLowerCase();
        const search = this.searchInput.toLowerCase();
        return name.includes(search) || phone.includes(search);
      });
    },
    totalPages() {
      return Math.ceil(this.filteredReservations.length / this.itemsPerPage);
    },
    paginatedReservations() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredReservations.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchReservationsData() {
      try {
        const data = await fetchAcceptedReservations();
        this.reservations = data.data;
        console.log("accepted reservations ", this.reservations);
      } catch (error) {
        console.error("Error fetching accepted reservations:", error);
      }
    },
    async deleteReservation(id) {
      try {
        await deleteAcceptedReservation(id);
        this.reservations = this.reservations.filter(
          (reservation) => reservation.id !== id
        );
      } catch (error) {
        console.error(
          `Error deleting accepted reservation with ID ${id}:`,
          error
        );
      }
    },
    change() {
      this.currentPage = 1;
    },
    closeModal() {
      this.ModalVisible = false;
    },
    openModal(reservation) {
      this.ModalVisible = !this.ModalVisible;
      this.reserveData = reservation;
    },
  },
  mounted() {
    this.fetchReservationsData();
  },
};
</script>

<style>
th,
td {
  padding: 8px;
  text-align: left;
}

table tbody tr:hover td {
  background-color: #f5f5f5;
}
</style>

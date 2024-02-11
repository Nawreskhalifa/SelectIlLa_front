<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="search-box position-relative" style="display: flex; align-items: center;">
        <input
          @input="change"
          type="text"
          class="form-control shadow-none text-black rounded-0 border-0"
          placeholder="Search Reservation"
          v-model="searchInput"
        />
      </div>
      <div class="filter-btn">
        <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
          type="button"
          @click="toggleFilterByDate"
        >
          Filter by Date
          <i class="fas fa-filter position-relative ms-2 top-1"></i>
        </button>
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
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td class="shadow-none lh-1 fw-medium text-paragraph">{{ reservation.attributes.pickup_date }}</td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">{{ reservation.attributes.drop_off_date }}</td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">{{ reservation.attributes.pickup_location }}</td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">{{ reservation.attributes.drop_off_location }}</td>
              <td class="shadow-none lh-1 fw-medium text-paragraph">{{ reservation.attributes.phone }}</td>
              <td class="shadow-none lh-1 fw-medium text-paragraph btns">
                <button @click="showDetail(reservation)" class="btn-action detail">Detail</button>
                <button @click="acceptReservation(reservation)" class="btn-action accept">Accept</button>
                <button @click="refuseReservation(reservation)" class="btn-action refuse">Refuse</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"></div>
    </div>
    <div v-if="reserveData">
      <AcceptRef :show="ModalVisible" :dataProp="reserveData" @close="closeModal" @updated="updated" />
    </div>
  </div>
</template>

<script>
import { fetchReservations, deleteReservation, fetchAcceptedReservations } from "@/services/apiService";
import AcceptRef from "../ReservationModal/ReservationModal.vue";

export default {
  name: "ReservationList",
  components: {
    AcceptRef,
  },
  data() {
    return {
      reservations: [],
      searchInput: "",
      reserveData: "",
      ModalVisible: false,
    };
  },
  methods: {
    async fetchReservationsData() {
      try {
        const data = await fetchReservations();
        this.reservations = data.data;
        console.log(this.reservations, "reservation List ");
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
    closeModal() {
      this.ModalVisible = false;
    },
    showDetail(reservation) {
      this.ModalVisible = true;
      this.reserveData = reservation;
      console.log(reservation)
    },
    async acceptReservation(reservation) {
      // Handle accept reservation action
    },
    async refuseReservation(reservation) {
      // Handle refuse reservation action
    },
    async fetchAccepted() {
      const res = await fetchAcceptedReservations();
      console.log(res);
    },
  },
  mounted() {
    this.fetchReservationsData();
    this.fetchAccepted();
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

.filter-btn {
  display: flex;
  align-items: center;
}

.btns {
  display: flex;
  flex-direction: row;
  gap: 3px;
}

.btn-action {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-action.detail {
  background-color: #3498db;
  color: #fff;
}

.btn-action.accept {
  background-color: #2ecc71;
  color: #fff;
}

.btn-action.refuse {
  background-color: #e74c3c;
  color: #fff;
}

.btn-action:hover {
  filter: brightness(90%);
}
</style>

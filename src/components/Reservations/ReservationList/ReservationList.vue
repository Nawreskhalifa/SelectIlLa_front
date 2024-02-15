<template>
   <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
  <div class="reviews-select rounded-1 d-flex   me-10 mt-10 mt-lg-0"><span class="text-muted fs-12 position-relative fw-medium text-uppercase"> Status </span>
            <select class="form-select shadow-none bg-transparent border-0 fw-semibold rounded-0" v-model="selectedStatus">
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Canceled">Canceled</option>
          </select>

    </div>
<!-- project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10 -->

    <div class="d-sm-flex align-items-center">
  <div class="rounded-1 d-flex me-10 mt-10 mt-lg-0" style="display: flex ; align-items: center; gap: 2px;">
    <label  class="text-muted   fs-md-15" for="start-date">Start Date :</label>
    <input
      id="start-date"
      type="date"
      class="form-control  datepicker project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
      placeholder="Start Date"
      v-model="startDate"
    />

    <label class="text-muted   fs-md-15" for="end-date">End Date : </label>
    <input
      id="end-date"
      type="date"
      class="form-control  datepicker project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
      placeholder="End Date"
      v-model="endDate"
    />
  </div>
</div>

      </div>

      <div class="d-sm-flex align-items-center">
        <!-- <form class="search-box position-relative">
          <input
            type="text"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Search..."
            @input="change"
            v-model="searchInput"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form> -->


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
                                Customer

              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                                Pickup Date

              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
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
                STATUS
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reservation in filteredReservations"
              :key="reservation.id"
            >
            <td v-if="reservation && reservation.attributes"
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
          v-if="customerHasPhoto(reservation)"
          :src="getCustomerPhotoUrl(reservation)"
          class="rounded-circle me-2"
          width="24"
          height="24"
          alt="user"
        />
        <span>{{ getCustomerName(reservation) }}</span>
                  </div>
                </div>
              </td>
              <td  v-if="reservation && reservation.attributes" class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.pickup_date }}
              </td>
              <td v-if="reservation && reservation.attributes" class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.drop_off_date }}
              </td>
              <td  v-if="reservation && reservation.attributes" class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.pickup_location }}
              </td>
              <td  v-if="reservation && reservation.attributes" class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.drop_off_location }}
              </td>
              <td v-if="reservation && reservation.attributes" class="shadow-none lh-1 fw-medium text-paragraph">
                {{ reservation.attributes.phone }}
              </td>
  <td v-if="reservation && reservation.attributes" ><span :class="getStatusClass(reservation.attributes.status)">{{reservation.attributes.status}}</span></td>
              <td class="shadow-none lh-1 fw-medium text-paragraph ">
                <div class="dropdown">
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
                                  @click="showDetail(reservation)"

                >
                  <i class="flaticon-view lh-1 me-8"></i>
                  Detail
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                                    @click="acceptReservation(reservation)"

                >
                  <i class="flaticon-pen lh-1 me-8"></i>
                  Accept
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  @click="refuseReservation(reservation)"
                >
                  <i class="flaticon-delete lh-1 me-8"></i>
                  Refuse
                </a>
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
      ></div>
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
  <RefuseModal
    :show="isOpenRefuse"
    :reservation="reserveData"
    @close="closeRefus"
    @changedReservation="changeStatus"
  ></RefuseModal>
       <loading
        v-model:active="isLoading"
        :can-cancel="true"
         :is-full-page="fullPage"
      />
</template>

<script>
import {
  fetchReservations,
  deleteReservation,
  fetchAcceptedReservations,
  updateReservation,
  searchInS,
  acceptReservation,
} from "@/services/apiService";
import AcceptRef from "../ReservationModal/ReservationModal.vue";
import RefuseModal from "../ReservationModal/RefuseModal.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  name: "ReservationList",
  components: {
    AcceptRef,
    RefuseModal,
    Loading
  },
  data() {
    return {
      reservations: [],
      searchInput: "",
      reserveData: "",
       selectedStatus: "",
      isOpenRefuse: false,
       ModalVisible: false,
isLoading:false,
endDate: new Date().toISOString().split('T')[0],
startDate: ''
    };
  },
  computed: {
  filteredReservations() {
      let filtered = this.reservations;
      if (this.startDate && this.endDate) {
         filtered = filtered.filter(reservation => {
          const createdAt = new Date(reservation.attributes.createdAt);
          const startDate = new Date(this.startDate);
          const endDate = new Date(this.endDate);
          return createdAt >= startDate && createdAt <= endDate;
        });
      }
      if (this.selectedStatus) {
         filtered = filtered.filter(reservation => reservation.attributes.status === this.selectedStatus);
      }
      return filtered;
    },

  },
  methods: {
     async change() {
        try {
         if (this.searchInput.trim() !== '') {
           const data = await searchInS(
            "reservations",
            "customer",
            "name",
            "$contains",
            this.searchInput
          );
          console.log(data)
           this.reservations = data.data;
        } else {
           await this.fetchReservationsData();
        }
      } catch (error) {
        console.log(error)
       }},
    customerHasPhoto(reservation) {
      return (
        reservation &&
        reservation.attributes &&
        reservation.attributes.customer &&
        reservation.attributes.customer.data &&
        reservation.attributes.customer.data.attributes &&
        reservation.attributes.customer.data.attributes.user &&
        reservation.attributes.customer.data.attributes.user.data &&
        reservation.attributes.customer.data.attributes.user.data.attributes &&
        reservation.attributes.customer.data.attributes.user.data.attributes.photo &&
                reservation.attributes.customer.data.attributes.user.data.attributes.photo.data &&
                reservation.attributes.customer.data.attributes.user.data.attributes.photo.data.attributes &&
                reservation.attributes.customer.data.attributes.user.data.attributes.photo.data.attributes.url


      );
    },
    getCustomerPhotoUrl(reservation) {
     const stockage = process.env.VUE_APP_STORAGE_URL
      return (
       stockage+reservation.attributes.customer.data.attributes.user.data.attributes.photo.data.attributes.url

      );
    },
    getCustomerName(reservation) {
      return (
        reservation &&
        reservation.attributes &&
        reservation.attributes.customer &&
        reservation.attributes.customer.data &&
        reservation.attributes.customer.data.attributes &&
        reservation.attributes.customer.data.attributes.name
      );
    },
    getStatusClass(status) {
      switch (status) {
        case 'Pending':
          return 'badge text-outline-warning';
        case 'Confirmed':
          return 'badge text-outline-success';
        case 'Canceled':
          return 'badge text-outline-danger';
        default:
          return 'badge';
      }},
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
        this.reservations = this.reservations.filter(
          (reservation) => reservation.id !== id
        );
        await deleteReservation(id);
      } catch (error) {
        console.error(`Error deleting reservation with ID ${id}:`, error);
      }
    },

    closeModal() {
      this.ModalVisible = false;
    },
    showDetail(reservation) {
      // this.ModalVisible = true;
   const reservationId = reservation.id;
  this.$router.push({ name: 'ReservationDetailsPage', params: { reservationId } });

      this.reserveData = reservation;
      console.log(reservation);
    },
    // async acceptReservation(reservation) {
    //   const updatedData = {
    //     data: {
    //       status: "Confirmed",
    //     },
    //   };
    //   const res = await updateReservation(reservation.id, updatedData);
    //   if (res) {
    //     console.log(reservation);
    //     this.reservations = this.reservations.filter((item) => {
    //       item.id !== res.data.id;
    //     });
    //     if (
    //       reservation.attributes &&
    //       reservation.attributes.customer &&
    //       reservation.attributes.customer.data
    //     ) {
    //       const acceptedRes = {
    //         data: {
    //           customer: reservation.attributes.customer.data.id,
    //           reservation_demand: reservation.id,
    //         },
    //       };
    //       const accept = await acceptReservation(acceptedRes);
    //       if (accept) {
    //         // this.$router.push({ path: "/acceptedres" });
    //         const updatedData =res.data.data
    //         this.reservations.forEach(item => {
    //    if(item.id === updatedData.id){
    //     item = updatedData
    //    }
    //         })

    //       }
    //     }
    //   }
    // },

  acceptReservation(reservation) {
    const updatedData = {
      data: {
        status: "Confirmed",
      },
    };
    updateReservation(reservation.id, updatedData)
      .then(res => {
         const index = this.reservations.findIndex(item => item.id === reservation.id);
        if (index !== -1) {
this.reservations[index].attributes.status =res.data.data.attributes.status
        }
      })
      .catch(error => {
        console.error("Error updating reservation:", error);
      });
  },

    async refuseReservation(reservation) {
      this.reserveData = reservation;
      this.isOpenRefuse = !this.isOpenRefuse;
      console.log("ok");
    },
changeStatus(event) {
   const index = this.reservations.findIndex((item) => item.id === event.data.id);
  if (index !== -1) {
     this.reservations[index].attributes.status =event.data.attributes.status
  }
   this.isOpenRefuse = false;
},


    closeRefus() {
      this.isOpenRefuse = false;
    },
    async fetchAccepted() {
      const res = await fetchAcceptedReservations();
      console.log(res);
    },
  },
  async mounted() {
     this.isLoading= true
   await this.fetchReservationsData();
        this.isLoading= false

   await  this.fetchAccepted();
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

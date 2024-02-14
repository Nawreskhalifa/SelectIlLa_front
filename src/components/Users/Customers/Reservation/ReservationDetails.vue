<template>
  <div class="row">
    <div class="col-lg-12 col-xl-12 col-xxl-4">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div class="card-head bg-white d-flex align-items-center">
          <i class="flaticon-sterile-box text-primary"></i>
          <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
            Reservation Details
          </h5>
        </div>
        <div class="card-body">
          <ul class="list ps-0 mb-0 list-unstyled">
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-calendar"></i>
                Data Added:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{ getReservation?.attributes.createdAt }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-atm"></i>
                Payment Method:
              </div>
              <span
                class="d-flex align-items-center text-paragraph fs-md-15 fs-lg-16"
              >
                <img
                  src="../../../../assets/images/mastercard.png"
                  alt="mastercard"
                  class="me-8"
                />
                Mastercard
              </span>
            </li>
            <li
              class="d-flex align-items-center justify-content-between"
              v-if="getReservation?.attributes.event.data"
            >
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-express-delivery"></i>
                Seats:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{ getReservation?.attributes.seats }}
              </span>
            </li>
            <li
              class="d-flex align-items-center justify-content-between"
              v-if="getReservation?.attributes.event.data"
            >
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-express-delivery"></i>
                Bottles:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{ getReservation?.attributes.bottles }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="col-lg-6 col-xxxl-3"
      v-if="
        getReservation?.attributes.vehicle.data ||
        getReservation?.attributes.villa.data
      "
    >
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div class="card-head bg-white">
          <h5 class="mb-0 fw-bold text-black">Pickup</h5>
        </div>
        <div class="card-body">
          <ul class="payment-address-list ps-0 mb-0 list-unstyled">
            <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
              <span class="fw-semibold text-black">Date:</span>
              {{ getReservation?.attributes.pickup_date }}
            </li>
            <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
              <span class="fw-semibold text-black">Time:</span>
              {{ getReservation?.attributes.pickup_time }}
            </li>
            <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
              <span class="fw-semibold text-black">Location:</span>
              {{ getReservation?.attributes.pickup_location }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="col-lg-6 col-xxxl-3"
      v-if="
        getReservation?.attributes.vehicle.data ||
        getReservation?.attributes.villa.data
      "
    >
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div class="card-head bg-white">
          <h5 class="mb-0 fw-bold text-black">Drop Off</h5>
        </div>
        <div class="card-body">
          <ul class="payment-address-list ps-0 mb-0 list-unstyled">
            <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
              <span class="fw-semibold text-black">Date:</span>
              {{ getReservation?.attributes.drop_off_date }}
            </li>
            <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
              <span class="fw-semibold text-black">Time:</span>
              {{ getReservation?.attributes.drop_off_time }}
            </li>
            <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
              <span class="fw-semibold text-black">Location:</span>
              {{ getReservation?.attributes.drop_off_location }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-xl-12 col-xxl-4">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div class="card-head bg-white d-flex align-items-center">
          <i class="flaticon-user-3 text-success"></i>
          <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
            Customer Details
          </h5>
        </div>
        <div class="card-body">
          <ul class="list ps-0 mb-0 list-unstyled">
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-user-1"></i>
                Customer Name:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{
                  getReservation?.attributes.customer.data?.attributes.name +
                  " " +
                  getReservation?.attributes.customer.data?.attributes.surname
                }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-envelope"></i>
                Email:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{
                  getReservation?.attributes.customer.data?.attributes.user.data
                    .attributes.email
                }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="flaticon-phone-call"></i>
                Phone:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{ getReservation?.attributes.customer.data?.attributes.phone }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="driver-license-icon">&#128663;</i>
                Driver License:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{
                  getReservation?.attributes.customer.data?.attributes
                    .driver_license
                }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <div
                class="title text-black fs-md-15 fs-lg-16 fw-semibold position-relative"
              >
                <i class="insurance-icon">&#128451;</i>
                Insurance:
              </div>
              <span class="d-block text-paragraph fs-md-15 fs-lg-16">
                {{
                  getReservation?.attributes.customer.data?.attributes.Insurance
                }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-6 col-xl-12 col-xxl-4">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div class="card-head bg-white d-flex align-items-center">
          <i class="flaticon-document text-info"></i>
          <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">Documents</h5>
        </div>
        <div class="card-body" v-if="getReservation?.attributes.documents.data">
          <Media :documents="getReservation?.attributes.documents.data" />
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div class="card-head bg-white d-flex align-items-center">
          <i class="flaticon-sterile-box text-primary"></i>
          <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
            Order (ID #321456)
          </h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 ps-0"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pe-0"
                  >
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    class="shadow-none fw-medium text-black product-title ps-0"
                  >
                    <router-link
                      to="/product-details"
                      class="d-flex align-items-center text-decoration-none text-black fs-md-15 fs-lg-16"
                    >
                      <img
                        src="../../../../assets/images/products/product17.jpg"
                        class="me-15"
                        width="44"
                        alt="product"
                      />
                      Sanung Airpods 3s Voltage <br />Multifunction
                    </router-link>
                  </th>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">
                    $125.00
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">1</td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph pe-0">
                    $125.00
                  </td>
                </tr>
                <tr>
                  <td
                    class="shadow-none fw-medium text-black product-title ps-0"
                  >
                    <router-link
                      to="/product-details"
                      class="d-flex align-items-center text-decoration-none text-black fs-md-15 fs-lg-16"
                    >
                      <img
                        src="../../../../assets/images/products/product18.jpg"
                        class="me-15"
                        width="44"
                        alt="product"
                      />
                      Sanung Smart Watch With More <br />Multifunction
                    </router-link>
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">
                    $225.00
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">2</td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph pe-0">
                    $450.00
                  </td>
                </tr>
                <tr>
                  <td
                    class="shadow-none fw-medium text-black product-title ps-0"
                  >
                    <router-link
                      to="/product-details"
                      class="d-flex align-items-center text-decoration-none text-black fs-md-15 fs-lg-16"
                    >
                      <img
                        src="../../../../assets/images/products/product19.jpg"
                        class="me-15"
                        width="44"
                        alt="product"
                      />
                      Gaming Laptop With 32 GB Ram <br />& 1TB SSd
                    </router-link>
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">
                    $205.00
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">1</td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph pe-0">
                    $205.00
                  </td>
                </tr>
                <tr>
                  <td
                    class="shadow-none fw-medium text-black product-title ps-0"
                  >
                    <router-link
                      to="/product-details"
                      class="d-flex align-items-center text-decoration-none text-black fs-md-15 fs-lg-16"
                    >
                      <img
                        src="../../../../assets/images/products/product20.jpg"
                        class="me-15"
                        width="44"
                        alt="product"
                      />
                      VR Box With Advanced <br />Metaverse System
                    </router-link>
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">
                    $25.00
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph">3</td>
                  <td class="shadow-none lh-1 fw-medium text-paragraph pe-0">
                    $75.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing">
        <div class="card-head bg-white d-flex align-items-center">
          <i class="flaticon-document text-info"></i>
          <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">Order Summary</h5>
        </div>
        <div class="card-body">
          <ul class="order-summary-list ps-0 mb-0 list-unstyled">
            <li class="d-flex align-items-center justify-content-between">
              <span class="d-block text-muted text-uppercase fw-medium fs-13">
                DESCRIPTION
              </span>
              <span class="d-block text-muted text-uppercase fw-medium fs-13">
                PRICE
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <span class="d-block text-paragraph fw-medium">
                Grand Total
              </span>
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium">
                ${{ getReservation?.attributes.total_amount }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <span class="d-block text-paragraph fw-medium">
                Shipping Charge
              </span>
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium">
                + ${{ getReservation?.attributes.added_amount }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <span class="d-block text-paragraph fw-medium"> Discount </span>
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium">
                - $80.00
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <span class="d-block text-paragraph fw-medium">
                Estimated Tax
              </span>
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium">
                + ${{ getReservation?.attributes.tax }}
              </span>
            </li>
            <li class="d-flex align-items-center justify-content-between">
              <span class="d-block text-paragraph fw-medium"> Total </span>
              <span class="d-block text-primary fs-md-15 fs-lg-16 fw-bold">
                ${{ getReservation?.attributes.total_amount }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import Media from "./FileManager.vue";

export default defineComponent({
  name: "ReservationDetails",
  components: { Media },
  props: {
    // Define the 'customer id' prop
    reservationId: {
      required: true,
    },
  },

  methods: {
    ...mapActions(["fetchOneReservation"]),
  },
  computed: {
    ...mapGetters(["getReservation"]),
  },
  async mounted() {
    if (this.$route.params && this.$route.params.reservationId) {
      await this.fetchOneReservation(this.$route.params.reservationId);
      console.log(this.getReservation);
    }
  },
});
</script>

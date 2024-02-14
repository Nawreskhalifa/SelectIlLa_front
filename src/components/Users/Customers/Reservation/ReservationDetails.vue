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
        class="card mb-25 border-0 rounded-0 bg-white letter-spacing manage-reviews-box"
      >
        <div class="card-body p-15 p-sm-20 p-md-25">
          <h5
            class="text-black fw-bold fs-15 fs-md-16 fs-lg-18 fs-xl-20 mb-15 mb-sm-20"
          >
            Product
          </h5>
          <div class="row ms-0 me-0 product-box">
            <div class="col-md-6 ps-0 pe-0">
              <div
                class="image"
                :style="{
                  'background-image':
                    'url(' +
                    require(`../../../../assets/images/products/review-product.jpg`) +
                    ')',
                }"
              >
                <img
                  src="../../../../assets/images/products/review-product.jpg"
                  alt="review-product"
                />
              </div>
            </div>
            <div class="col-md-6 ps-0 pe-0">
              <div class="content">
                <h5
                  class="fs-15 fs-md-16 fs-xxxl-18 mb-10"
                  v-if="getReservation?.attributes.vehicle.data"
                >
                  {{
                    getReservation?.attributes.vehicle.data?.attributes.style
                  }}
                </h5>
                <h5
                  class="fs-15 fs-md-16 fs-xxxl-18 mb-10"
                  v-if="getReservation?.attributes.event.data"
                >
                  {{ getReservation?.attributes.event.data?.attributes.name }}
                </h5>
                <h5
                  class="fs-15 fs-md-16 fs-xxxl-18 mb-10"
                  v-if="getReservation?.attributes.villa.data"
                >
                  {{ getReservation?.attributes.villa.data?.attributes.name }}
                </h5>

                <span class="d-block text-muted mb-2"
                  >Owner:
                  <span
                    class="d-block text-muted"
                    v-if="getReservation?.attributes.vehicle.data"
                  >
                    {{
                      getReservation?.attributes.vehicle.data?.attributes
                        .partner.data?.attributes.name +
                      " " +
                      getReservation?.attributes.villa.data?.attributes.partner
                        .data?.attributes.surname
                    }}
                  </span>
                  <span
                    class="d-block text-muted"
                    v-if="getReservation?.attributes.event.data"
                  >
                    {{
                      getReservation?.attributes.event.data?.attributes.partner
                        .data?.attributes.name +
                      " " +
                      getReservation?.attributes.villa.data?.attributes.partner
                        .data?.attributes.surname
                    }}
                  </span>
                  <span
                    class="d-block text-muted"
                    v-if="getReservation?.attributes.villa.data"
                  >
                    {{
                      getReservation?.attributes.villa.data?.attributes.partner
                        .data?.attributes.name +
                      " " +
                      getReservation?.attributes.villa.data?.attributes.partner
                        .data?.attributes.surname
                    }}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="mt-25 mt-lg-35"></div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
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

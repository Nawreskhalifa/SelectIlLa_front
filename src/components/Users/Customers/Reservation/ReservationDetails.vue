<template>
  <div class="row">
    <div class="col-lg-12 col-xl-12 col-xxl-4">
      <div
        class="card mb-25 border-0 rounded-0 bg-white order-details-box letter-spacing"
      >
        <div
          class="card-head bg-white d-flex align-items-center justify-content-between"
        >
          <div>
            <!-- <i class="flaticon-sterile-box text-primary"></i> -->
            <h5 class="mb-0 fw-bold text-black ms-10 ms-md-15">
              Reservation Details
            </h5>
          </div>
          <div>
            <span
              class="badge text-outline-warning"
              v-if="getReservation?.attributes.status == 'Pending'"
              >{{ getReservation?.attributes.status }}</span
            >
            <span
              class="badge text-outline-success"
              v-if="getReservation?.attributes.status == 'Confirmed'"
              >{{ getReservation?.attributes.status }}</span
            >
            <span
              class="badge text-outline-danger"
              v-if="getReservation?.attributes.status == 'Canceled'"
              >{{ getReservation?.attributes.status }}</span
            >
          </div>
          <div
            class="dropdown mt-10 mt-sm-0 ms-sm-10"
            v-if="getReservation?.attributes.status === 'Pending'"
          >
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
                  @click="ConfirmReservation"
                >
                  <i
                    class="flaticon-check-mark lh-1 me-6 position-relative top-1"
                    style="font-size: 20px"
                  ></i>
                  Confirm
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#RefuseReservationModal"
                >
                  <i
                    class="flaticon-cancel lh-1 me-6 position-relative top-1"
                    style="font-size: 20px"
                  ></i>
                  Cancel
                </a>
              </li>
            </ul>
          </div>
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
        <div class="card-body" v-if="getReservation?.attributes.documents">
          <Media :documents="getReservation?.attributes.documents" />
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
            <div
              class="col-md-6 ps-0 pe-0"
              v-if="
                getReservation?.attributes.villa.data?.attributes.photos.data
              "
            >
              <div
                class="image"
                :style="{
                  'background-image': `url(${Url}${getReservation?.attributes.villa.data?.attributes.photos.data[0].attributes.url})`,
                }"
              >
                <img
                  :src="
                    Url +
                    getReservation?.attributes.villa.data?.attributes.photos
                      .data[0].attributes.url
                  "
                  alt="review-product"
                />
              </div>
            </div>
            <div
              class="col-md-6 ps-0 pe-0"
              v-if="
                getReservation?.attributes.event.data?.attributes.photos.data
              "
            >
              <div
                class="image"
                :style="{
                  'background-image': `url(${Url}${getReservation?.attributes.event.data?.attributes.photos.data[0].attributes.url})`,
                }"
              >
                <img
                  :src="
                    Url +
                    getReservation?.attributes.event.data?.attributes.photos
                      .data[0].attributes.url
                  "
                  alt="review-product"
                />
              </div>
            </div>
            <div
              class="col-md-6 ps-0 pe-0"
              v-if="
                getReservation?.attributes.villa.vehicle?.attributes.photos.data
              "
            >
              <div
                class="image"
                :style="{
                  'background-image': `url(${Url}${getReservation?.attributes.vehicle.data?.attributes.photos.data[0].attributes.url})`,
                }"
              >
                <img
                  :src="
                    Url +
                    getReservation?.attributes.vehicle.data?.attributes.photos
                      .data[0].attributes.url
                  "
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
                    getReservation?.attributes.vehicle.data?.attributes.make
                      .data?.attributes.name
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
                      getReservation?.attributes.vehicle.data?.attributes
                        .partner.data?.attributes.surname
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
                      getReservation?.attributes.event.data?.attributes.partner
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
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"
    />
  </div>
  <RefuseReservationModal
    :idReservation="idReservation"
    :idCustomer="this.getReservation?.attributes.customer.data.id"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import Media from "../../../Reservations/FileManagar/FileManager.vue";
import { storageUrl } from "../../../../utils/constants";
import { updateReservation, acceptReservation } from "@/services/apiService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import RefuseReservationModal from "./RefuseReservationModal.vue";
import swal from "sweetalert";

export default defineComponent({
  name: "ReservationDetails",
  components: { Media, Loading, RefuseReservationModal },
  props: {
    // Define the 'customer id' prop
    reservationId: {
      required: true,
    },
  },
  data() {
    return {
      Url: storageUrl,
      isLoading: false,
      fullPage: true,
      idReservation: null,
    };
  },
  methods: {
    ...mapActions(["fetchOneReservation"]),
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async ConfirmReservation() {
      this.isLoading = true;
      if (this.$route.params && this.$route.params.reservationId) {
        const res = await updateReservation(this.$route.params.reservationId, {
          data: {
            status: "Confirmed",
          },
        });
        if (res) {
          if (
            this.getReservation.attributes &&
            this.getReservation.attributes.customer &&
            this.getReservation.attributes.customer.data
          ) {
            const acceptedRes = {
              data: {
                customer: this.getReservation.attributes.customer.data.id,
                reservation_demand: this.getReservation.id,
              },
            };
            const accept = await acceptReservation(acceptedRes);
            if (accept) {
              this.isLoading = false;

              this.$router.push({
                name: "CustomerDetailPage",
                params: {
                  customerId: this.getReservation.attributes.customer.data.id,
                },
              });
              // Afficher un message de succès
              swal({
                text: "Reservation Confirmed Successfully!",
                closeOnClickOutside: false,
              });
            }
            this.isLoading = false;
          }
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getReservation"]),
  },
  async mounted() {
    if (this.$route.params && this.$route.params.reservationId) {
      this.idReservation = this.$route.params.reservationId;
      await this.fetchOneReservation(this.$route.params.reservationId);
      console.log(this.getReservation);
    }
  },
});
</script>

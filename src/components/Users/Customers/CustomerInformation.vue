<template>
  <div
    class="card mb-25 border-0 rounded-0 bg-white letter-spacing lead-info-box"
  >
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <div class="profile-info d-sm-flex align-items-center">
        <img
          v-if="storageUrl && customer?.user?.photo.url"
          :src="storageUrl + customer.user.photo.url"
          class="rounded"
          alt="user"
        />
        <div class="title mt-12 mt-sm-0">
          <h3 class="text-black fw-medium mb-8">
            {{ customer?.name + " " + customer?.surname }}
          </h3>
          <span class="d-block fs-md-15 fs-lg-16 text-dark-emphasis mb-8">
            {{ customer?.user?.role?.name }}
          </span>
        </div>
      </div>
      <div
        class="border-top mt-15 mb-15 mt-sm-20 mb-sm-20 mt-md-25 mb-md-25 mt-lg-30 mb-lg-30"
      ></div>
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="fw-medium text-black-emphasis mb-0">
          Customer’s Information
        </h5>
      </div>
      <ul class="info mt-25 ps-0 mb-0 list-unstyled">
        <li class="position-relative">
          <div class="icon text-warning rounded-circle text-center">
            <!-- Use Unicode character for the birthday cake symbol -->
            <i class="dob-icon">&#127874;</i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Date of Birth</span>
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
            {{ customer?.user?.dateOfBirth }}
          </span>
        </li>
        <li class="position-relative">
          <div class="icon text-success rounded-circle text-center">
            <i class="flaticon-gender" v-if="customer?.user?.gender === 'Male'"
              >&#9794;</i
            >
            <i
              class="flaticon-gender"
              v-if="customer?.user?.gender === 'Female'"
              >&#9792;</i
            >
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Gender</span>
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
            {{ customer?.user?.gender }}
          </span>
        </li>
        <li class="position-relative">
          <div class="icon text-success rounded-circle text-center">
            <i class="flaticon-mail-inbox-app"></i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Email</span>
          <a
            href="mailto:johnathon23@gmail.com"
            class="d-inline-block fs-md-15 fs-lg-16 text-primary text-decoration-none"
          >
            {{ customer?.user?.email }}
          </a>
        </li>
        <li class="position-relative">
          <div class="icon text-warning rounded-circle text-center">
            <i class="flaticon-telephone-call"></i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Phone No</span>
          <a
            href="tel:+1-321-456-8756"
            class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none"
          >
            {{ customer?.phone }}
          </a>
        </li>

        <li class="position-relative">
          <div class="icon text-info rounded-circle text-center">
            <!-- Use the appropriate Flaticon class for the location icon -->
            <i class="flaticon-maps-and-flags"></i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Location</span>
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
            {{ customer?.address }}
          </span>
        </li>
        <li class="position-relative">
          <div class="icon text-primary rounded-circle text-center">
            <!-- Use Unicode character for the steering wheel symbol -->
            <i class="driver-license-icon">&#128663;</i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold"
            >Driver's License</span
          >
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
            {{ customer?.driverLicense }}
          </span>
        </li>
        <li class="position-relative">
          <div class="icon text-primary rounded-circle text-center">
            <!-- Use the Flaticon insurance icon class -->
            <i class="insurance-icon">&#128451;</i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Insurance</span>
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
            {{ customer?.Insurance }}
          </span>
        </li>
      </ul>
    </div>
    <loading
      v-model:active="getUsersLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"
    />
  </div>
</template>

<script>
import { storageUrl } from "../../../utils/constants";
import { mapActions, mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  name: "CustomerInformation",
  components: {
    Loading,
  },
  props: {
    // Define the 'customer id' prop
    customerId: {
      required: true,
    },
  },

  data() {
    return {
      storageUrl: "",
      customer: {},
      idCustomer: this.customerId,
    };
  },
  methods: {
    ...mapActions(["fetchAllCustomers"]),
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
  computed: {
    ...mapGetters(["getCustomers","getUsersLoading",]),
  },
  async mounted() {
    if (!this.getCustomers || !this.getCustomers.length) {
      await this.fetchAllCustomers({page:null});
    }
    if (this.getCustomers && this.getCustomers.length) {
      this.customer =
        this.getCustomers.filter((item) => item.id == this.customerId) &&
        this.getCustomers.filter((item) => item.id == this.customerId).length
          ? this.getCustomers.filter((item) => item.id == this.customerId)[0]
          : this.getCustomers.filter((item) => item.id == this.customerId);
    }
    this.storageUrl = storageUrl;
  },
};
</script>
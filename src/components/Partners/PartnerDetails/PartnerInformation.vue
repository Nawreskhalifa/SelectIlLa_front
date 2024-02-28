<template>
  <div
    class="card mb-25 border-0 rounded-0 bg-white letter-spacing lead-info-box"
  >
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <div class="profile-info d-sm-flex align-items-center">
        <img
          v-if="storageUrl && partner?.attributes?.user?.data?.attributes?.photo?.data?.attributes?.url"
          :src="storageUrl + partner?.attributes.user?.data?.attributes?.photo?.data?.attributes?.url"
          class="rounded"
          alt="user"
        />
        <div class="title mt-12 mt-sm-0">
          <h3 class="text-black fw-medium mb-8">
            {{ partner?.attributes?.name + " " + partner?.attributes?.surname }}
          </h3>
          <span class="d-block fs-md-15 fs-lg-16 text-dark-emphasis mb-8">
            {{ partner?.attributes.user?.data?.attributes?.role?.data?.attributes?.name }}
          </span>
        </div>
      </div>
      <div
        class="border-top mt-15 mb-15 mt-sm-20 mb-sm-20 mt-md-25 mb-md-25 mt-lg-30 mb-lg-30"
      ></div>
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="fw-medium text-black-emphasis mb-0">
          Partner's Information
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
                     {{ partner?.attributes.user?.data?.attributes?.date_of_birth }}

          </span>
        </li>
        <li class="position-relative">
          <div class="icon text-success rounded-circle text-center">
            <i class="flaticon-gender" v-if="partner?.attributes.user?.data?.attributes?.gender === 'Male'"
              >&#9794;</i
            >
            <i
              class="flaticon-gender"
              v-if="partner?.attributes.user?.data?.attributes?.gender=== 'Female'"
              >&#9792;</i
            >
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Gender</span>
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                                {{ partner?.attributes.user?.data?.attributes?.gender}}

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
                                          {{ partner?.attributes.user?.data?.attributes?.email}}

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
                                                  {{ partner?.attributes.phone}}

          </a>
        </li>

        <li class="position-relative">
          <div class="icon text-info rounded-circle text-center">
            <!-- Use the appropriate Flaticon class for the location icon -->
            <i class="flaticon-maps-and-flags"></i>
          </div>
          <span class="d-block text-black mb-5 fw-semibold">Location</span>
          <span class="d-inline-block fs-md-15 fs-lg-16 text-muted">
                                                      {{ partner?.attributes.address}}

          </span>
        </li>


      </ul>
    </div>
  </div>
</template>

<script>
import { storageUrl } from "../../../utils/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CustomerInformation",
  props: {
     partner: {
      type:Object ,
      required: true,
    },
  },

  data() {
    return {
      storageUrl: "",
      Singlepartner: {},
      idCustomer: this.customerId,
    };
  },
  methods: {
    // ...mapActions(["fetchAllCustomers"]),
  },
  computed: {
    // ...mapGetters(["getCustomers"]),
  },
  async mounted() {
     if (!this.getCustomers || !this.getCustomers.length) {
      // await this.fetchAllCustomers();
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

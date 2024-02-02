<template>
  <div class="col-sm-6 col-lg-6 col-xxxl-3">
    <div class="card mb-25 border-0 rounded-0 bg-white single-product-box">
      <div class="card-body p-0 letter-spacing">
        <div class="image position-relative">
          <router-link :to="`/product-details/${vehicle.id}`" class="d-block">
            <img :src="vehicle.picture" alt="vehicle" />
          </router-link>
          <button
            class="fav position-absolute bg-white rounded-circle border-0 p-0 d-inline-block"
            type="button"
            @click="addToFavorites"
          >
            <i class="flaticon-heart"></i>
          </button>
        </div>
        <div class="content p-20">
          <h4 class="mb-10 fw-semibold fs-16 fs-lg-18">
            <router-link
              :to="`/product-details/${vehicle.id}`"
              class="text-decoration-none text-black"
            >
              {{ vehicle.make }} {{ vehicle.brand }}
            </router-link>
          </h4>
          <div class="reviews d-flex align-items-center">
            <!-- Your rating and reviews code here -->
          </div>
          <div class="mt-10 price d-flex align-items-center">
            <span class="text-primary fw-bold fs-md-15 fs-lg-16">{{
              vehicle.msrp
            }}</span>
            <!-- Add your discounted price and percentage off here -->
          </div>
          <button
            type="button"
            class="add-to-cart-btn text-center d-block mt-15 fw-medium transition w-100 rounded-1 position-relative"
            @click="addToCart"
          >
            Add To Cart
            <i class="flaticon-shopping-cart-2 transition"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object, // Corrected: use type instead of :type
      required: true,
    },
  },
  emits: ["updateActive"],
  data() {
    return {
      Myvehicle: this.vehicle,
    };
  },
  methods: {
    deleteSt() {
      this.myStudents.shift();
    },
    // changePerm() {
    //   this.$emit("updateActive", false);
    // },
  },
};
</script>

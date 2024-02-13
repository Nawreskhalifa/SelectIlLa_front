<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal">
          <div class="card product-details-box">
            <i class="fas fa-times-circle close-button " @click="closeModal"></i>

            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-lg-5 col-md-9">
                  <swiper
                    :slidesPerView="1"
                    :loop="true"
                    :autoplay="{
                      delay: 4000,
                      disableOnInteraction: true,
                    }"
                    :spaceBetween="10"
                    :thumbs="{ swiper: thumbsSwiper }"
                    :modules="[Thumbs]"
                    class="productDetailsSwiper"
                  >
                    <swiper-slide v-for="(product, id) in products" :key="id">
                      <img
                        :src="getFullImageUrl(product.attributes.url)"
                        alt="product-details"
                      />
                    </swiper-slide>
                  </swiper>
                </div>
                <div class="col-lg-2 col-md-3">
                  <swiper
                    :direction="'vertical'"
                    :loop="true"
                    :autoplay="{
                      delay: 4000,
                      disableOnInteraction: false,
                    }"
                    :spaceBetween="25"
                    :slidesPerView="4"
                    :freeMode="true"
                    :watchSlidesProgress="true"
                    :breakpoints="{
                      0: {
                        direction: 'horizontal',
                        spaceBetween: 15,
                      },
                      768: {
                        direction: 'vertical',
                        spaceBetween: 25,
                      },
                    }"
                    :modules="[Thumbs]"
                    @swiper="setThumbsSwiper"
                    class="productDetailsThumbSwiper"
                  >
                    <swiper-slide v-for="(product, id) in products" :key="id">
                      <img
                        :src="getFullImageUrl(product.attributes.url)"
                        alt="product-details"
                      />
                    </swiper-slide>
                  </swiper>
                </div>
                <div class="col-lg-5 col-md-12">
                  <div class="product-details-content">
                    <h1> {{ vehicle.attributes?.make?.data?.attributes?.name }} </h1>
                    <h3 class="text-black fw-semibold">
                        <span>{{ vehicle?.attributes?.brand?.data?.attributes?.name }} </span>
                    </h3>


                    <div class="reviews d-flex align-items-center">
                      <span class="text-black fw-bold fs-13 ms-5 me-5">
                        Style :
                        {{ vehicle.attributes.style }}</span
                      ><br />
                      <span class="text-muted fw-medium fs-13">
                        - msrp : {{ vehicle.attributes.msrp }}</span
                      >
                    </div>
                    <div
                      class="mt-10 mb-12 mb-md-15 price d-flex align-items-center"
                    >
                      <span class="text-primary fw-bold fs-md-15 fs-lg-16">
                        daily : {{ vehicle.attributes.daily }}
                      </span>
                      <!-- <span class="text-muted fs-13 fw-medium ms-5 me-8">$3250.00</span>
                                      <span class="text-success fw-medium"><span class="fw-black">60%</span> Off</span> -->
                    </div>
                    <p class="text-paragraph fs-md-15 fs-xxxl-16 lh-base">
                      {{ vehicle.attributes.description }}
                    </p>
                    <ul class="info ps-0 list-unstyled">
                      <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block"
                          >deposit:</span
                        >
                        {{ vehicle.attributes.deposit }}
                      </li>
                      <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block">
                          Vendor:
                        </span>
                        Labila
                      </li>
                      <!-- <li
                        class="text-paragraph fs-md-15 fs-xxxl-16"
                        v-if="
                          vehicle.attributes.category_vehicles.data.length > 0
                        "
                      >
                        <span class="text-black fw-semibold d-inline-block">
                          Category:
                        </span>
                        <span
                          v-for="categorie in vehicle.attributes
                            .category_vehicles.data"
                          :key="categorie.id"
                          >{{ categorie.attributes.name }}
                        </span>
                      </li> -->
                      <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block"
                          >seats:</span
                        >
                        {{ vehicle.attributes.seats }} <br />
                      </li>
                    </ul>
                    <div class="box">
                      <p class="text-paragraph fs-md-15 fs-xxxl-16 lh-base">
                        mice
                        <span class="text-black fw-medium">
                          {{ vehicle.attributes.mice }} $</span
                        >
                        new_daily
                        <span class="text-black fw-medium">
                          {{ vehicle.attributes.new_daily }} $</span
                        >
                      </p>
                    </div>
                    <span class="d-block text-paragraph">
                      <span class="text-success">
                        <i
                          class="ph ph-check lh-1 fs-16 position-relative top-1 me-1"
                        ></i>
                        available : {{ vehicle.attributes.available }}
                      </span>
                    </span>
                    <div class="buttons-list d-sm-flex align-items-center">
                      <div
                        class="input-counter d-flex align-items-center"
                      ></div>
                      <button
                        type="button"
                        class="fav-btn mt-10 mt-sm-0 ms-sm-15 d-inline-block position-relative bg-transparent border-0 transition"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <button @click="closeModal" class="close-button">Close</button> -->
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Thumbs } from "swiper/modules";

import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default defineComponent({
  name: "ProductDetails",
  props: ["modalActive", "vehicle"],
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      products: this.vehicle.attributes.photos.data,
    };
  },
  setup(props, { emit }) {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper: null) => {
      thumbsSwiper.value = swiper;
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      Autoplay,
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
      closeModal,
    };
  },
  methods: {
    getFullImageUrl(relativePath) {
                              const stockage = process.env.VUE_APP_STORAGE_URL

      return `${stockage}${relativePath}`;
    },
  },
  mounted() {
    console.log(this.vehicle, "vehicle from modal");
  },
});
</script>
<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;
    max-width: 400px; // Adjust this value to your preference
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;
  }
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 70px;
  color: rgb(25, 79, 113);
  transition: color 0.3s ease;

  &:hover {
    color: #000000;
    z-index: 1;
  }
}


</style>

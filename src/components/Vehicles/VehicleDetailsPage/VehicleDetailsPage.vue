 <template>
        <BreadCrumb :PrevPage="'VehicleList'" :url="'/vehiclelist'" :PageTitle="vehicle.attributes?.brand?.data?.attributes?.name" />

    <div
    class="card mb-25 border-0 rounded-0 bg-white letter-spacing product-details-box"
  >
    <div class="card-body">
      <div class="row "  style="display:flex ; align-items:'end' !important ; ">
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
<swiper-slide v-for="product in vehicle?.attributes?.photos?.data" :key="product.id">
              <img :src="getFullImageUrl(product.attributes.url)" alt="product-details" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="col-lg-2 col-md-3" v-if="vehicle && vehicle.attributes && vehicle.attributes.photos  && vehicle.attributes.photos.data">
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
<swiper-slide v-for="product in vehicle?.attributes?.photos?.data" :key="product.id">
              <img :src="getFullImageUrl(product.attributes.url)" alt="product-details" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="col-lg-5 col-md-12"  >
          <div class="product-details-content">
            <h3 class="text-black fw-semibold" v-if="vehicle && vehicle.attributes">
              {{vehicle.attributes?.make?.data?.attributes?.name}} <br />
                           {{vehicle.attributes?.brand?.data?.attributes?.name}}

            </h3>
            <div class="reviews d-flex align-items-center">
              <span class="text-black fw-bold fs-13 ms-5 me-5">{{vehicle.attributes?.daily}} $ </span>
              <span class="text-muted fw-medium fs-13">(Old daily : {{ vehicle.attributes?.new_daily }} $ )</span>
            </div>
            <div class="mt-10 mb-12 mb-md-15 price d-flex align-items-center">
              <span class="text-primary fw-bold fs-md-15 fs-lg-16">

              </span>
            </div>
            <p class="text-paragraph fs-md-15 fs-xxxl-16 lh-base">
              {{ vehicle.attributes?.description }}
            </p>
                <ul class="info ps-0 list-unstyled">
                      <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block"
                          >deposit:</span
                        >
                        {{ vehicle.attributes?.deposit }}
                      </li>
                      <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block">
                          style:
                        </span>
                                                {{ vehicle.attributes?.style }}

                      </li>
                        <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block">
                          msrp:
                        </span>
                                                {{ vehicle.attributes?.msrp }}

                      </li>
                      <li class="text-paragraph fs-md-15 fs-xxxl-16">
                        <span class="text-black fw-semibold d-inline-block"
                          >seats:</span
                        >
                        {{ vehicle.attributes?.seats }} <br />
                      </li>
                    </ul>
            <div class="box">
              <span class="d-block text-paragraph">
              <span class="text-success" v-if="vehicle && vehicle.attributes &&  vehicle.attributes.isActive === false  ">
                <i
                  class="flaticon-eye lh-1 fs-16 position-relative top-1 me-1"
                ></i>
                ACTIVE
              </span>
                   <span class="text-danger" v-if="vehicle && vehicle.attributes &&  vehicle.attributes.isActive === true  ">
                <i
                  class="flaticon-visibility-off lh-1 fs-16 position-relative top-1 me-1"
                ></i>
                NOT ACTIVE

              </span>
</span>
            </div>

            <div class="buttons-list d-sm-flex align-items-center">
              <div class="input-counter d-flex align-items-center">

                <button
                  class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-20 pe-20 pt-md-11 pb-md-11 ps-md-25 pe-md-25 ps-xl-40 pe-xl-40 rounded-1"
                  type="submit"
                >
                  UPDATE
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="product-details-tabs">
        <ul class="nav nav-tabs border-0 rounded-0" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fw-semibold d-block position-relative border-0 rounded-0 active"
              id="description-tab"
              data-bs-toggle="tab"
              data-bs-target="#description-tab-pane"
              type="button"
              role="tab"
              aria-controls="description-tab-pane"
              aria-selected="true"
            >
              Description
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link fw-semibold d-block position-relative border-0 rounded-0"
              id="reviews-tab"
              data-bs-toggle="tab"
              data-bs-target="#reviews-tab-pane"
              type="button"
              role="tab"
              aria-controls="reviews-tab-pane"
              aria-selected="false"
            >
              Partner
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="description-tab-pane"
            role="tabpanel"
            tabindex="0"
          >
            <div class="row">
              <div class="col-lg-12">
                <div class="content">
                  <p class="text-paragraph fs-md-15 fs-xxxl-16">
                  {{ vehicle?.attributes?.description}}
                  </p>



                </div>
              </div>

             </div>
          </div>
          <div
            class="tab-pane fade"
            id="reviews-tab-pane"
            role="tabpanel"
            tabindex="0"
          >
            <div class="product-reviews">
<div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">

<div class="user-info d-sm-flex align-items-center justify-content-between" v-if="vehicle && vehicle.attributes && vehicle.attributes.partner && vehicle.attributes.partner.data && vehicle.attributes.partner.data.attributes && vehicle.attributes.partner.data.attributes.user && vehicle.attributes.partner.data.attributes.user.data && vehicle.attributes.partner.data.attributes.user.data.attributes">
    <div class="d-flex align-items-center">
        <div class="image">
            <img :src="getFullImageUrl(vehicle.attributes.partner.data.attributes.photo?.data.attributes.url)" class="rounded-circle" width="85" height="85" alt="user" />
        </div>
        <div class="ms-15 ms-md-20">
            <h5 class="text-black fw-black mb-1">{{vehicle.attributes.partner.data.attributes.name}} {{vehicle.attributes.partner.data.attributes.surname}}</h5>
            <span class="d-block text-muted">{{vehicle.attributes.partner.data.attributes.user.data.attributes.email}}</span>
        </div>
    </div>
    <a href="/profile-settings" class="border-0 bg-gray fs-13 fw-medium text-primary ps-8 pe-8 pt-1 pb-1 text-decoration-none d-inline-block mt-12 mt-sm-0">Check Profile <i class="fas fa-eye lh-1 position-relative top-1"></i></a>
</div>

<div class="content pe-0" v-if="vehicle && vehicle.attributes && vehicle.attributes.partner && vehicle.attributes.partner.data && vehicle.attributes.partner.data.attributes && vehicle.attributes.partner.data.attributes.user && vehicle.attributes.partner.data.attributes.user.data && vehicle.attributes.partner.data.attributes.user.data.attributes">
    <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium mb-8"></span>
    <p class="fs-md-15 mb-0 text-paragraph lh-base"> Address : {{vehicle.attributes.partner.data.attributes.address}}</p>
 <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium mb-8"></span>
    <p class="fs-md-15 mb-0 text-paragraph lh-base"> Phone  : {{vehicle.attributes.partner.data.attributes.phone}}</p>

</div>



</div>
<div class="row info-card">
    <div class="col-6 col-sm-4 col-xxl-6 col-xxxl-4" v-if="vehicle && vehicle.attributes && vehicle.attributes.partner && vehicle.attributes.partner.data && vehicle.attributes.partner.data.attributes && vehicle.attributes.partner.data.attributes.villas">
        <div class="info p-10 p-sm-15 p-md-20">
            <span class="d-block text-black-emphasis mb-1">Villas</span>
            <h4 class="d-block text-primary fw-black mb-0">{{ vehicle.attributes.partner.data.attributes.villas.data.length }}</h4>
        </div>
    </div>
    <div class="col-6 col-sm-4 col-xxl-6 col-xxxl-4" v-if="vehicle && vehicle.attributes && vehicle.attributes.partner && vehicle.attributes.partner.data && vehicle.attributes.partner.data.attributes && vehicle.attributes.partner.data.attributes.events">
        <div class="info p-10 p-sm-15 p-md-20">
            <span class="d-block text-black-emphasis mb-1">Events</span>
            <h4 class="d-block text-success fw-black mb-0">{{ vehicle.attributes.partner.data.attributes.events.data.length }}</h4>
        </div>
    </div>
    <div class="col-6 col-sm-4 col-xxl-6 col-xxxl-4" v-if="vehicle && vehicle.attributes && vehicle.attributes.partner && vehicle.attributes.partner.data && vehicle.attributes.partner.data.attributes && vehicle.attributes.partner.data.attributes.vehicles">
        <div class="info p-10 p-sm-15 p-md-20">
            <span class="d-block text-black-emphasis mb-1">Vehicles</span>
            <h4 class="d-block text-info fw-black mb-0">{{ vehicle.attributes.partner.data.attributes.vehicles.data.length }}</h4>
        </div>
    </div>

</div>
</div></div></div></div></div>

    <loading
        v-model:active="isLoading"
        :can-cancel="true"
         :is-full-page="true"
      />
</div>


 </template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Thumbs } from "swiper/modules";
import { fetchVehicleById } from "@/services/apiService";
import  BreadCrumb from '../../Common/BreadCrumb.vue'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import "swiper/css";

export default defineComponent({
  name: "ProductDetails",
  components: {
 Swiper,
    SwiperSlide,
    Loading,
    BreadCrumb
  },
  data() {
    return {
      vehicle: "",
      modalActive: true,
 brand :"",
 isLoading:false,
 make:"",

      itemNumber: 1,
    };
   },
  setup() {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper: any) => {
      thumbsSwiper.value = swiper;
    };

    return {
 Autoplay,
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
    };
  },
  methods: {
    async fetchVehicle() {
      const id = this.$route.params.id;
      const { data } = await fetchVehicleById(id);
      this.vehicle = data;

    },
    closeModal() {
      this.modalActive = false;
    },
 getFullImageUrl(relativePath) {
                              const stockage = process.env.VUE_APP_STORAGE_URL
 console.log(relativePath , stockage)
      return `${stockage}${relativePath}`;
    },
  },
 async  mounted() {
 this.isLoading = true ;
   await  this.fetchVehicle();
   this.isLoading = false ;
  },
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>

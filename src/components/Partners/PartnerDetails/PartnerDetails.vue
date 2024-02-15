<template>
  <div class="row">
    <div class="col-lg-5 col-xl-4" v-if="getPartner">
      <PartnerInformation :partner="getPartner" />
    </div>
    <div class="col-lg-7 col-xl-8">
      <div class="leads-details-tabs">
        <ul class="nav nav-tabs border-0 mb-25" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
                <button
                        class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100 active"
                        id="tasks-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tasks-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="tasks-tab-pane"
                        aria-selected="true"
                      >
                        Ressources
                      </button>
          </li>


          <li class="nav-item" role="presentation">
            <button class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
              id="attachments-tab" data-bs-toggle="tab" data-bs-target="#attachments-tab-pane" type="button" role="tab"
              aria-controls="attachments-tab-pane" aria-selected="false">
              Attachments
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div  class="tab-pane fade show active Mytap"
                      id="tasks-tab-pane"
                      role="tabpanel"
                      tabindex="0">
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
              <div
                class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
                <h5 class="card-title fw-bold mb-0">Ressources</h5>
                <div class="d-flex align-items-center mt-10 mt-md-0">
                  <form class="search-box position-relative me-15">
                    <input type="text" class="form-control shadow-none text-black rounded-0 border-0"
                      placeholder="Search email" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                      <i class="flaticon-search-interface-symbol"></i>
                    </button>
                  </form>
                  <button
                    class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block mt-10 mt-sm-0"
                    type="button">
                    <i class="flaticon-dots"></i>
                  </button>
                </div>
              </div>
              <div
                class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
                <div class="table-responsive">
                  <h5 v-if="getPartner?.attributes?.villas?.data" >Villas </h5>
                  <hr />
                     <table class="table text-nowrap align-middle mb-0" v-if="getPartner?.attributes?.villas?.data">
                    <thead>
                      <tr>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                          city
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
rooms
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          baths
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                         view
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          sleeps
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          daily
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          new_daily
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          deposit
                        </th>
                        <th scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in getPartner?.attributes?.villas?.data"  :key="item.id">
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                         {{ item?.attributes?.city }}
                        </td>
                        <td class="shadow-none lh-1 fw-medium">
                          <span class="badge text-outline-warning">     {{ item?.attributes?.rooms }}</span>
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                              {{ item?.attributes?.baths }}
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                          <div class="dropdown">
                                  {{ item?.attributes?.view }}

                          </div>
                        </td>
                              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                          <div class="dropdown">
                                  {{ item?.attributes?.sleeps }}

                          </div>
                        </td>
                           <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                          <div class="dropdown">
                                  {{ item?.attributes?.daily }}

                          </div>
                        </td>
                            <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                          <div class="dropdown">
                                  {{ item?.attributes?.new_daily }}

                          </div>
                        </td>
                            <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                          <div class="dropdown">
                                  {{ item?.attributes?.deposit }}

                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                <h5 v-if="getPartner?.attributes?.vehicules?.data" >Vehicles </h5>
                  <hr />
                  <table class="table text-nowrap align-middle mb-0" v-if="getPartner && getPartner?.attributes?.events?.data" >
                    <thead>
                      <tr>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                          make
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          brand
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          style
                        </th>
                           <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          seats
                        </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          msrp
                        </th>
                             <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          daily

                        </th>
                           <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          new_daily

                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          deposit
                        </th>

                        <th scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="item in getPartner?.attributes?.vehicules?.data" :key="item.id">
                        <th class="shadow-none lh-1 fw-medium text-black-emphasis title fs-md-15 fs-lg-16 ps-0">
                          {{item.attributes.make}}
                         </th>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
 {{item.attributes.brand}}
                        </td>
                        <td class="shadow-none lh-1 fw-medium">
                          <span class="badge text-outline-warning">
                             {{item.attributes.style}}

                          </span>
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                                      {{item.attributes.seats}}

                        </td>
 <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                                      {{item.attributes.msrp}}

                        </td>
  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                                      {{item.attributes.daily}}

                        </td>
                         <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                                      {{item.attributes.new_daily}}

                        </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                                      {{item.attributes.deposit}}

                        </td>
                      </tr>
                    </tbody>
                  </table>
                             <h5  v-if="getPartner?.attributes?.events?.data" >Events </h5>
                  <hr />
                   <table  v-if="getPartner?.attributes?.events?.data"  class="table text-nowrap align-middle mb-0">
                    <thead>
                      <tr>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          name
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
                          price
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          total_bottles
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          total_seats
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          remaining_seats
                        </th>
                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          remaining_bottles
                        </th>

                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          bottles
                        </th>

                        <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                          start_date

                        </th>
                          <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                         location

                        </th>
                        <th scope="col"
                          class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in getPartner?.attributes?.events?.data" :key="item.id">
                        <th class="shadow-none lh-1 fw-medium text-black-emphasis title fs-md-15 fs-lg-16 ps-0">
                          {{item.attributes.name}}
                         </th>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                                   {{item.attributes.price}}

                        </td>
                        <td class="shadow-none lh-1 fw-medium">
                          <span class="badge text-outline-warning">
                            {{item.attributes.total_bottles}}
                          </span>
                        </td>
                        <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                            {{item.attributes.total_seats}}
                        </td>
                         <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                            {{item.attributes.remaining_seats}}
                        </td>
                         <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                            {{item.attributes.remaining_bottles}}
                        </td>
                          <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                            {{item.attributes.bottles}}
                        </td>
                           <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                            {{item.attributes.start_date}}
                        </td>
                             <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                            {{item.attributes.location}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="attachments-tab-pane" role="tabpanel" tabindex="0">
            <div class="card mb-25 border-0 rounded-0 bg-white attachments-box">
              <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
                <div class="mb-15 mb-md-20 mb-lg-25 d-sm-flex align-items-center justify-content-between">
                  <h5 class="card-title fw-bold mb-0">Attachments</h5>
                </div>
                <div v-if="getPartner?.attributes?.Documents "> </div>
 <!-- dddd --> <Media :documents="getPartner?.attributes?.Documents"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        <loading
      v-model:active="isLoading"
      :can-cancel="true"

      :is-full-page="fullPage"
    />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import PartnerInformation from "./PartnerInformation.vue";
import Media from "../../Reservations/FileManagar/FileManager.vue"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default defineComponent({
  name: "PartnerDetails",
  components: {  PartnerInformation ,Media  , Loading},

  data() {
    return {
      partners : null,
      isLoading:false
    };
  },
   computed: {
       ...mapGetters(["getPartner"]),
   },
  methods: {
  ...mapActions(["fetchPartnerById"]),
    async loadPartner() {
      const id = await  this.$route.params.id;
      await this.fetchPartnerById(id);
      console.log("Pdfsdfsfartner:", this.getPartner);
    },
   },

  async mounted() {
    this.isLoading=true
    await this.loadPartner()
        this.isLoading=false

   },
});
</script>

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
            <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing" style="width: 100%;">
  <RessourcesModal v-if="getPartner"
      :ressources="getPartner?.attributes"
    />
              <div
                class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">

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
import RessourcesModal from '../Ressources/RessourcesModal.vue'
import PartnerInformation from "./PartnerInformation.vue";
import Media from "../../Reservations/FileManagar/FileManager.vue"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default defineComponent({
  name: "PartnerDetails",
  components: {  PartnerInformation ,Media  , Loading,RessourcesModal},

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

<template>
  <div
    class="modal fade RefuseReservationModal"
    id="RefuseReservationModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-m">
      <div class="modal-content p-15 p-md-20">
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Refuse Reservation</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form @submit.prevent="refuse">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Rejection Reason
                  </label>
                  <div class="mb-0">
                    <textarea
                      v-model="rejection"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="Write your rejection reason"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Refuse
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="true"
  />
</template>

<script>
import { updateReservation } from "@/services/apiService";
import swal from "sweetalert";
import Loading from "vue-loading-overlay";

export default {
  components: { Loading },

  name: "RefuseReservationModal",
  props: {
    idReservation: {
      required: true,
    },
  },
  data() {
    return {
      rejection: "",
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async refuse() {
      this.isLoading = true;
      const res = await updateReservation(this.idReservation, {
        data: {
          status: "Canceled",
          rejection_reason: this.rejection,
        },
      });
      if (res) {
        this.isLoading = false;

        // Afficher un message de succès
        swal({
          text: "Reservation Canceled Successfully!",
          closeOnClickOutside: false,
        });
        this.$emit("close");
        this.isLoading = false;
      }
    },
  },
};
</script>

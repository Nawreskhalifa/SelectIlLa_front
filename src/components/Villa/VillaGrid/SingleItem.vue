<template>
  <div
    class="col-sm-6 col-lg-6 col-xxxl-3"
    v-if="
      villa &&
      villa.attributes &&
      villa.attributes.photos &&
      villa.attributes.photos.data &&
      villa.attributes.photos.data.length > 0
    "
  >
    <div class="card mb-25 border-0 rounded-0 bg-white single-product-box">
      <div class="card-body p-0 letter-spacing">
        <div class="image position-relative">
          <img
            @click="toggleModal"
            :src="
              getFullImageUrl(villa.attributes.photos.data[0].attributes.url)
            "
            class="imagev"
            alt="villa"
          />

          <button
            class="fav position-absolute bg-white rounded-circle border-0 p-0 d-inline-block"
            type="button"
            @click="toggleDeleteModal"
          >
            <i
              style="color: #6560f0 !important"
              class="fa fa-trash"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <div class="content p-20">
          <h4 class="mb-10 fw-semibold fs-16 fs-lg-18">
            {{ villa.attributes.name }} - {{ villa.attributes.city }}
          </h4>
          <div class="reviews d-flex align-items-center"></div>
          <div class="mt-10 price d-flex align-items-center">
            <span class="text-primary fw-bold fs-md-15 fs-lg-16">{{
              villa.attributes.daily
            }}</span>
          </div>
          <span>
            published : <span v-date="villa.attributes.publishedAt"></span>
          </span>
          <br />
          <span>
            updated : <span v-date="villa.attributes.updatedAt"></span>
          </span>
          <button
            type="button"
            class="add-to-cart-btn text-center d-block mt-15 fw-medium transition w-100 rounded-1 position-relative"
            @click="updateVillaModal"
          >
            Update This
            <i class="fas fa-edit"></i>
          </button>

          <VillaDetails
            @close="toggleModal"
            :modalActive="modalActive"
            :villa="villa"
          ></VillaDetails>
          <DeleteModal
            :show="deleteModalVisible"
            :propToDelete="villa.attributes.brand"
            @delete="handleDelete"
          />
          <UpdateVilla
            :show="isUpdate"
            :villa="villa"
            @close="updateVillaModal"
            @updatedData="newData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import VillaDetails from "../VillaDetails/VillaDetails.vue";
import DeleteModal from "@/components/Common/DeleteModal.vue";
import UpdateVilla from "../UpdateVilla/UpdateVilla.vue";

export default {
  props: {
    villa: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const modalActive = ref(false);
    const deleteModalVisible = ref(false);
    const isUpdate = ref(false);

    return { modalActive, deleteModalVisible, isUpdate };
  },

  methods: {
    getFullImageUrl(relativePath) {
      return `http://localhost:1337${relativePath}`;
    },
    addToFavorites() {
      console.log("Add to favorites:", this.villa);
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    handleDelete(confirmed) {
      if (confirmed) {
        this.$emit("itemDeleted", this.villa.id);
      } else {
        console.log("Deletion cancelled.");
      }

      this.deleteModalVisible = false;
      this.itemToDelete = "";
    },
    toggleDeleteModal() {
      this.deleteModalVisible = !this.deleteModalVisible;
    },
    updateVillaModal() {
      this.isUpdate = !this.isUpdate;
      console.log(this.isUpdate);
    },

    newData(event) {
      this.$emit("itemUpdated", event);
    },
  },
  directives: {
    date: {
      mounted(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
      updated(el, binding) {
        const date = new Date(binding.value);
        el.textContent = date.toLocaleString();
      },
    },
  },
  components: {
    VillaDetails,
    DeleteModal,
    UpdateVilla,
  },
};
</script>

<style scoped>
.imagev {
  width: 100%;
}
</style>

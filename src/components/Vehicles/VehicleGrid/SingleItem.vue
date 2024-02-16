<template>
  <div
    class="col-sm-6 col-lg-6 col-xxxl-3"
    :class="{ seletedElement: isSelected }"
    v-if="
      vehicle &&
      vehicle.attributes &&
      vehicle.attributes.photos &&
      vehicle.attributes.photos.data &&
      vehicle.attributes.photos.data.length > 0
    "
  >
    <div class="card mb-25 border-0 rounded-0 bg-white single-product-box">
      <div class="card-body p-0 letter-spacing">
        <div class="image position-relative">
          <img
          @click="toggleModal(vehicle.id)"
          :src="getFullImageUrl(vehicle.attributes?.photos.data[0].attributes?.url)"
          class="imagev"
          alt="vehicle"
          style="max-width: 100%; height: 200px"
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
          <button
            v-if="isSelected"
            class="bg-dark text-white rounded-1 border-1 p-2 d-inline-block"
            type="button"
          >
            <i class="fas fa-solid fa-check"></i>
          </button>
        </div>
        <div class="content p-20">
          <h4 class="mb-10 fw-semibold fs-16 fs-lg-18">
          <span>   {{ vehicle.attributes?.make?.data?.attributes?.name }}</span>  - <span>{{ vehicle.attributes.brand?.data?.attributes?.name }} </span>
          </h4>

          <div class="mt-10 price d-flex align-items-center justify-content-between"  >
            <span class="text-primary fw-bold fs-md-15 fs-lg-16">{{
              vehicle?.attributes?.msrp
            }}</span>
            <div class="lockbtn reviews d-flex align-items-center">
              <button
                @click="active(false)"
                class="lock"
                v-if="vehicle?.attributes?.isActive"
              >
                <i class="fas fa-solid fa-eye-slash"></i>
              </button>
              <button
                @click="active(true)"
                class="lock"
                v-if="!vehicle.attributes?.isActive"
              >
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <span>
            published : <span v-date="vehicle.attributes?.publishedAt"></span>
          </span>
          <br />
          <span>
            updated : <span v-date="vehicle.attributes?.updatedAt"></span>
          </span>
          <button
            type="button"
            class="add-to-cart-btn text-center d-block mt-15 fw-medium transition w-100 rounded-1 position-relative"
            @click="updateVehicle"
          >
            Update This
            <i class="fas fa-edit"></i>
          </button>
<!--
          <VehicleDetails
            @close="toggleModal"
            :modalActive="modalActive"
            :vehicle="vehicle"
          ></VehicleDetails> -->
          <DeleteModal
            :show="deleteModalVisible"
            :propToDelete="vehicle.attributes?.brand?.data?.attributes?.name"
            @delete="handleDelete"
          />
          <UpdateVehicle
            :show="isUpdate"
            :vehicle="vehicle"
            @close="updateVehicle"
            @updatedData="newData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import VehicleDetails from "../VehicleDetails/VehicleDetails.vue";
import DeleteModal from "@/components/Common/DeleteModal.vue";
import UpdateVehicle from "../UpdateVehicle/UpdateVehicle.vue";
import { updateVehicle } from "@/services/apiService";
export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
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
      const stockage = process.env.VUE_APP_STORAGE_URL
      return `${stockage}${relativePath}`;
    },
    addToFavorites() {
      console.log("Add to favorites:", this.vehicle);
    },
    toggleModal(id) {
      this.$router.push({ name: 'vehicledetails', params: { id: id }})
      // this.modalActive = !this.modalActive;
    },
    async active(value) {
      if (value === true) {
        const updatedData = {
          data: {
            isActive: true,
          },
        };
        const res = await updateVehicle(this.vehicle.id, updatedData);
        this.$emit("isActive", { status: true, id: res.data.data.id });
      } else {
        const updatedData = {
          data: {
            isActive: false,
          },
        };
        const res = await updateVehicle(this.vehicle.id, updatedData);
        console.log(res);
        this.$emit("isActive", { status: false, id: res.data.data.id });
      }
    },

    handleDelete(confirmed) {
      if (confirmed) {
        this.$emit("itemDeleted", this.vehicle.id);
      } else {
        console.log("Deletion cancelled.");
      }

      this.deleteModalVisible = false;
      this.itemToDelete = "";
    },
    toggleDeleteModal() {
      this.deleteModalVisible = !this.deleteModalVisible;
    },
    updateVehicle() {
      this.isUpdate = !this.isUpdate;
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
    // VehicleDetails,
    DeleteModal,
    UpdateVehicle,
  },
};
</script>

<style scoped>
.imagev {
  width: 100%;
}
.lock {
  color: #2b2a3f;
  background-color: white;
  border: none ;
  width: 50px;
  height: 40px;
  margin-right: 3px;
  border-radius: 40%;
}
.lockbtn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}




/* Add shadow effect */
.single-product-box {
  transition: box-shadow 0.3s ease;
}

.single-product-box:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 6px 20px rgba(0, 0, 0, 0.19);
}
</style>

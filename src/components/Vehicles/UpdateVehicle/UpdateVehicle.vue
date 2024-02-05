<template>
  <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <div class="card product-details-box">
            <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
              <i class="fas fa-times-circle close_icon" @click="closeModal"></i>

              <div
                class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing"
              >
                <form @submit.prevent="submitForm">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10"
                          >Make</label
                        >
                        <input
                          v-model="make"
                          type="text"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. Sensung Smart Watch"
                        />
                        <div v-if="makeError" class="text-danger">
                          {{ makeError }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          Brand
                        </label>
                        <input
                          v-model="brand"
                          type="text"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. Sensung Smart Watch"
                        />
                        <div v-if="brandError" class="text-danger">
                          {{ brandError }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          style
                        </label>
                        <input
                          v-model="style"
                          type="text"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. style"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          deposit
                        </label>
                        <input
                          v-model="deposit"
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g deposit"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          msrp
                        </label>
                        <input
                          v-model="msrp"
                          type="text"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. msrp"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <button
                          type="button"
                          class="btn btn-primary"
                          style="
                            color: black;
                            background-color: white;
                            border: 1px solid black;
                          "
                          @click="checkUploadedFiles"
                        >
                          Check your uploaded files
                          <i
                            style="margin-left: 10px"
                            class="fa fa-file"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-md-12" v-show="showUploadedFiles">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          Vehicle Images
                        </label>

                        <div
                          v-if="
                            previousPhotos &&
                            previousPhotos.attributes &&
                            previousPhotos.attributes.photos &&
                            previousPhotos.attributes.photos.data.length > 0
                          "
                        >
                          <h4>Previous Photos:</h4>
                          <div
                            style="
                              display: flex;
                              flex-direction: row;
                              gap: 10px;
                              justify-content: flex-start;
                              align-items: center;
                            "
                          >
                            <div
                              v-for="photo in previousPhotos.attributes.photos
                                .data"
                              :key="photo.id"
                              style="width: 120px"
                            >
                              <img
                                :src="getFullPhotoUrl(photo.attributes.url)"
                                alt="Previous Photo"
                              />
                              <i
                                style="
                                  position: relative;
                                  top: 0;
                                  right: 0;
                                  color: rgb(29, 29, 29);
                                "
                                class="fas fa-times-circle"
                                @click="deleteImage(photo.id)"
                              ></i>
                            </div>
                          </div>
                        </div>

                        <h4
                          v-if="
                            previousPhotos &&
                            previousPhotos.attributes &&
                            previousPhotos.attributes.photos &&
                            previousPhotos.attributes.photos.data.length > 0
                          "
                        ></h4>
                        <div class="file-upload text-center position-relative">
                          <img
                            v-for="(url, index) in imageUrls"
                            :src="url"
                            :key="index"
                            alt="Uploaded Image"
                            class="preview-image"
                          />
                          <span class="d-block text-muted">
                            Drop Files Here Or
                            <span
                              @click="uploadImage"
                              class="text-black fw-medium position-relative"
                            >
                              Click To Upload
                            </span>
                          </span>
                          <input
                            type="file"
                            class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                            ref="fileInput"
                            @change="handleFileChange"
                            multiple
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          Description
                        </label>
                        <div class="mb-0">
                          <textarea
                            v-model="description"
                            class="form-control shadow-none rounded-0 text-black"
                            placeholder="Write your vehicle description"
                          ></textarea>
                        </div>
                        <div v-if="descriptionError" class="text-danger">
                          {{ descriptionError }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          Category Vehicles
                        </label>
                        <ul
                          style="
                            display: flex;
                            flex-direction: row;
                            gap: 10px;
                            justify-content: flex-start;
                            align-items: center;
                          "
                        >
                          <li
                            class="single_cat"
                            v-for="cat in previousCategories"
                            :key="cat.id"
                          >
                            <span> {{ cat.attributes.name }}</span>
                            <i
                              class="fas fa-times-circle"
                              @click="deleteFromCategories(cat)"
                            ></i>
                          </li>
                        </ul>
                        <select
                          v-model="selectedCategory"
                          class="form-select shadow-none fw-semibold rounded-0"
                          @change="addToPrevious"
                        >
                          <option selected>Select a Category</option>
                          <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                          >
                            {{ category.attributes.name }}
                          </option>
                        </select>
                        <div v-if="categoryError" class="text-danger">
                          {{ categoryError }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10"
                          >Daily</label
                        >
                        <div class="input-group">
                          <span
                            class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                          >
                            $
                          </span>
                          <input
                            v-model="daily"
                            type="text"
                            class="form-control shadow-none rounded-0 text-black"
                            placeholder="e.g. 120.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10"
                          >Mice</label
                        >
                        <div class="input-group">
                          <span
                            class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                          >
                            $
                          </span>
                          <input
                            v-model="mice"
                            type="text"
                            class="form-control shadow-none rounded-0 text-black"
                            placeholder="e.g. 15"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10"
                          >New Daily</label
                        >
                        <input
                          v-model="newDaily"
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 50"
                        />
                      </div>
                    </div>

                    <div class="col-md-12 text-danger"></div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10"
                          >Owner</label
                        >
                        <input
                          v-model="owner"
                          type="text"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. Leonardo DiCaprio"
                        />
                        <div v-if="ownerError" class="text-danger">
                          {{ ownerError }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black fw-semibold mb-10">
                          Seats
                        </label>
                        <input
                          v-model="seats"
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 4"
                        />
                        <div v-if="seatsError" class="text-danger">
                          {{ seatsError }}
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <button
                        class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                        type="submit"
                      >
                        Create Vehicle
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import {
  fetchVehicleCategories,
  uploadFiles,
  deleteFiles,
  updateVehicle,
} from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: {
    show: Boolean,
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      categories: [],
      make: this.vehicle.attributes.make,
      brand: this.vehicle.attributes.brand,
      description: this.vehicle.attributes.description,
      previousCategories: this.vehicle.attributes.category_vehicles.data,
      selectedCategory: "",
      owner: this.vehicle.attributes.owner,
      seats: this.vehicle.attributes.seats,
      daily: this.vehicle.attributes.daily,
      mice: this.vehicle.attributes.mice,
      newDaily: this.vehicle.attributes.new_daily,
      msrp: this.vehicle.attributes.msrp,
      style: this.vehicle.attributes.style,
      deposit: this.vehicle.attributes.deposit,
      showUploadedFiles: false,
      previousPhotos: this.vehicle,
      selectedFiles: [],
      imageUrls: [],
    };
  },
  watch: {
    previousCategories: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true,
    },
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },
    async fetchCategories() {
      const data = await fetchVehicleCategories();
      this.categories = data.data;
    },
    deleteFromCategories(cat) {
      this.previousCategories = this.previousCategories.filter(
        (item) => item !== cat
      );
    },

    addToPrevious() {
      if (this.selectedCategory !== "" || this.selectedCategory !== null) {
        console.log(this.selectedCategory);
        const selectedCategory = this.categories.find(
          (category) => category.id === this.selectedCategory
        );
        if (this.selectedCategory) {
          const exists = this.previousCategories.some(
            (category) => category.id === this.selectedCategory
          );

          if (!exists) {
            const selectedCategory = this.categories.find(
              (category) => category.id === this.selectedCategory
            );

            if (selectedCategory) {
              this.previousCategories.push(selectedCategory);
            }
          }
        }
      }
    },
    getFullPhotoUrl(relativeUrl) {
      return `http://localhost:1337${relativeUrl}`;
    },
    checkUploadedFiles() {
      this.showUploadedFiles = !this.showUploadedFiles;
    },
    handleFileChange(event) {
      const input = event.target;
      this.selectedFiles = Array.from(input.files || []);
      this.previewImages();
    },
    previewImages() {
      this.imageUrls = [];

      for (const file of this.selectedFiles) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageUrls.push(event.target?.result);
        };
        reader.readAsDataURL(file);
      }
    },
    async uploadImage() {
      if (this.selectedFiles.length === 0) {
        return;
      }

      const formData = new FormData();
    },
    async deleteImage(id) {
      if (
        this.previousPhotos &&
        this.previousPhotos.attributes &&
        this.previousPhotos.attributes.photos &&
        this.previousPhotos.attributes.photos.data
      ) {
        this.previousPhotos.attributes.photos.data =
          this.previousPhotos.attributes.photos.data.filter(
            (item) => item.id !== id
          );
      }
      await deleteFiles(id);
    },
    // async saveNewFiles() {
    //   const result =
    //   console.log(result);
    // },
    async submitForm() {
      const allCategories = this.previousCategories.map((item) => {
        return item.id;
      });
      const vehicleData = {
        data: {
          make: this.make,
          brand: this.brand,
          style: this.style,
          msrp: this.msrp,
          daily: parseFloat(this.daily),
          mice: parseFloat(this.mice),
          new_daily: parseFloat(this.newDaily),
          deposit: parseFloat(this.deposit),
          description: this.description,
          owner: this.owner,
          category_vehicles: allCategories,
          seats: parseInt(this.seats),
        },
      };
      if (this.selectedFiles.length > 0) {
        await uploadFiles(
          this.selectedFiles,
          "api::vehicle.vehicle",
          "photos",
          this.vehicle.id
        );
      }
      const result = await updateVehicle(this.vehicle.id, vehicleData);

      if (result.success) {
        this.$emit("updatedData", result.data.data);

        toast.success("Vehicle Updated  🚗 👍 ", {
          autoClose: 1000,
        });
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(110, 110, 110, 0.7);
}

.modal-inner {
  position: relative;
  width: 80%;
  height: 80%;
  max-width: 800px; /* Set a max-width to avoid excessive width on larger screens */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 20px; /* Reduce padding for smaller screens */
  text-align: center;

  .confirmation-text {
    font-size: 18px;
    margin-bottom: 24px;
  }

  .buttons {
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      margin: 0 8px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;

      &.confirm-button {
        background-color: #6560f0;
        color: #fff;
      }

      &.cancel-button {
        background-color: #fff;
        color: #6560f0;
      }

      &:hover {
        background-color: #34495e;
      }
    }
  }

  .close_icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }
  ul {
    list-style: none;
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 16px; /* Adjust padding for smaller screens */
  }
}
.single_cat {
  padding: 4px;
  background-color: rgb(255, 255, 255);
  color: #6560f0;
  font-weight: bold;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  flex-direction: row;
  gap: 5px;
  align-items: center;
}
.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 10px;
}
</style>

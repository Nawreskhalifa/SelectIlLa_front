<template>
  <!-- <MultiSelect  /> -->

  <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-6">
            <MultiSelect
              :options="makes"
              :selected="make"
              @update:selectedOne="updateMake"
              :placeholder="make?.attributes?.name"
              :label="'Make'"
              :multiSelect="false"
            />
          </div>
          <!-- Brand Selection -->
          <div class="col-md-6">
            <MultiSelect
              :options="brands"
              :selected="brand"
              @update:selectedOne="updateBrand"
              :placeholder="brand?.attributes?.name"
              :multiSelect="false"
              :label="'Brand'"
            />
          </div>

          <div class="col-md-6">
             <MultiSelect
              :options="styles"
              :selected="style"
              @update:selectedOne="updateStyle"
              :placeholder="style?.attributes?.name"
              :multiSelect="false"
              :label="'Style'"
            />
           </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Deposit
              </label>
              <input
                v-model="deposit"
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g deposit"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  <abbr title="Manufacturer's Suggested Retail Price"
                    >MSRP</abbr
                  ></label
                >
                <input
                  v-model="msrp"
                  type="number"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 248500"
                />
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-end">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <button
                  type="button"
                  class="form-control shadow-none rounded-0 text-black"
                  @click="checkUploadedFiles"
                >
                  Check your uploaded files
                  <i
                    v-if="!showUploadedFiles"
                    style="margin-left: 15px"
                    class="fa-solid fa-arrow-down"
                    aria-hidden="true"
                  ></i>
                  <i
                    v-if="showUploadedFiles"
                    style="margin-left: 15px"
                    class="fa-solid fa-arrow-right"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="showUploadedFiles">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <div
                v-if="
                  previousPhotos &&
                  previousPhotos.attributes &&
                  previousPhotos.attributes.photos &&
                  previousPhotos.attributes.photos.data.length > 0
                "
              >
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    justify-content: flex-start;
                    align-items: center;
                  "
                >
                  <GallayImages
                    @deletePhoto="deleteImage"
                    @coverImageIndex="handleCover"
                    galleryID="my-test-gallery"
                    :images="previousPhotos.attributes.photos.data"
                  />
                </div>
              </div>

              <h4
                v-if="
                  previousPhotos ||
                  (previousPhotos &&
                    previousPhotos.attributes &&
                    previousPhotos.attributes.photos &&
                    previousPhotos.attributes.photos.data.length > 0)
                "
              ></h4>
              <div class="file-upload-area">
                <div class="file-upload text-center position-relative">
                  <div class="image-grid" style="z-index: 1">
                    <!-- <div
                      v-for="(url, index) in imageUrls"
                      :key="index"
                      class="uploaded-image"
                    >
                      <img
                        :src="url"
                        :alt="'Uploaded Image ' + (index + 1)"
                        class="preview-image"
                      />
                      <button
                        type="button"
                        class="cancel-button"
                        @click.prevent="removeImage(index)"
                      >
                        Cancel
                      </button>
                    </div> -->
                  </div>
                  <span class="d-block text-muted" style="z-index: 0.3">
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
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Description
              </label>
              <div class="mb-0" v-if="description">
                <!-- <div id="editorcontainer" style="height:12em; min-height:100%; overflow-y:auto;"> -->

                <QuillEditor
                  style="height: 12em"
                  theme="snow"
                  :placeholder="description"
                  v-model:content="description"
                  toolbar="full"
                />
                <!-- </div> -->
              </div>
              <div v-if="descriptionError" class="text-danger">
                {{ descriptionError }}
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Daily</label>
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
              <label class="d-block text-black fw-semibold mb-10">Mice</label>
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

          <div class="col-md-6">
            <MultiSelect
              :options="transormPartner"
              :selected="partner"
              @update:selectedOne="updatePartner"
              :placeholder="getSelectedPartnerName"
              :multiSelect="false"
              :label="'Partner'"
            />
          </div>
          <div class="col-md-12 text-danger"></div>

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
          <div class="col-md-6">
            <!-- <MultiSelect  :options="makes" :selected="make" @update:selectedOne="updateMake" :placeholder="make?.attributes?.name" :label="'Tags'"   :multiSelect="true"    /> -->
          </div>
          <div class="col-md-12">
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Update Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
  </div>
</template>
<script>
import {
  uploadFiles,
  deleteFiles,
  fetchPartners,
  fetchMakes,
  fetchBrands,
  fetchBrandMyMake,
  fetchVehicleById,
  updateVehicle,
  fetchStyles
} from "@/services/apiService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import GallayImages from "../../Common/Gallary.vue";
import MultiSelect from "../../../components/Common/MultiSelect.vue";

export default {
  components: {
    Loading,
    GallayImages,
    MultiSelect,
  },
  data() {
    return {
      // this.vehicle.attributes.make?.data.attributes.name
      //
      coverImageIndex: 0,
      brandsLoading: false,
      previousMake: "",
      previousBrand: "",
      make: "",
      brand: "",
      style:"",
      description: "",
      // previousCategories: this.vehicle.attributes.category_vehicles.data,
      selectedCategory: "",
      // owner: this.vehicle.attributes.owner,
      seats: "",
      daily: "",
      mice: "",
      newDaily: "",
      msrp: "",
      styles:[],
      deposit: "",
      partner: "",
      showUploadedFiles: false,
      previousPhotos: "",
      categories: [],
      makes: [],
      brands: [],

      vehicle: "",
      isLoading: false,
      selectedFiles: [],
      imageUrls: [],
      partnerData: [],

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
  computed: {
     transormPartner(){
      let trans = []
        this.partnerData.forEach((item)=> {
           trans.push({id : item.id  , attributes : { name : item.name}})
        })
        return trans
    },
    getSelectedPartnerName() {
      if (this.partnerData && this.partnerData.length > 0) {
        const selectedPartner = this.partnerData.find(
          (partner) => partner.id === this.partner
        );
        return selectedPartner ? selectedPartner.name : "";
      }
      return "";
    },
  },
  methods: {
    handleCover(event){
this.coverImageIndex =event
     },
    updatePartner(partner) {
      this.partner = partner[0];
    },
    updateStyle(event){
      this.style= event[0]
    },
    updateMake(selectedMake) {
      console.log("okay");
      this.make = selectedMake[0];
      console.log(selectedMake);
      this.brands = [];
      if (selectedMake) {
        this.getBrands(selectedMake[0]);
      }
    },
    updateBrand(selectedBrand) {
      this.brand = selectedBrand[0];
    },
    removeImage(index) {
      this.imageUrls.splice(index, 1);
      this.selectedFiles.splice(index, 1);
    },
    closeModal() {
      this.$emit("close");
    },
    async fetchVehicleBId() {
      const id = this.$route.params.id;
      const { data } = await fetchVehicleById(id);
      this.vehicle = data;
      console.log(this.vehicle, "vehicle toupdate ");

      if (this.vehicle && this.vehicle.attributes) {
        this.previousMake = this.vehicle.attributes.make;
        this.previousBrand = this.vehicle.attributes.brand;
        this.make = this.vehicle.attributes.make.data;
        this.brand = this.vehicle.attributes.brand.data;
        this.description = this.vehicle.attributes.description;
        this.seats = this.vehicle.attributes.seats;
         this.daily = this.vehicle.attributes.daily;
        this.mice = this.vehicle.attributes.mice;
        this.newDaily = this.vehicle.attributes.new_daily;
        this.msrp = this.vehicle.attributes.msrp;
        this.style = this.vehicle.attributes.style.data;
        this.deposit = this.vehicle.attributes.deposit;
        this.partner = this.vehicle.attributes.partner.data
          ? this.vehicle.attributes.partner.data.id
          : null;
        this.previousPhotos = this.vehicle;
      }
    },

    async fetchMakesCat() {
      try {
        const { data } = await fetchMakes();
        this.makes = data;
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    },

    async getBrands(selectedMake) {
      try {
        this.brandsLoading = true;
        const data = await fetchBrandMyMake(selectedMake.id);
        this.brands = data.data;
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        this.brandsLoading = false;
      }
    },
    getFullPhotoUrl(relativeUrl) {
      const stockage = process.env.VUE_APP_STORAGE_URL;

      return `${stockage}${relativeUrl}`;
    },
    checkUploadedFiles() {
      this.showUploadedFiles = !this.showUploadedFiles;
    },
    async handleFileChange(event) {
  try {
    const input = event.target;
    console.log('Files selected:', input.files);

    if (!input.files || input.files.length === 0) {
      return;
    }

    const formData = new FormData();
    Array.from(input.files).forEach((file) => {
      formData.append('photos', file);
    });
     this.isLoading =true
    const response = await uploadFiles(formData, 'api::vehicle.vehicle', 'photos', this.vehicle.id);
    console.log(response.data)
    if (response && Array.isArray(response.data.filesData)) {
      response.data.filesData.forEach(item => {
        const transformedData = {
          id: item.id,
          attributes: {
            alternativeText: item.alternativeText || null,
            caption: item.caption || null,
            createdAt: item.createdAt,
            ext: item.ext,
            url: item.url,
            formats: {
              large: {
                url: item.url,
                width: item.width,
                height: item.height,
              },
            },
          },
        };

        if (transformedData && this.previousPhotos && this.previousPhotos.attributes && this.previousPhotos.attributes.photos && this.previousPhotos.attributes.photos.data && this.previousPhotos.attributes.photos.data.length >= 0) {
          this.previousPhotos.attributes.photos.data.push(transformedData);
        }
      });
           this.isLoading =false
    } else {
      toast.error('Failed to upload images');
    }
  } catch (error) {
    console.error('Error uploading images:', error);
    toast.error('An error occurred while uploading images');
  }
}
,

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
      //
    },
    async deleteImage(id) {
      if (
        this.previousPhotos &&
        this.previousPhotos.attributes &&
        this.previousPhotos.attributes.photos &&
        this.previousPhotos.attributes.photos.data
      ) {
        // Remove the deleted photo from the array
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
    async fetchPartner() {
      this.partnerData = await fetchPartners();
      console.log(this.partnerData, "partners");
    },
    async fetchStyles(){
    const {data}= await fetchStyles()
    this.styles =data
    },

    async submitForm() {
      this.isLoading = true;
      const vehicleData = {
        data: {
          make: this.make.id,
          brand: this.brand.id,
          style: this.style.id,
          msrp: this.msrp,
          cover_image_index:this.coverImageIndex ,
          daily: parseFloat(this.daily),
          mice: parseFloat(this.mice),
          new_daily: parseFloat(this.newDaily),
          deposit: parseFloat(this.deposit),
          seats: parseInt(this.seats),
          partner: this.partner,
          description:
            this.description.ops && this.description.ops.length > 0
              ? this.description.ops[0].insert
              : this.vehicle.attributes.description,
        },
      };
      try {
        const result = await updateVehicle(this.vehicle.id, vehicleData);
        if (result.success) {
          this.$router.push({ path: "/vehiclelist" });
          toast.success("Vehicle Updated 🚗 👍", { autoClose: 1000 });
        } else {
          toast.error("Failed to update vehicle");
        }
      } catch (error) {
        console.error("Error updating vehicle:", error);
        toast.error("An error occurred while updating vehicle");
      }
      this.isLoading = false;
    },
  },
  async mounted() {
    this.isLoading = true;
    // this.fetchCategories();
    await this.fetchVehicleBId();
    await this.fetchPartner();
        await this.fetchStyles();
    await this.fetchMakesCat();
    this.isLoading = false;
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
  max-width: 800px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 20px;
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
    padding: 16px;
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
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.uploaded-image {
  position: relative;
}

.cancel-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.8); /* Adjust opacity as needed */
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

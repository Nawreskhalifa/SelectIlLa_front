<template>
  <div>
    <div class="card mb-25 border-0 rounded-0 bg-white add-product-box">
      <!-- <i class="fas fa-times-circle close_icon" @click="closeModal"></i> -->

      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">Name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. Sensung Smart Watch"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  City
                </label>
                <input
                  v-model="city"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. Sensung Smart Watch"
                />
              </div>
            </div>
 <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <MultiSelectVilla
              :options="categories"
              :selected="category"
              :selectedTagsProp="previousCategories"
              @update:selected="updateCategories"
              :placeholder="'eg .Mountain view Villas'"
              :multiSelect="multiple"
              :label="'Categories'"
            />
                <div v-if="categoryError" class="text-danger">
                  {{ categoryError }}
                </div>
              </div>
            </div>
             <div class="col-md-6">
             <MultiSelect
              :options="transormPartner"
              :selected="partner"
              @update:selectedOne="updatePartner"
              :placeholder="partner?.data?.attributes?.name"
              :multiSelect="false"
              :label="'Partner'"
            />
            </div>




            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Description
                </label>
                <div class="mb-0" v-if="description">
                  <QuillEditor
                                    style="height: 12em"

                    theme="snow"
                    :placeholder="description"
                    v-model:content="description"
                    toolbar="full"
                  />
                </div>
                <div v-if="descriptionError" class="text-danger">
                  {{ descriptionError }}
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
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Minioeuvre Daily
                </label>
                <input
                  v-model="minioeuvre_daily"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 4"
                />
              </div>
            </div>
   <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">Pool</label>

                  <input
                    v-model="pool"
                    type="number"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. 15"
                  />
              </div>
            </div>
    <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Rooms
                </label>
                <input
                  v-model="rooms"
                  type="number"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. style"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sleeps
                </label>
                <input
                  v-model="sleeps"
                  type="number"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 4"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  View
                </label>
                <input
                  v-model="view"
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 4"
                />
              </div>
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

                <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Baths
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
              <label class="d-block text-black fw-semibold mb-10">Status</label>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  class="form-check-input shadow-none"
                  type="radio"
                  name="communicationRadio"
                  id="activeRadio"
                  v-model="status"
                  :value="false"
                />
                <label class="form-check-label" for="activeRadio">Active</label>
              </div>
              <div
                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
              >
                <input
                  class="form-check-input shadow-none"
                  type="radio"
                  name="communicationRadio"
                  id="deactivatedRadio"
                  v-model="status"
                  :value="true"
                />
                <label class="form-check-label" for="deactivatedRadio"
                  >In Active</label
                >
              </div>
            </div>
            </div>

              <div class="col-md-12" >
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                 <div
                          v-if="
                            previousPhotos &&
                            previousPhotos.attributes &&
                            previousPhotos.attributes?.photos &&
                            previousPhotos.attributes?.photos.data.length > 0
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
                    <!-- <div
                    v-for="photo in previousPhotos.attributes.photos.data"
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
                  </div> -->
                    <GallayImages
                      @deletePhoto="deleteImage"
                      galleryID="my-test-gallery"
                      @coverImageIndex="handleCover"
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
                      <div
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
                      </div>
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
                    />
                  </div>
                </div>
              </div>
            </div>



            <div class="col-md-12">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit"
              >
                Update Villa
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
</template>
<script>
import {
  uploadFiles,
  deleteFiles,
  updateVilla,
  fetchVillaCategories,
  fetchVillaById,
  fetchPartners,
} from "@/services/apiService";
import GallayImages from "../../Common/Gallary.vue";
import MultiSelect from "../../../components/Common/MultiSelect.vue";
import MultiSelectVilla from "../../../components/Common/MultiVilla.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  components: {
    Loading,
    GallayImages,
    MultiSelect,
    MultiSelectVilla
    //   Loading
  },
  data() {
    return {
      villa: {},
      name: "",
      coverImageI:0,
      city: "",
      rooms: 0,
      baths: 0,
      pool: 0,
      allCategories:[] ,
      view: "",
      sleeps: 0,
      daily: 0,
      newDaily: 0,
      deposit: 0,
      status:true ,
      description: "",
      minioeuvre_daily: "",
      selectedPartner: "",
      partner: "",
      categories: [],
      selectedCategory: "",
      previousCategories: [],
      showUploadedFiles: false,
      selectedFiles: [],
      imageUrls: [],
      previousPhotos: null,
      partnerData: [],
      isLoading: false,
    };
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
  watch: {
    previousCategories: {
      handler(newValue, oldValue) {
        console.log(newValue,"wiou");
      },
      deep: true,
    },
  },

  methods: {

  async updateCategories(event) {
  console.log(event);
  this.allCategories.push(...event);
  console.log(this.allCategories, "all ok");
},

updatePartner(event) {
  console.log(this.partner = event[0]);
this.partner = event[0]
},


    async getVillaById() {
      const id = this.$route.params.id;
      const { data } = await fetchVillaById(id);
      this.villa = data;
      this.name = this.villa.attributes.name;
      this.city = this.villa.attributes.city;
      this.rooms = this.villa.attributes.rooms;
      this.baths = this.villa.attributes.baths;
      this.pool = this.villa.attributes.pool;
      this.view = this.villa.attributes.view;
      this.sleeps = this.villa.attributes.sleeps;
      this.daily = this.villa.attributes.daily;
      this.newDaily = this.villa.attributes.new_daily;
      this.deposit = this.villa.attributes.deposit;
      this.description = this.villa.attributes.description;
      this.minioeuvre_daily = this.villa.attributes.minioeuvre_daily;
      this.selectedPartner = this.villa.attributes.partner.data.id;
      this.previousCategories = this.villa.attributes.category_villas.data;
      this.selectedCategory = "";
      this.showUploadedFiles = false;
      this.previousPhotos = this.villa;
      this.status=this.villa.attributes.isActive
      this.partner = this.villa.attributes.partner;
    },

    closeModal() {
      this.$emit("close");
    },
    async fetchCategories() {
      const data = await fetchVillaCategories();
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
      const stockage = process.env.VUE_APP_STORAGE_URL;
      return `${stockage}${relativeUrl}`;
    },
    checkUploadedFiles() {
      this.showUploadedFiles = !this.showUploadedFiles;
    },
       async handleFileChange(event) {
           this.isLoading =true
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
    const response = await uploadFiles(formData,"api::villa.villa", 'photos',  this.villa.id);
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

    async fetchAllPartners() {
      this.partnerData = await fetchPartners();
      console.log(this.partnerData, "data");
    },
        handleCover(event){
this.coverImageIndex =event
     },
    async submitForm() {
      this.isLoading = true;
      let vehicleCategories = [] ;
          this.previousCategories.forEach(category => {
  vehicleCategories.push(category.id);
}),
      // const allCategories = this.previousCategories.map((item) => {
      //   return item.id;
      // });
      // console.log(allCategories);
      console.log(this.partner);
      const villaData = {
        data: {
          name: this.name,
          city: this.city,
          rooms: parseInt(this.rooms),
          baths: parseInt(this.baths),
          pool: parseInt(this.pool),
          view: this.view,
          isActive : this.status ,
          sleeps: parseInt(this.sleeps),
          daily: parseFloat(this.daily),
          new_daily: parseFloat(this.newDaily),
          deposit: parseFloat(this.deposit),
          minioeuvre_daily: this.minioeuvre_daily.toString(),
          category_villas: vehicleCategories ,
                    cover_image_index:this.coverImageIndex ,

          partner: this.partner,
          description:
            this.description.ops && this.description.ops.length > 0
              ? this.description.ops[0].insert
              : this.villa.attributes.description,
        },
      };

      const result = await updateVilla(this.villa.id, villaData);

      if (result.success) {
        // this.$emit("updatedData", result.data.data);
        // this.$emit("close");
this.$router.push({path: '/villalist'})

        toast.success("villa Updated  🚗 👍 ", {
          autoClose: 1000,
        });
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    },
  },
  async mounted() {
    this.isLoading = true
  await   this.getVillaById();
   await  this.fetchCategories();
   await  this.fetchAllPartners();
   console.log(this.partnerData,"ok")
   this.isLoading = false
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
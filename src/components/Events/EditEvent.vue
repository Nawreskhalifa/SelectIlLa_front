<template>
  <div class="card mb-25 border-0 rounded-0 bg-white edit-course-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form @submit.prevent="createEvent">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Event Name
              </label>
              <input
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                v-model="eventName"
                required
              />
              <span v-if="formSubmitted && !eventName" class="text-danger"
                >Event Name is required!</span
              >
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Event Description
              </label>
              <div class="mb-0">
                <textarea
                  v-model="description"
                  class="form-control shadow-none rounded-0 text-black"
                  rows="4"
                  placeholder="Write your meta description"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Categories
              </label>
              <VueMultiselect
                v-model="selectedCategories"
                :options="getCategoriesEvent"
                :multiple="true"
                :close-on-select="false"
                placeholder="Select some categories"
                label="name"
                track-by="id"
                color="blue"
                :option-class="{ 'selected-option': isSelected }"
              />
              <!-- <select
                v-model="category"
                class="form-select shadow-none fw-semibold rounded-0 select-same-width"
                style="height: 47px; border-color: #eeeee4"
                @change="addCategoryEvent"
              >
                <option selected>Select a Category</option>
                <option
                  v-for="category in getCategoriesEvent"
                  :key="category.id"
                  :value="category"
                >
                  {{ category?.name }}
                </option>
              </select> -->
              <!-- <div
                class="members-list"
                v-if="selectedCategories && selectedCategories.length > 0"
              >
                <div
                  v-for="(perv, i) in selectedCategories"
                  class="d-inline-block bg-gray rounded-1 fs-12 fw-medium text-primary p-5"
                  :key="i"
                >
                  {{ perv?.name }}
                  <button
                    type="button"
                    class="bg-transparent p-0 border-0 lh-1 transition"
                    @click="deleteFromCategories(perv)"
                  >
                    <i class="flaticon-close"></i>
                  </button>
                </div>
              </div> -->
              <span
                v-if="formSubmitted && selectedCategories.length === 0"
                class="text-danger"
                >Please select at least one category!</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Partner
              </label>
              <select
                class="form-select shadow-none fw-semibold rounded-0 select-same-width"
                style="height: 47px; border-color: #eeeee4"
                v-model="selectedPartner"
              >
                <option value="" selected>Select a partner</option>
                <option
                  v-for="partner in getPartners"
                  :key="partner.id"
                  :value="partner.id"
                >
                  {{ partner.name }}
                </option>
              </select>
              <span v-if="!selectedPartner" class="text-danger"
                >Partner is required!</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"
                >Ticket Price</label
              >

              <input
                type="number"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 120.00"
                required
                v-model="price"
              />
              <span v-if="formSubmitted && isNaN(price)" class="text-danger"
                >Please enter a valid number for the price.</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Location
              </label>
              <input
                type="text"
                class="form-control shadow-none text-black fs-md-15 lg-5"
                required
                v-model="location"
              />
              <span v-if="formSubmitted && !location" class="text-danger"
                >Location is required!</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Start Date
              </label>
              <input
                type="date"
                class="form-control shadow-none text-black fs-md-15 lg-5"
                required
                v-model="startDate"
              />
              <span v-if="formSubmitted && !startDate" class="text-danger"
                >Start Date is required!</span
              >
              <span
                v-else-if="formSubmitted && startDate < currentDate"
                class="text-danger"
                >Start Date must be today or later</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Start Time
              </label>
              <input
                type="Time"
                class="form-control shadow-none text-black fs-md-15 lg-5"
                required
                v-model="startTime"
                :min="currentDate"
              />
              <span v-if="formSubmitted && !startTime" class="text-danger"
                >Start Time is required!</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                End Date
              </label>
              <input
                type="date"
                class="form-control shadow-none text-black fs-md-15 lg-5"
                required
                v-model="endDate"
                :min="startDate"
              />
              <span v-if="formSubmitted && !endDate" class="text-danger"
                >End Date is required!</span
              >
              <span
                v-else-if="formSubmitted && endDate < startDate"
                class="text-danger"
                >endDate Date must be today or later</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                End Time
              </label>
              <input
                type="Time"
                class="form-control shadow-none text-black fs-md-15 lg-5"
                required
                v-model="endTime"
              />
              <span v-if="formSubmitted && !endTime" class="text-danger"
                >End Time is required!</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Seats
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value="0"
                class="form-control shadow-none rounded-0 text-black"
                required
                v-model="seats"
              />
              <span v-if="formSubmitted && !seats" class="text-danger"
                >Number of Seats is required!</span
              >
              <span v-else-if="seats < 1" class="text-danger"
                >Number of Seats must be at least 1</span
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Bottles
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value="0"
                class="form-control shadow-none rounded-0 text-black"
                required
                v-model="bottles"
              />
              <span v-if="formSubmitted && !bottles" class="text-danger"
                >Number of bottles is required!</span
              >
              <span v-else-if="formSubmitted && bottles < 1" class="text-danger"
                >Number of bottles must be at least 1</span
              >
            </div>
          </div>
          <div class="col-md-12">
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
                  :value="true"
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
                  :value="false"
                />
                <label class="form-check-label" for="deactivatedRadio"
                  >In Active</label
                >
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Upload Images
              </label>
              <div class="file-upload text-center position-relative">
                <input
                  type="file"
                  multiple
                  v-on:change="handleFileUpload"
                  accept="image/*"
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                />
                <i class="flaticon-image"></i>
                <span class="d-block text-muted">
                  Drop Images Here Or
                  <span class="text-black fw-medium position-relative">
                    Click To Upload
                  </span>
                </span>
              </div>
              <div
                v-if="photosFromDatabase && photosFromDatabase?.length > 0"
                class="image-preview"
              >
                <div
                  v-for="(photo, index) in photosFromDatabase"
                  :key="index"
                  class="image-item"
                >
                  <img :src="storageUrl + photo.url" alt="Selected Image" />
                  <button
                    type="button"
                    @click="removeImageFromDatabase(photo, index)"
                    class="delete_icon"
                  >
                    <i class="fas fa-times-circle"></i>
                    <!-- Icône de suppression -->
                  </button>
                  <input
                    type="radio"
                    :id="'radio_' + index"
                    v-model="coverImageIndex"
                    :value="index"
                    class="set_cover_button"
                    title="Set as a cover image"
                    style="cursor: pointer"
                  />
                </div>
              </div>
              <div
                v-if="newPhotos && newPhotos.length > 0"
                class="image-preview"
              >
                <!-- Afficher les nouvelles images téléchargées -->
                <div
                  v-for="(newPhoto, index) in newPhotos"
                  :key="'new_' + index"
                  class="image-item"
                >
                  <img :src="newPhoto.url" :alt="newPhoto.name" />
                  <button
                    @click="removeNewImage(index)"
                    class="delete_icon"
                    type="button"
                  >
                    <i class="fas fa-times-circle"></i>
                    <!-- Icône de suppression -->
                  </button>
                  <input
                    type="radio"
                    :id="'radio_' + index"
                    v-model="coverImageIndex"
                    :value="index"
                    class="set_cover_button"
                    title="Set as a cover image"
                    style="cursor: pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center justify-content-between">
                <button
                  class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
                  type="submit"
                  :disabled="getCategoriesLoading"
                  @click="setFormSubmitted"
                >
                  <span>Save Event</span>
                </button>
                <button
                  type="button"
                  class="bg-transparent p-0 border-0 text-danger lh-1 fw-medium"
                  @click="deleteAllSelectedPhotos"
                >
                  <i
                    class="flaticon-delete lh-1 me-1 position-relative top-2"
                  ></i>
                  <span class="position-relative"
                    >Delete All Selected Photos</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import {
  makeApiRequest,
  uploadFiles,
  deleteFiles,
} from "@/services/apiService";
import { methodsHttpNames } from "@/utils/methods";
import { endPoints } from "@/utils/endPoints";
import { storageUrl } from "../../utils/constants";
import swal from "sweetalert";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import VueMultiselect from "vue-multiselect";

export default defineComponent({
  name: "EditEvent",
  components: {
    Loading,
    VueMultiselect,
  },
  data() {
    return {
      isLoading: false,
      storageUrl: storageUrl,
      newPhotos: [],
      photosFromDatabase: [],
      selectedPhotos: [],
      category: [],
      selectedCategories: [],
      currentDate: new Date().toISOString().split("T")[0], // Date actuelle
      eventName: "",
      description: "",
      categories: "",
      price: "",
      location: "",
      startDate: new Date().toISOString().split("T")[0], // Date actuelle
      startTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Heure actuelle
      endDate: new Date().toISOString().split("T")[0], // Date actuelle
      endTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Heure actuelle
      seats: 1,
      bottles: 1,
      promoterName: "",
      promoterInfo: "",
      updatedPhotos: [],
      photos: [],
      categoriesEvent: [],
      categoriesSelected: [],
      selectedPartner: [],
      formSubmitted: false,
      status: false,
      coverImageIndex: 0,
    };
  },
  methods: {
    ...mapActions([
      "fetchAllCategoriesEvent",
      "updateEvent",
      "fetchOneCategoryEvent",
      "fetchOneEvent",
      "fetchAllPartners",
    ]),
    setFormSubmitted() {
      this.formSubmitted = true;
    },
    objetExisteDansListe(objetRecherche, listeObjets) {
      // Parcourir la liste d'objets
      for (let objet of listeObjets) {
        // Vérifier si l'objet courant correspond à l'objet recherché
        if (objet.id === objetRecherche.id) {
          // Retourner true si l'objet est trouvé
          return true;
        }
      }
      // Retourner false si l'objet n'est pas trouvé dans la liste
      return false;
    },
    async addCategoryEvent() {
      // Vous pouvez accéder à la catégorie sélectionnée via selectedCategories
      // selectedCategories contiendra l'identifiant de la catégorie sélectionnée
      // Vous pouvez rechercher l'objet de catégorie complet à partir de getCategoriesEvent
      const selectedCategory = this.getCategoriesEvent.find(
        (category) => category.id === this.category.id
      );

      // Assurez-vous que la catégorie sélectionnée existe
      if (selectedCategory) {
        // Vérifiez si la catégorie sélectionnée est déjà dans selectedCategoryNames
        const isCategoryAlreadySelected = this.selectedCategories.some(
          (category) => category.id === selectedCategory.id
        );

        // Si la catégorie n'est pas déjà sélectionnée, ajoutez-la à selectedCategoryNames
        if (!isCategoryAlreadySelected) {
          this.selectedCategories.push(selectedCategory);
        }
      }
    },

    removeNewImage(index) {
      this.newPhotos.splice(index, 1);
    },
    removeImageFromDatabase(obj, index) {
      this.updatedPhotos.push(obj.id);
      this.photosFromDatabase.splice(index, 1);
    },
    deleteAllSelectedPhotos() {
      this.newPhotos = [];
      this.photos = [];
      if (this.photosFromDatabase) {
        this.photosFromDatabase.forEach((item) => {
          this.updatedPhotos.push(item.id);
        });
      }
      this.photosFromDatabase = [];
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        const newPhoto = {
          id: "new_" + (this.newPhotos.length + 1),
          name: file.name,
          url: imageUrl,
          file: file,
        };
        this.newPhotos.push(newPhoto);

        // this.photos.push(...Array.from(event.target.files));
        // console.log(this.photos)
      }
    },
    deleteFromCategories(cat) {
      this.selectedCategories = this.selectedCategories.filter((item) => {
        return item.id !== cat.id;
      });
    },

    removeImage(index) {
      // Supprimer l'image à l'index spécifié
      this.photos.splice(index, 1);
      this.selectedPhotos.splice(index, 1);
    },
    async createEvent() {
      this.isLoading = true;

      const formData = new FormData();

      try {
        if (this.selectedCategories && this.selectedCategories.length) {
          for (let index = 0; index < this.selectedCategories.length; index++) {
            // Ajouter l'objet temporaire à formData
            formData.append(
              `category_events`,
              JSON.stringify(this.selectedCategories[index].id)
            );
          }
        }
        // Ajouter chaque champ du formulaire à l'objet FormData
        formData.append("id", this.getEvent.id);
        formData.append("name", this.eventName);
        formData.append("description", this.description);
        formData.append("price", this.price);
        formData.append("location", this.location);
        formData.append("start_date", this.startDate);
        formData.append("start_time", this.startTime);
        formData.append("end_date", this.endDate);
        formData.append("end_time", this.endTime);
        formData.append("total_seats", this.seats.toString());
        formData.append("total_bottles", this.bottles.toString());
        formData.append("name_promoter", this.promoterName);
        formData.append("promiting_info", this.promoterInfo);
        formData.append("active", this.status);
        formData.append("cover_image_index", this.coverImageIndex);

        const response = await makeApiRequest(
          methodsHttpNames.PUT,
          `${endPoints.findEvent}/${this.getEvent.id}`,
          formData,
          undefined
        );
        if (response.success) {
          this.isLoading = false;
          if (this.newPhotos && this.newPhotos.length) {
            this.newPhotos.forEach((item) => {
              this.photos.push(item.file);
            });
            console.log(this.photos);
            await uploadFiles(
              this.photos,
              "api::event.event",
              "photos",
              response.data.id
            );
          }
          this.updatedPhotos.forEach(async (item) => {
            await deleteFiles(item);
          });
          this.$router.push({ name: "EventListPage" });
          // Afficher un message de succès
          swal({
            text: "Event Updated Successfully!",
            closeOnClickOutside: false,
          });
        }
      } catch (error) {
        this.isLoading = false;

        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCategoriesError",
      "getCategoriesLoading",
      "getCategoriesEvent",
      "getEvent",
      "getPartners",
    ]),
  },
  async mounted() {
    if (this.$route.params && this.$route.params.idEvent) {
      this.isLoading = true;
      await this.fetchOneEvent(this.$route.params.idEvent);
      this.eventName = this.getEvent.name;
      this.description = this.getEvent.description;
      if (this.getEvent.categoryEvents && this.getEvent.categoryEvents.length) {
        this.selectedCategories = this.getEvent.categoryEvents.map(
          (category) => ({
            ...category,
          })
        );
      }
      console.log("selcted: ", this.selectedCategories);
      this.price = this.getEvent.price;
      this.location = this.getEvent.location;
      this.startDate = this.getEvent.startDate;
      this.startTime = this.getEvent.startTime;
      this.endDate = this.getEvent.endDate;
      this.endTime = this.getEvent.endTime;
      this.seats = this.getEvent.totalSeats;
      this.bottles = this.getEvent.totalBottles;
      this.status = this.getEvent.active;
      this.promoterName = this.getEvent.namePromoter;
      this.promoterInfo = this.getEvent.promotingInfo;
      this.coverImageIndex = this.getEvent.coverImageIndex;
      this.photosFromDatabase = this.getEvent.photos;
      if (this.getEvent.partner) {
        this.selectedPartner = this.getEvent.partner.id;
      }
      this.isLoading = false;
    }
    this.isLoading = true;

    await this.fetchAllCategoriesEvent({ page: null });
    await this.fetchAllPartners();
    this.isLoading = false;

    // Initialise currentDate avec la date actuelle au format YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    this.currentDate = `${year}-${month}-${day}`;
    // Initialise startDate avec la date actuelle
    this.startDate = this.currentDate;
  },
});
</script>
<style>
fieldset[disabled] .multiselect {
  pointer-events: none;
}

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 40px;
  height: 38px;
  background: #fff;
  display: block;
}

.multiselect__spinner::before,
.multiselect__spinner::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41b883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}

.multiselect__spinner::before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}

.multiselect__spinner::after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 40px;
  text-align: left;
  color: #35495e;
}

.multiselect * {
  box-sizing: border-box;
}

.multiselect:focus {
  outline: none;
}

.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}

.multiselect--active {
  z-index: 50;
}

.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}

.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: #fff;
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}

.multiselect__input::placeholder {
  color: #35495e;
}

.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}

.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}

.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}

.multiselect__tags-wrap {
  display: inline;
}

.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #0056b3;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}

.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}

.multiselect__tag-icon::after {
  content: "×";
  color: #370a99;
  font-size: 14px;
}

.multiselect__tag-icon:focus::after,
.multiselect__tag-icon:hover::after {
  color: white;
}

.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}

.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.multiselect__select::before {
  position: relative;
  right: 0;
  top: 65%;
  color: black;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: black transparent transparent transparent;
  content: "";
}

.multiselect__placeholder {
  color: #000000;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}

.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: #fff;
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}

.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}

.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #e8e8e8;
}

.multiselect__content::-webkit-scrollbar {
  display: none;
}

.multiselect__element {
  display: block;
}

.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option::after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}

.multiselect__option--highlight {
  background: #ededed;
  outline: none;
  color: black;
}

.multiselect__option--highlight::after {
  content: attr(data-select);
  background: #ededed;
}

.multiselect__option--selected {
  background: #ededed;
  color: #020202;
  font-weight: bold;
}

.multiselect__option--selected::after {
  content: attr(data-selected);
  color: #ededed;
  background: inherit;
}

.multiselect__option--selected.multiselect__option--highlight {
  color: #020202;
  font-weight: bold;
}

.multiselect__option--selected.multiselect__option--highlight::after {
  background: #ededed;
  content: attr(data-deselect);
  color: black;
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}

.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}

.multiselect__option--group {
  background: #ededed;
  color: #35495e;
}

.multiselect__option--group.multiselect__option--highlight {
  background: #ededed;
  color: #fff;
}

.multiselect__option--group.multiselect__option--highlight::after {
  background: #ededed;
}

.multiselect__option--disabled.multiselect__option--highlight {
  background: #ededed;
}

.multiselect__option--group-selected.multiselect__option--highlight {
  background: #ededed;
  color: #f9fcfc;
}

.multiselect__option--group-selected.multiselect__option--highlight::after {
  background: #ededed;
  content: attr(data-deselect);
  color: #fff;
}

.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}

.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}

.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}

*[dir="rtl"] .multiselect {
  text-align: right;
}

*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}

*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0 40px;
}

*[dir="rtl"] .multiselect__content {
  text-align: right;
}

*[dir="rtl"] .multiselect__option::after {
  right: auto;
  left: 0;
}

*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}

*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(2turn);
  }
}
</style>
<style scoped>
fieldset {
  border: none;
}

.delete_icon {
  position: absolute;
  top: 5px; /* Ajustez la position verticale selon vos besoins */
  left: 5px; /* Ajustez la position horizontale selon vos besoins */
  background-color: transparent; /* Couleur de fond du bouton */
  color: #121111; /* Couleur du texte */
  border: none; /* Supprimer la bordure */
  padding: 5px; /* Espacement intérieur */
  border-radius: 50%; /* Bordure arrondie pour un aspect de bouton circulaire */
  cursor: pointer; /* Curseur pointeur au survol */
  transition: background-color 0.3s ease; /* Animation de transition */
  margin-right: 10px; /* Ajouter une marge à droite pour créer de l'espace entre les boutons */
}

fieldset > label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
  vertical-align: top;
  font-size: 1rem;
  line-height: 28px;
}

fieldset > label::after {
  content: ":";
}

.image-item {
  position: relative;
  max-width: 150px;
  /* Taille maximale d'une image */
  margin-bottom: 5px;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-x: auto;
  max-height: 200px;
  /* Ajustez la hauteur maximale si nécessaire */
}

select,
details {
  display: inline-block;
  width: 250px;
  background-color: white;
  cursor: pointer;
}

select,
summary {
  border-collapse: collapse;
  border-radius: 4px;
  padding: 4px;
  width: 250px;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  border-color: darkgrey;
}

details[open] > summary::marker {
  color: var(--blue);
}

select:focus,
summary:focus,
summary:active {
  box-shadow: 0 0 5px 1px var(--blue);
}

ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
  margin-top: 2px;
  border: 1px solid var(--dk-gray);
  box-shadow: 0 0 5px 1px var(--lt-gray);
}

li {
  margin: 0px;
  padding: 0px;
}

li > label {
  cursor: pointer;
  display: inline-block;
  width: 100%;
}

li > label:hover,
li > label:has(input:checked) {
  background-color: var(--dk-gray);
}
.select-same-width {
  width: calc(100% - 24px); /* Réglez la largeur en fonction de vos besoins */
}
.set_cover_button {
  position: absolute;
  top: 5px; /* Ajustez la position verticale selon vos besoins */
  right: 5px; /* Ajustez la position horizontale selon vos besoins */
  background-color: transparent; /* Couleur de fond du bouton */
  color: #0056b3; /* Couleur du texte */
  border: none; /* Supprimer la bordure */
  padding: 5px; /* Espacement intérieur */
  border-radius: 50%; /* Bordure arrondie pour un aspect de bouton circulaire */
  cursor: pointer; /* Curseur pointeur au survol */
  transition: background-color 0.3s ease; /* Animation de transition */
}
</style>

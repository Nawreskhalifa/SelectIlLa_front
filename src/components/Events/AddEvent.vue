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
              <label class="d-block text-black fw-semibold mb-10"
                >Ticket Price</label
              >
              <input
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. 120.00"
                required
                v-model="price"
                pattern="\d+(\.\d{2})?"
                title="Please enter a valid price (e.g. 120.00)"
              />
              <span v-if="formSubmitted && !price" class="text-danger"
                >Ticket Price is required!</span
              >
              <span
                v-else-if="formSubmitted && !price.match(/^\d+(\.\d{2})?$/)"
                class="text-danger"
                >Please enter a valid price (e.g. 120.00)</span
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
                :min="currentDate"
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
              <span v-else-if="formSubmitted && seats < 1" class="text-danger"
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
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Categories
              </label>

              <select
                v-model="selectedCategories"
                class="form-select shadow-none fw-semibold rounded-0 select-same-width"
                style="height: 47px; border-color: #eeeee4"
                @change="addCategoryEvent"
              >
                <option selected>Select a Category</option>
                <option
                  v-for="category in getCategoriesEvent"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <div
                class="members-list"
                v-if="selectedCategoryNames && selectedCategoryNames.length > 0"
              >
                <div
                  v-for="(perv, i) in selectedCategoryNames"
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
              </div>
              <span
                v-if="formSubmitted && selectedCategoryNames.length === 0"
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
                @change="addPartner"
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
              <span v-if="formSubmitted && !selectedPartner" class="text-danger"
                >Partner is required!</span
              >
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
              <div v-if="photos.length > 0" class="image-preview">
                <div v-for="(photo, index) in selectedPhotos" :key="index" class="image-item">
                    <img :src="photo.url" alt="Selected Image" />
                    <button @click="removeImage(index)" class="delete_icon" type="button">
                        <i class="fas fa-times-circle"></i>
                        <!-- Icône de suppression -->
                    </button>
                </div>
            </div>
            </div>
          </div>

          <!-- <div class="col-md-12">
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
              <div v-if="photos.length > 0" class="image-preview">
                <div
                  v-for="(photo, index) in selectedPhotos"
                  :key="index"
                  class="image-item"
                >
                  <img :src="photo.url" alt="Selected Image" />
                  <button
                    @click="removeImage(index)"
                    class="delete_icon"
                    type="button"
                  >
                    <i class="fas fa-times-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div> -->
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
                type="submit"
                :disabled="getEventsLoading"
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
      </form>
    </div>
  </div>
  <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
</template>

<script>
import { defineComponent, computed } from "vue";
import { mapActions, mapGetters } from "vuex";
import { makeApiRequest } from "@/services/apiService";
import { methodsHttpNames } from "@/utils/methods";
import { endPoints } from "@/utils/endPoints";
import swal from "sweetalert";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default defineComponent({
  name: "AddEvent",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      selectedPhotos: [],
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
      photos: [],
      categoriesEvent: [],
      selectedPartner: [],
      selectedCategory: "",
      AllSelected: [],
      selectedCategoryNames: [],
      partner: [],
      formSubmitted: false,
    };
  },
  methods: {
    ...mapActions([
      "fetchAllCategoriesEvent",
      "addEvent",
      "fetchOneCategoryEvent",
      "fetchAllPartners",
    ]),
    deleteFromCategories(cat) {
      this.selectedCategoryNames = this.selectedCategoryNames.filter((item) => {
        return item.id !== cat.id; // Ajoutez le return ici
      });
    },
    addPartner() {
      this.partner = [];
      this.partner.push(this.selectedPartner);
    },
    addCategoryEvent() {
      // Vous pouvez accéder à la catégorie sélectionnée via selectedCategories
      // selectedCategories contiendra l'identifiant de la catégorie sélectionnée
      // Vous pouvez rechercher l'objet de catégorie complet à partir de getCategoriesEvent
      const selectedCategory = this.getCategoriesEvent.find(
        (category) => category.id === this.selectedCategories
      );

      // Assurez-vous que la catégorie sélectionnée existe
      if (selectedCategory) {
        // Vérifiez si la catégorie sélectionnée est déjà dans selectedCategoryNames
        const isCategoryAlreadySelected = this.selectedCategoryNames.some(
          (category) => category.id === selectedCategory.id
        );

        // Si la catégorie n'est pas déjà sélectionnée, ajoutez-la à selectedCategoryNames
        if (!isCategoryAlreadySelected) {
          this.selectedCategoryNames.push(selectedCategory);
        }
      }
    },
    handleFileUpload(event) {
      // this.testphoto = event.target.files[0]
      // Gérer le téléchargement de fichiers (photos) ici
      const newPhotos = Array.from(event.target.files);

      this.photos.push(...newPhotos);
      this.selectedPhotos = [];
      this.photos.forEach((item) => {
        this.selectedPhotos.push({
          id: item.name,
          url: URL.createObjectURL(item),
        });
      });
    },
    deleteAllSelectedPhotos() {
      this.photos = [];
      this.selectedPhotos = [];
    },
    removeImage(index) {
      // Supprimer l'image à l'index spécifié
      this.photos.splice(index, 1);
      this.selectedPhotos.splice(index, 1);
    },
    setFormSubmitted() {
      this.formSubmitted = true;
    },
    async createEvent() {
      this.isLoading = true;
      const formData = new FormData();

      try {
        this.selectedCategoryNames.forEach((item) => {
          // Ajouter le tableau d'identifiants de catégories à formData
          formData.append("category_events", JSON.stringify(item.id));
        });
        formData.append("partner", this.partner);
        // Ajouter chaque champ du formulaire à l'objet FormData
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
        if (this.photos && this.photos.length) {
          this.photos.forEach((photo) => {
            formData.append("files.photos", photo);
          });
        }

        const response = await makeApiRequest(
          methodsHttpNames.POST,
          endPoints.findEvent,
          formData,
          undefined
        );
        if (response.success) {
          this.isLoading = false;

          await this.addEvent(response.data.data);
          this.$router.push({ name: "EventListPage" });
          // Afficher un message de succès
          swal({
            text: "Event Added Successfully!",
            closeOnClickOutside: false,
          });
        }
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCategoriesError",
      "getCategoriesLoading",
      "getCategoriesEvent",
      "getEventsLoading",
      "getEventsError",
      "getPartners",
    ]),
    categoriesOptions() {
      if (this.getCategoriesEvent && this.getCategoriesEvent.length) {
        // Formattez les catégories pour les options de vue-multiselect
        return this.getCategoriesEvent.map((category) => ({
          id: category.id,
          name: category.name,
        }));
      }
      return [];
    },
  },

  async mounted() {
    await this.fetchAllCategoriesEvent({ page: null });
    await this.fetchAllPartners();
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
<style scoped>
fieldset {
  border: none;
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

select,
details {
  display: inline-block;
  width: 250px;
  background-color: white;
  cursor: pointer;
}

.delete_icon {
  position: absolute;
  top: -1px;
  right: 10px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: rgb(232, 227, 227);
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
.select-same-width {
  width: calc(100% - 24px); /* Réglez la largeur en fonction de vos besoins */
}
</style>

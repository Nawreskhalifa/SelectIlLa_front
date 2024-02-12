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
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <fieldset>
                <details>
                  <summary>Select categories:</summary>
                  <ul>
                    <li
                      v-for="category in getCategoriesEvent"
                      :key="category.id"
                    >
                      <label>
                        <input
                          type="checkbox"
                          :checked="
                            objetExisteDansListe(category, selectedCategories)
                          "
                          @change="addCategoryEvent(category)"
                        />
                        {{ category.name }}
                      </label>
                    </li>
                  </ul>
                </details>
              </fieldset>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"
                >Ticket Price</label
              >
              <div class="input-group">
                <span
                  class="input-group-text rounded-0 fs-14 fw-bold text-primary"
                >
                  $
                </span>
                <input
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. 120.00"
                  required
                  v-model="price"
                />
              </div>
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
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Promoter Name
              </label>
              <input
                type="text"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                v-model="promoterName"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Promoter Information's
              </label>
              <input
                type="text-area"
                class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning"
                v-model="promoterInfo"
              />
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
              <div v-if="photosFromDatabase.length > 0" class="image-preview">
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
                </div>
              </div>
              <div v-if="newPhotos.length > 0" class="image-preview">
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
                >
                  <span v-if="!getCategoriesLoading">Save Event</span>
                  <div
                    v-if="getCategoriesLoading"
                    class="spinner-border"
                    role="status"
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
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

export default defineComponent({
  name: "AddEvent",
  components: {},
  data() {
    return {
      storageUrl: storageUrl,
      newPhotos: [],
      photosFromDatabase: [],
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
      updatedPhotos: [],
      photos: [],
      categoriesEvent: [],
      categoriesSelected: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchAllCategoriesEvent",
      "updateEvent",
      "fetchOneCategoryEvent",
      "fetchOneEvent",
    ]),
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
    addCategoryEvent(category) {
      // Vérifier si la catégorie est déjà dans la liste
      const existingCategoryIndex = this.selectedCategories.findIndex(
        (cat) => cat.id === category.id
      );
      if (existingCategoryIndex === -1) {
        // Si la catégorie n'est pas déjà dans la liste, l'ajouter avec checked à true
        this.selectedCategories.push({ ...category, checked: true });
      } else {
        // Si la catégorie est déjà dans la liste, inverser l'état de checked
        this.selectedCategories[existingCategoryIndex].checked =
          !this.selectedCategories[existingCategoryIndex].checked;
        // Si la catégorie est désélectionnée, la supprimer de la liste
        if (!this.selectedCategories[existingCategoryIndex].checked) {
          this.selectedCategories.splice(existingCategoryIndex, 1);
        }
      }
      console.log(this.selectedCategories);
    },

    removeNewImage(index) {
      this.newPhotos.splice(index, 1);
    },
    removeImageFromDatabase(obj, index) {
      this.updatedPhotos.push(obj.id);
      this.photosFromDatabase.splice(index, 1);
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
        };
        this.newPhotos.push(newPhoto);

        this.photos.push(...Array.from(event.target.files));
      }
    },
    removeImage(index) {
      // Supprimer l'image à l'index spécifié
      this.photos.splice(index, 1);
      this.selectedPhotos.splice(index, 1);
    },
    async createEvent() {
      const formData = new FormData();

      try {
        console.log(this.selectedCategories);
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
        if (this.newPhotos && this.newPhotos.length >= 1) {
          this.newPhotos.forEach((photo) => {
            formData.append("files.photos", photo);
          });
        }
        const response = await makeApiRequest(
          methodsHttpNames.PUT,
          `${endPoints.findEvent}/${this.getEvent.id}`,
          formData,
          undefined
        );
        if (response.success) {
          console.log(this.photos, response.data.id);
          if (this.photos && this.photos.length) {
            const responseUpload = await uploadFiles(
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
            icon: "success",
            closeOnClickOutside: false,
          });
        }
      } catch (error) {
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
    ]),
  },
  async mounted() {
    await this.fetchAllCategoriesEvent({ page: null });
    // Initialise currentDate avec la date actuelle au format YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    this.currentDate = `${year}-${month}-${day}`;
    // Initialise startDate avec la date actuelle
    this.startDate = this.currentDate;
    console.log("dfd", this.getCategoriesEvent);
    if (this.$route.params && this.$route.params.idEvent) {
      await this.fetchOneEvent(this.$route.params.idEvent);
      console.log("dd", this.getEvent);
      console.log("ss", this.getEvent.categoryEvents);

      this.eventName = this.getEvent.name;
      this.description = this.getEvent.description;
      if (this.getEvent.categoryEvents && this.getEvent.categoryEvents.length) {
        this.selectedCategories = this.getEvent.categoryEvents.map(
          (category) => ({
            ...category,
            checked: true,
          })
        );
      }
      // this.selectedCategories = [];
      this.price = this.getEvent.price;
      this.location = this.getEvent.location;
      this.startDate = this.getEvent.startDate;
      this.startTime = this.getEvent.startTime;
      this.endDate = this.getEvent.endDate;
      this.endTime = this.getEvent.endTime;
      this.seats = this.getEvent.totalSeats;
      this.bottles = this.getEvent.totalBottles;
      this.promoterName = this.getEvent.namePromoter;
      this.promoterInfo = this.getEvent.promotingInfo;
      this.photosFromDatabase = this.getEvent.photos;
    }
  },
});
</script>
<style scoped>
fieldset {
  border: none;
}

.delete_icon {
  position: absolute;
  top: -1px;
  right: 10px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: red;
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
</style>

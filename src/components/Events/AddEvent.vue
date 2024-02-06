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
              <input type="text" class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning" v-model="eventName" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Event Description
              </label>
              <div class="mb-0">
                <QuillEditor theme="snow" placeholder="Write your meta description" toolbar="full"
                  v-model="description" />
              </div>
            </div>
          </div>
          <div class="col-md-12">

            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <fieldset>
                <details>
                  <summary>Select categories:</summary>
                  <ul>
                    <li v-for="(category, index) in getCategoriesEvent" :key="category.id">
                      <label><input type="checkbox" v-model="selectedCategories[index]" :value="selectedCategories[index]"
                          @change="addCategoryEvent(category)" />{{ category.name
                          }}</label>
                    </li>

                  </ul>
                </details>
              </fieldset>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">Price</label>
              <div class="input-group">
                <span class="input-group-text rounded-0 fs-14 fw-bold text-primary">
                  $
                </span>
                <input type="text" class="form-control shadow-none rounded-0 text-black" placeholder="e.g. 120.00"
                  required v-model="price" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">

              <label class="d-block text-black fw-semibold mb-10 ">
                Location
              </label>
              <input type="text" class="form-control shadow-none text-black fs-md-15 lg-5" required v-model="location" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10 ">
                Start Date
              </label>
              <input type="date" class="form-control shadow-none text-black fs-md-15 lg-5" required v-model="startDate" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10 ">
                Start Time
              </label>
              <input type="Time" class="form-control shadow-none text-black fs-md-15 lg-5" required v-model="startTime"
                :min="currentDate" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10 ">
                End Date
              </label>
              <input type="date" class="form-control shadow-none text-black fs-md-15 lg-5" required v-model="endDate"
                :min="startDate" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">

              <label class="d-block text-black fw-semibold mb-10 ">
                End Time
              </label>
              <input type="Time" class="form-control shadow-none text-black fs-md-15 lg-5" required v-model="endTime" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10 ">
                Seats
              </label>
              <input type="number" min="1" step="1" value="0" class="form-control shadow-none rounded-0 text-black"
                required v-model="seats">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10 ">
                Bottles
              </label>
              <input type="number" min="1" step="1" value="0" class="form-control shadow-none rounded-0 text-black"
                required v-model="bottles">
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Promoter Name
              </label>
              <input type="text" class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning" v-model="promoterName" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Promoter Information's
              </label>
              <input type="text-area" class="form-control shadow-none rounded-0 text-black"
                placeholder="e.g. AI Machine Learning" v-model="promoterInfo" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Upload Images
              </label>
              <div class="file-upload text-center position-relative">
                <i class="flaticon-image"></i>
                <span class="d-block text-muted">
                  Drop Images Here Or
                  <span class="text-black fw-medium position-relative">
                    Click To Upload
                  </span>
                </span>
                <input type="file" multiple v-on:change="handleFileUpload"
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0" />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
                type="submit">
                Save Event
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script >
import { defineComponent } from "vue";
// import BlotFormatter from "quill-blot-formatter";
// import ImageUploader from "quill-image-uploader";
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { makeApiRequest } from "@/services/apiService";
import { methodsHttpNames } from "@/utils/methods";
import { endPoints } from "@/utils/endPoints";
import { encodeEventCategoryToApi } from '../../models/EventCategory/EventCategoryApi'

export default defineComponent({
  name: "AddEvent",
  components: {
  },
  data() {
    return {
      selectedCategories: [],
      currentDate: new Date().toISOString().split('T')[0], // Date actuelle
      eventName: "",
      description: "",
      categories: "",
      price: "",
      location: "",
      startDate: new Date().toISOString().split('T')[0], // Date actuelle
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Heure actuelle
      endDate: new Date().toISOString().split('T')[0], // Date actuelle
      endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Heure actuelle
      seats: 1,
      bottles: 1,
      promoterName: "",
      promoterInfo: "",
      photos: [],
      categoriesEvent: [],
    }
  },
  methods: {
    ...mapActions(["fetchAllCategoriesEvent", "addEvent", "fetchOneCategoryEvent"]),
    addCategoryEvent(category) {
      this.getCategoriesEvent.map((item, key) => {
        item.check = this.selectedCategories[key]
        return item
      })

      console.log('fghg', this.selectedCategories, this.getCategoriesEvent)

      console.log('fsgdhfj', category)
    },
    handleFileUpload(event) {
      // this.testphoto = event.target.files[0]
      // Gérer le téléchargement de fichiers (photos) ici
      const newPhotos = Array.from(event.target.files)
      this.photos.push(...newPhotos)
    },
    async createEvent() {
      const formData = new FormData();

      try {
        console.log(this.selectedCategories)
        //
        if (this.getCategoriesEvent && this.getCategoriesEvent.length) {
          this.categoriesEvent = this.getCategoriesEvent.filter(item => item.check == true);
          for (let index = 0; index < this.categoriesEvent.length; index++) {
            // Créer un objet temporaire contenant uniquement la propriété 'id'
            const tempObj = { id: this.categoriesEvent[index].id };
            // Ajouter l'objet temporaire à formData
            formData.append(`category_events`, JSON.stringify(this.categoriesEvent[index].id ));
          }
        }



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
        if (this.photos && this.photos.length >= 1) {
          this.photos.forEach(photo => {
            formData.append("files.photos", photo);
          });
        }

        const response = await makeApiRequest(
          methodsHttpNames.POST,
          endPoints.findEvent,
          formData,
          undefined
        );
        console.log(response)
        // await this.addEvent(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters(["getCategoriesError", "getCategoriesLoading", "getCategoriesEvent"]),
  },
  async mounted() {
    await this.fetchAllCategoriesEvent();
    // Initialise currentDate avec la date actuelle au format YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
    // Initialise startDate avec la date actuelle
    this.startDate = this.currentDate;
  },
  // setup: () => {
  //   const modules = {
  //     module: BlotFormatter,
  //     ImageUploader,
  //     options: {
  //       upload: (file: string | Blob) => {
  //         return new Promise((resolve, reject) => {
  //           const formData = new FormData();
  //           formData.append("image", file);

  //           axios
  //             .post("/upload-image", formData)
  //             .then((res: { data: { url: unknown } }) => {
  //               console.log(res);
  //               resolve(res.data.url);
  //             })
  //             .catch((err: unknown) => {
  //               reject("Upload failed");
  //               console.error("Error:", err);
  //             });
  //         });
  //       },
  //     },
  //   };
  //   return { modules };
  // },
});
</script>
<style scoped>
fieldset {
  border: none;
}

fieldset>label {
  display: inline-block;
  width: 100px;
  font-weight: bold;
  vertical-align: top;
  font-size: 1rem;
  line-height: 28px;
}

fieldset>label::after {
  content: ":";
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

details[open]>summary::marker {
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

li>label {
  cursor: pointer;
  display: inline-block;
  width: 100%;
}

li>label:hover,
li>label:has(input:checked) {
  background-color: var(--dk-gray);
}
</style>
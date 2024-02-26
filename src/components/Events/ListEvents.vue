<template>
  <div
    class="card mb-25 border-0 rounded-0 bg-white letter-spacing"
    style="transition: background-color 0.3s"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :style="{ 'background-color': isHovered ? '#007bff' : '#F8FCFF' }"
  >
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
    >
      <h6 v-if="selectedCount > 0">
        {{ selectedCount }}
        {{ selectedCount === 1 ? "item" : "items" }} selected
      </h6>
      <h6 v-if="nbResults > 0">
        {{ nbResults }}
        {{ nbResults === 1 ? "item" : "items" }} found
      </h6>
      <div class="d-flex align-items-center mt-lg-10">
        <form @submit.prevent="handleFilterChange">
          <div class="input-group">
            <input
              type="text"
              class="form-control shadow-none fw-medium ps-1 pt-10 pe-0 letter-spacing"
              placeholder="Search"
              v-model="searchText"
              @input="handleFilterChange"
            />
            <button
              class="default-btn position-relative transition border-0 text-white ps-12 pe-12 rounded-1"
              type="button"
              :disabled="getEventsLoading"
            >
              <i class="flaticon-search-interface-symbol position-relative"></i>
            </button>
          </div>
        </form>
      </div>

      <div class="d-sm-flex align-items-center mt-15 mt-lg-10">
        <select
          class="project-select frm shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          v-model="selectedCategory"
          @change="handleFilterChange"
        >
          <option value="All" selected>All Categories</option>
          <option
            v-for="category in getCategoriesEvent"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
        <select
          class="project-select frm shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          v-model="selectedPartner"
          @change="handleFilterChange"
        >
          <option value="0" selected>All Partners</option>
          <option
            v-for="partner in getPartners"
            :key="partner.id"
            :value="partner.id"
          >
            {{ partner.attributes.name + " " + partner.attributes.surname }}
          </option>
        </select>
        <select
          v-model="activeFilter"
          @change="handleFilterChange"
          class="project-select frm shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
        >
          <option value="All" selected>
            <span> </span> <span> All Status</span>
          </option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <flat-pickr
          v-model="startDate"
          :config="config"
          class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          placeholder="Event Start"
          name="startDate"
          @change="handleFilterChange"
        />

        <flat-pickr
          v-model="endDate"
          :config="{ minDate: startDate }"
          class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
          placeholder="Event End"
          name="endDate"
          :disabled="!startDate"
          @change="handleFilterChange"
        />
      </div>

      <div class="d-sm-flex align-items-center mt-lg-10">
        <button
          v-if="isFilterActive"
          class="default-outline-btn position-relative transition border-0 fw-medium text-black pt-1 pb-1 ps-2 pe-2 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 bg-transparent fs-md-1 fs-lg-1 d-inline-block mb-1 mb-lg-1"
          type="button"
          @click="resetFilters"
        >
          <i class="flaticon-refresh position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>

      <div class="dropdown mt-15 mt-sm-0 ms-sm-10 mt-lg-10 d-inline-flex">
        <a
          href="javascript:void(0);"
          @click="navigateToAddEventPage()"
          class="default-btn position-relative transition border-0 fw-medium text-white pt-1 pb-1 ps-2 pe-2 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 fs-md-1 fs-lg-1 d-inline-block mb-1 mb-lg-1 bg-primary d-inline-block d-inline-block text-decoration-none"
        >
          <i class="ph ph-plus"></i>
        </a>
        <button
          class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="flaticon-dots"></i>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click="selectAllEvents"
            >
              <i class="fas fa-check lh-1 me-8 position-relative top-1"></i>
              {{ selectAllChecked ? "Deselect All" : "Select All" }}
            </a>
          </li>
          <li>
            <a
              :class="{ disabled: selectedCount === 0 }"
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click.prevent="deleteSelectedCustomers"
            >
              <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
              Delete Selected
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row row-cols-1 row-cols-md-2 row-cols-xxxl-3 g-4">
    <div class="col" v-for="event in getEvents" :key="event.id">
      <div class="card h-100 mb-15 border-0 rounded-0 bg-white event-card">
        <div class="card-body p-10 letter-spacing">
          <div class="form-check mb-2">
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              @change="updateSelectionCounter($event, index)"
            />
          </div>
          <router-link :to="`/event-details/${event.id}`">
            <img
              v-if="
                storageUrl &&
                event?.photos &&
                event?.coverImageIndex <= event?.photos.length
              "
              :src="storageUrl + event?.photos[event?.coverImageIndex]?.url"
              alt="event-image"
              class="card-image"
            />
          </router-link>
          <div class="p-10 p-md-20">
            <div
              class="mb-12 mb-md-20 d-flex align-items-center justify-content-between"
            >
              <div class="d-lg-flex align-items-center">
                <div class="date rounded-1 text-center">
                  <span class="d-block bg-primary text-white fs-md-15 fw-bold">
                    {{ getDayAbbreviation(event?.startDate) }}
                  </span>
                  <span class="d-block text-black fw-black">{{
                    getDayOfMonth(event?.startDate)
                  }}</span>
                </div>
                <div class="ms-lg-20 mt-15 mt-lg-0">
                  <h5 class="fs-15 fs-md-16 fs-lg-18 mb-8 mb-md-12 fw-bold">
                    <router-link
                      :to="`/event-details/${event.id}`"
                      class="text-black text-decoration-none"
                    >
                      {{ event?.name }}
                    </router-link>
                  </h5>
                </div>
                <span
                  v-if="event?.active == true"
                  class="badge text-outline-success ms-10"
                  >Active</span
                >
                <span
                  v-if="event?.active == false"
                  class="badge text-outline-danger ms-10"
                  >Inactive</span
                >
              </div>

              <div class="dropdown">
                <button
                  class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="flaticon-dots"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      @click="navigateToEventDetailPage(event.id)"
                    >
                      <i
                        class="flaticon-view lh-1 me-8 position-relative top-1"
                      ></i>
                      View
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      @click="navigateToEditEventPage(event.id)"
                    >
                      <i
                        class="flaticon-pen lh-1 me-8 position-relative top-1"
                      ></i>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      @click="deleteOneEvent(event.id)"
                    >
                      <i
                        class="flaticon-delete lh-1 me-8 position-relative top-1"
                      ></i>
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div style="display: flex; justify-content: space-between">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                  CATEGORIES:
                </span>
                <div v-for="(e, index) in event.categoryEvents" :key="e.id">
                  <span class="text-primary">{{ e.name }}</span>
                  <!-- Ajouter un séparateur sauf pour le dernier élément -->
                  <span
                    v-if="index !== event.categoryEvents.length - 1"
                    class="text-muted"
                  >
                    -
                  </span>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                PROMOTE BY:
                <span class="fw-semibold text-primary">
                  {{
                    event.partner?.attributes.name +
                    " " +
                    event.partner?.attributes.surname
                  }}
                </span>
              </span>
            </div>
            <p class="text-paragraph lh-base fs-md-15">
              {{ truncateDescription(event.description) }}
            </p>
            <ul class="info-list ps-0 mb-15 list-unstyled">
              <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                  STARTS :
                </span>
                {{ changeDate(event.startDate) }}
                {{ extractHourMinuteFromTime(event.startTime) }}
              </li>
              <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                  END :
                </span>
                {{ changeDate(event.endDate) }}
                {{ extractHourMinuteFromTime(event.endTime) }}
              </li>
              <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                  LOCATION:
                </span>
                {{ event.location }}

                <!-- Add Google Maps icon and make it clickable -->
                <a
                  :href="'https://maps.google.com/?q=' + event.location"
                  target="_blank"
                  class="google-maps-icon"
                >
                  <i class="fas fa-map-marker-alt"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12">
    <div
      class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
    >
      <p class="mb-0 text-paragraph">
        Showing
        <span class="fw-bold">{{ getEvents?.length }}</span> out of
        <span class="fw-bold">{{ getTotalEventItems }}</span> results
      </p>
      <nav class="mt-15 mt-md-0">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click="currentPage !== 1 && onPageChange(currentPage - 1)"
            >
              <i class="flaticon-chevron-1"></i>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in getTotalEventPages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click="onPageChange(page)">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === getTotalEventPages }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click="
                currentPage !== getTotalEventPages &&
                  onPageChange(currentPage + 1)
              "
            >
              <i class="flaticon-chevron"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
    :is-full-page="fullPage"
  />
</template>

<script>
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";
import { storageUrl } from "../../utils/constants";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import flatPickr from "vue-flatpickr-component";
export default {
  name: "ListEvents",
  components: {
    Loading,
    flatPickr,
  },
  data() {
    return {
      storagUrl: "",
      currentPage: 1,
      isHovered: false,
      searchText: "",
      activeFilter: "All",
      selectAllChecked: false,
      selectedCount: 0,
      selectedCategory: "All",
      selectedPartner: 0,
      perPage: 4,
      startDate: "",
      endDate: "",
      nbResults: 0,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions([
      "fetchAllEvents",
      "deleteEvent",
      "fetchAllCategoriesEvent",
      "fetchAllPartners",
    ]),

    updateSelectionCounter(event, index) {
      if (event.target.checked) {
        // Si la case à cocher est cochée, incrémenter le compteur de sélection
        this.selectedCount++;
      } else {
        // Sinon, décrémenter le compteur de sélection
        this.selectedCount--;
      }
    },
    async resetFilters() {
      // Réinitialiser les valeurs des filtres à leurs valeurs par défaut
      this.searchText = "";
      this.activeFilter = "All";
      this.selectedCategory = "All";
      this.startDate = "";
      this.endDate = "";
      // Appeler la méthode handleFilterChange pour mettre à jour la liste des clients
      await this.handleFilterChange();
      this.nbResults = 0;

    },
    deleteSelectedCustomers() {
      const selectedEvents = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          if (this.getEvents && this.getEvents[index]) {
            selectedEvents.push(this.getEvents[index].id);
          }
        }
      });

      if (selectedEvents.length === 0) {
        swal("Please select at least one customer to delete.");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these events!",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteEvent action or API endpoint to delete the selected events
          await Promise.all(selectedEvents.map((id) => this.deleteEvent(id)));
          // After deletion, fetch events again to update the list
          this.currentPage = 1;
          this.isLoading = true;
          await this.fetchAllEvents({
            page: this.currentPage,
            perPage: this.perPage,
          });
          this.isLoading = false;

          swal("Selected events have been deleted!", {});
        }
      });
    },
    truncateDescription(description) {
      const maxLength = 200;
      if (description && description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + "...";
      }
    },
    async handleFilterChange() {
      // Réinitialiser la page actuelle à 1
      this.currentPage = 1;
      this.isLoading = true;

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllEvents({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        isActive: this.activeFilter,
        category: this.selectedCategory,
        partner: this.selectedPartner,
        startDate: this.startDate,
        endDate: this.endDate,
      });
      this.nbResults = this.getEvents.length;
      this.isLoading = false;
    },
    selectAllEvents() {
      this.selectAllChecked = !this.selectAllChecked;
      this.selectedCount = 0;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.selectAllChecked;
        if (checkbox.checked) {
          this.selectedCount++;
        } else {
          this.selectedCount--;
        }
      });
    },
    async onPageChange(pageNumber) {
      this.isLoading = true;
      this.currentPage = pageNumber;
      await this.fetchAllEvents({
        page: this.currentPage,
        perPage: this.perPage,
        name: this.searchText,
        isActive: this.activeFilter,
        category: this.selectedCategory,
        partner: this.selectedPartner,
        startDate: this.startDate,
        endDate: this.endDate,
      });
      this.isLoading = false;
    },
    getDayOfMonth(inputDate) {
      // Création d'un objet Date à partir de la chaîne de date d'entrée
      var dateObject = new Date(inputDate);

      // Obtention du jour du mois (1-31)
      var dayOfMonth = dateObject.getDate();

      return dayOfMonth;
    },
    getDayAbbreviation(inputDate) {
      // Array of English days of the week abbreviations
      var daysOfWeekAbbreviation = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];

      // Creating a Date object from the input date string
      var dateObject = new Date(inputDate);

      // Getting the day of the week number (0 for Sunday, 1 for Monday, etc.)
      var dayOfWeekNumber = dateObject.getDay();

      // Getting the day abbreviation from the array
      var dayAbbreviation = daysOfWeekAbbreviation[dayOfWeekNumber];

      return dayAbbreviation;
    },
    extractHourMinuteFromTime(inputTime) {
      // Extracting hour and minute from the time
      var [hour, minute] = inputTime.split(":").slice(0, 2);

      // Creating the new time string in the format "03:30"
      var newTimeFormat = hour + ":" + minute;

      return newTimeFormat;
    },
    changeDate(inputDate) {
      // Parsing the input date
      var parsedDate = new Date(inputDate);

      // Extracting year, month, and day
      var year = parsedDate.getFullYear();
      var month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because months are zero-based
      var day = String(parsedDate.getDate()).padStart(2, "0");

      // Creating the new date string in the format "07-02-2023"
      return day + "-" + month + "-" + year;
    },

    navigateToEditEventPage(idEvent) {
      if (idEvent !== null && idEvent !== undefined) {
        this.$router.push({
          name: "EditEventPage",
          params: { idEvent: idEvent },
        });
      }
    },
    navigateToEventDetailPage(idEvent) {
      if (idEvent !== null && idEvent !== undefined) {
        this.$router.push({
          name: "EventDetailsPage",
          params: { idEvent: idEvent },
        });
      }
    },
    navigateToAddEventPage() {
      this.$router.push({
        name: "AddEventPage",
      });
    },
    async deleteOneEvent(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this event!",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await this.deleteEvent(id);
          swal({
            text: "Event deleted Successfully!",
            closeOnClickOutside: false,
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      "getEventsError",
      "getEventsLoading",
      "getEvents",
      "getTotalEventPages",
      "getCategoriesEvent",
      "getTotalEventItems",
      "getPartners",
    ]),
    isFilterActive() {
      return (
        this.searchText !== "" ||
        this.activeFilter !== "All" ||
        this.selectedCategory !== "All" ||
        this.startDate !== "" ||
        this.endDate !== ""
      );
    },
  },
  async mounted() {
    this.storageUrl = storageUrl;
    this.isLoading = true;
    await this.fetchAllCategoriesEvent({ page: null });
    await this.fetchAllPartners({ page: null });
    await this.fetchAllEvents({
      page: this.currentPage,
      perPage: 4,
      name: null,
    });
    this.isLoading = false;
    console.log(this.getEvents);
  },
};
</script>
<style scoped>
/* Pour les navigateurs Web modernes */
.project-select::placeholder {
  color: black; /* Couleur du texte du placeholder */
}

/* Pour les anciens navigateurs Web */
.project-select:-ms-input-placeholder {
  color: black; /* Couleur du texte du placeholder */
}

.project-select::-ms-input-placeholder {
  color: black; /* Couleur du texte du placeholder */
}
.card-image {
  position: relative;
  max-height: 250px;
  width: 100%;
  /* Taille maximale d'une image */
  margin-bottom: 5px;
}
.event-card {
  /* Default box shadow */
  transition: box-shadow 0.4s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.event-card:hover {
  /* Box shadow on hover */
  box-shadow: 0 8px 12px #7d6ff0;
}
/* Add this CSS to your existing style section or CSS file */
.google-maps-icon {
  color: #ff2f00; /* Change the color to suit your design */
  margin-right: 5px; /* Adjust margin as needed */
}

.google-maps-icon:hover {
  color: #ff001e; /* Change the hover color */
  text-decoration: none; /* Remove default underline on hover */
}
.frm {
  padding-top: 15px;
  padding-bottom: 15px;
  background-size: 20px 12px;
  background-position: right 18px center;
  color: var(--splash-black-color);
  border-color: #dedee4;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
</style>

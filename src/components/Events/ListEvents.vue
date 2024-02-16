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
      <div class="d-flex align-items-center">
        <form
          class="search-box position-relative"
          @submit.prevent="handleSearch"
        >
          <input
            type="text"
            class="form-control shadow-none rounded-0 border-0 pr-40"
            placeholder="Search here"
            style="width: calc(100% - 40px)"
            v-model="searchText"
            @input="handleSearch"
          />
          <button
            class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-3 pe-md-3 rounded-1 fs-md-15 fs-lg-16 bg-primary"
            type="submit"
            style="
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            "
            :disabled="getEventsLoading"
          >
            Search

            <i
              v-if="!getEventsLoading"
              class="flaticon-search-interface-symbol position-relative ms-5 top-1"
            ></i>
            <div
              v-if="getEventsLoading"
              class="spinner-border"
              role="status"
            ></div>
          </button>
        </form>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <a
          href="javascript:void(0);"
          @click="navigateToAddEventPage()"
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-primary fs-md-15 fs-lg-16 d-inline-block d-inline-block text-decoration-none"
        >
          Add New Event
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </a>
        <select
          v-model="isActiveFilter"
          @change="handleFilterChange"
          class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
        >
          <option value="All">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button
          v-if="isFilterActive"
          class="default-outline-btn transition border fw-medium text-black pt-2 pb-4 ps-1 pe-4 pt-md-6 pb-md-3 ps-md-1 pe-md-1 rounded-1 fs-md-5 fs-lg-5 bg-transparent"
          type="button"
          @click="resetFilters"
        >
          Reset
          <i
            class="flaticon-refresh position-relative ms-5 top-2 fs-15"
            style="margin-left: 3px"
          ></i>
        </button>
      </div>
      <div class="dropdown mt-10 mt-sm-0 ms-sm-10">
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
              class="dropdown-item d-flex align-items-center"
              href="javascript:void(0);"
              @click="deleteSelectedCustomers"
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
            <input class="form-check-input shadow-none" type="checkbox" />
          </div>

          <router-link :to="`/event-details/${event.id}`">
            <img
              v-if="storageUrl && event?.photos"
              :src="storageUrl + event?.photos[0]?.url"
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
                    event.partner?.attributes.surname
                  }}
                </span>
              </span>
              <!-- <span class="badge text-outline-danger ms-10">{{
                event.active
              }}</span> -->
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
      class="pagination-area d-md-flex mb-25 justify-content-between align-items-center"
    >
      <p class="mb-0 text-paragraph">
        Showing <span class="fw-bold">{{ getEvents.length }}</span> out of
        <span class="fw-bold">{{ getTotalItems }}</span> results
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
            v-for="page in getTotalPages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <a class="page-link" href="#" @click="onPageChange(page)">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === getTotalPages }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click="
                currentPage !== getTotalPages && onPageChange(currentPage + 1)
              "
            >
              <i class="flaticon-chevron"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <loading
      v-model:active="getEventsLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script>
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";
import { storageUrl } from "../../utils/constants";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  name: "ListEvents",
  components: {
    Loading,
  },
  data() {
    return {
      storagUrl: "",
      currentPage: 1,
      isHovered: false,
      searchText: "",
      isActiveFilter: "All",
      selectAllChecked: false,
    };
  },
  methods: {
    ...mapActions(["fetchAllEvents", "deleteEvent", "getEventsLoading"]),
    resetFilters() {
      // Réinitialiser les valeurs des filtres à leurs valeurs par défaut
      this.searchText = "";
      this.isActiveFilter = "All";
      // Appeler la méthode handleFilterChange pour mettre à jour la liste des clients
      this.handleFilterChange();
    },
    deleteSelectedCustomers() {
      const selectedEvents = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedEvents.push(this.getEvents[index].id);
        }
      });

      if (selectedEvents.length === 0) {
        swal("Please select at least one customer to delete.");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these events!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteEvent action or API endpoint to delete the selected events
          await Promise.all(selectedEvents.map((id) => this.deleteEvent(id)));
          // After deletion, fetch events again to update the list
          await this.fetchAllEvents({ page: this.currentPage, perPage: 4 });
          swal("Selected events have been deleted!", {
            icon: "success",
          });
        } else {
          swal("Selected events are safe!");
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

      // Appeler fetchAllEvents avec le filtre actif
      await this.fetchAllEvents({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
        isActive: this.isActiveFilter,
      });
    },
    selectAllEvents() {
      this.selectAllChecked = !this.selectAllChecked;
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = this.selectAllChecked;
      });
    },
    async handleSearch() {
      console.log(this.searchText);
      await this.fetchAllEvents({
        page: this.currentPage,
        perPage: 4,
        name: this.searchText,
      });
      console.log("q:", this.getEvents);
    },
    async onPageChange(pageNumber) {
      this.currentPage = pageNumber;
      await this.fetchAllEvents({ page: pageNumber, perPage: 4, name: null });
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
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await this.deleteEvent(id);
          swal({
            text: "Event deleted Successfully!",
            icon: "success",
            closeOnClickOutside: false,
          });
        } else {
          swal("Category is safe!");
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      "getEventsError",
      "getEventsLoading",
      "getEvents",
      "getTotalPages",
      "getTotalItems",
    ]),
    isFilterActive() {
      return this.searchText !== "" || this.isActiveFilter !== "All";
    },
  },
  async mounted() {
    this.storageUrl = storageUrl;
    await this.fetchAllEvents({
      page: this.currentPage,
      perPage: 4,
      name: null,
    });
    console.log(this.getEvents);
  },
};
</script>
<style scoped>
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
</style>

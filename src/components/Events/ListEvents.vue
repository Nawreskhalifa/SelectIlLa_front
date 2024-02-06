<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30">
      <div class="d-sm-flex align-items-center">
        <form class="search-box position-relative">
          <input type="text" class="form-control shadow-none text-black rounded-0 border-0" placeholder="Search event" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <a href="javascript:void(0);"
        @click="navigateToAddEventPage()"
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block d-inline-block text-decoration-none">
          Add New Event
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </a>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10">
          <option selected>All (32)</option>
          <option value="1">Open</option>
          <option value="2">Closed</option>
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-xxxl-4">
      <div class="card mb-25 border-0 rounded-0 bg-white event-card" v-for="event in getEvents" :key="event.id">
        <div class="card-body p-10 letter-spacing">
          <router-link to="/event-details">
            <img v-if="storageUrl && event?.photos[0]?.url" :src="storageUrl + event?.photos[0]?.url" alt="event-image"
              class="card-image" /> </router-link>
          <div class="p-10 p-md-20">
            <div class="mb-12 mb-md-20 d-flex align-items-center justify-content-between">
              <div class="d-lg-flex align-items-center">
                <div class="date rounded-1 text-center">
                  <span class="d-block bg-primary text-white fs-md-15 fw-bold">
                    {{ getDayAbbreviation(event.startDate) }}
                  </span>
                  <span class="d-block text-black fw-black">{{ getDayOfMonth(event.startDate) }}</span>
                </div>
                <div>
                  <h2 class="fs-15 fs-md-16 fs-lg-18 mb-8 mb-md-12 fw-bold">
                    <router-link :to="'/event-details/' + event.id" class="text-black text-decoration-none">
                      {{ event.name }}
                    </router-link>
                  </h2>
                </div>

                <div class="ms-lg-20 mt-15 mt-lg-0">

                  <div style="display: flex; justify-content: space-between;">
                    <span class="d-block text-muted">
                      Categories:
                    </span>
                    <div v-for="e in event.categoryEvents" :key="e.id">
                      <span class="d-inline-block text-primary">{{ e.name }}</span>
                    </div>
                  </div>

                  <div class="d-flex align-items-center">
                    <span class="d-block text-muted">
                      Promote by
                      <span class="fw-semibold text-primary"> {{ event.namePromoter }} </span>
                    </span>
                    <span class="badge text-outline-danger ms-10">Closed</span>
                  </div>
                </div>
              </div>
              <div class="dropdown">
                <button
                  class="dropdown-toggle card-dot-btn lh-1 position-relative top-4 bg-transparent border-0 shadow-none p-0 transition"
                  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="flaticon-dots"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"
                      @click="navigateToEventDetailPage(event.id)">
                      <i class="flaticon-view lh-1 me-8 position-relative top-1"></i>
                      View
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                      <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                      <i class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <p class="text-paragraph lh-base fs-md-15">
              {{ event.description }}
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
              </li>

            </ul>
            <router-link to="/event-details"
              class="link-btn closed p-12 p-sm-15 p-md-20 d-flex align-items-center justify-content-between w-100 text-decoration-none fw-medium text-muted">
              <span class="position-relative">Closed</span>
              <i class="ph ph-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="pagination-area d-md-flex mb-25 justify-content-between align-items-center">
      <p class="mb-0 text-paragraph">
        Showing <span class="fw-bold">06</span> out of
        <span class="fw-bold">13</span> results
      </p>
      <nav class="mt-15 mt-md-0">
        <ul class="pagination mb-0">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <i class="flaticon-chevron-1"></i>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link active" href="#">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <i class="flaticon-chevron"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";
import { storageUrl } from '../../utils/constants';
export default {
  name: "ListEvents",
  data() {
    return {
      storagUrl: ""
    }
  },
  methods: {
    ...mapActions(["fetchAllEvents"]),
    getDayOfMonth(inputDate) {
      // Création d'un objet Date à partir de la chaîne de date d'entrée
      var dateObject = new Date(inputDate);

      // Obtention du jour du mois (1-31)
      var dayOfMonth = dateObject.getDate();

      return dayOfMonth;
    },
    getDayAbbreviation(inputDate) {
      // Array of English days of the week abbreviations
      var daysOfWeekAbbreviation = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      var [hour, minute] = inputTime.split(':').slice(0, 2);

      // Creating the new time string in the format "03:30"
      var newTimeFormat = hour + ':' + minute;

      return newTimeFormat;
    },
    changeDate(inputDate) {
      // Parsing the input date
      var parsedDate = new Date(inputDate);

      // Extracting year, month, and day
      var year = parsedDate.getFullYear();
      var month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because months are zero-based
      var day = String(parsedDate.getDate()).padStart(2, '0');

      // Creating the new date string in the format "07-02-2023"
      return day + '-' + month + '-' + year;
    },



    truncateDescription(description) {
      const maxLength = 65;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + '...';
      }
    },
    navigateToEditEventPage(idEvent) {
      if (idEvent !== null && idEvent !== undefined) {
        this.$router.push({
          name: 'EditCategoryEventPage',
          params: { idEvent: idEvent },
        });
      }
    },
    navigateToEventDetailPage(idEvent) {
      if (idEvent !== null && idEvent !== undefined) {
        this.$router.push({
          name: 'EventDetailsPage',
          params: { idEvent: idEvent },
        });
      }
    },
    navigateToAddEventPage() {
      this.$router.push({
        name: 'AddEventPage',
      });

    },
    async deleteCategory(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this category!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          // Call the deleteCategoryEvent action or API endpoint to delete the category
          //  await this.deleteCategoryEvent(id);
          swal({
            text: 'Category deleted Successfully!',
            icon: 'success',
            closeOnClickOutside: false
          })
        } else {
          swal("Category is safe!");
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getEventsError", "getEventsLoading", "getEvents"]),
  },
  async mounted() {
    this.storageUrl = storageUrl;
    await this.fetchAllEvents();
    console.log(this.getEvents)
  },
};
</script>
<style scoped>
.card-image {
  height: 250px;
  width: 100%;
  /* Redimensionner l'image à 30 % de la largeur de la carte */
}
</style>
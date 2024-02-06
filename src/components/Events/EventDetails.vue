<template>
  <div class="row">
    <div class="col-xxxl-8">
      <div class="card mb-25 border-0 rounded-0 bg-white event-details-card">
        <div class="card-body p-10 letter-spacing">
          <img v-if="storageUrl && getEvent?.photos[0]?.url" :src="storageUrl + getEvent?.photos[0]?.url"
            alt="event-image"  class="card-image"/>

          <div class="ps-5 pe-5 mb-15 ps-sm-20 pe-sm-20 mb-sm-25">
            <div class="mb-12 mb-md-20 d-lg-flex align-items-center justify-content-between">
              <div class="d-lg-flex align-items-center">
                <div class="date rounded-1 text-center">
                  <span class="d-block bg-primary text-white fs-md-15 fw-bold">
                    {{ getDayAbbreviation(getEvent?.startDate) }}
                  </span>
                  <span class="d-block text-black fw-black">{{ getDayOfMonth(getEvent?.startDate) }}</span>
                </div>
                <div class="ms-lg-20 mt-15 mt-lg-0">
                  <h5 class="fs-15 fs-md-16 fs-lg-18 mb-8 mb-md-12 fw-bold">
                    <a href="#" class="text-black text-decoration-none">
                      {{ getEvent?.name }}
                    </a>
                  </h5>
                  <div class="d-flex align-items-center">
                    <span class="d-block text-muted">
                      Promote by:
                      <span class="fw-semibold text-primary">{{ getEvent?.namePromoter }} </span>
                    </span>
                    <span class="badge text-outline-success ms-10">Open</span>
                  </div>

                  <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <span class="d-block text-muted">
                      Categories:
                    </span>
                    <div v-for="e in getEvent?.categoryEvents" :key="e.id">
                      <span class="d-inline-block text-primary">{{ e.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="buttons-list mt-12 mt-lg-0 d-sm-flex align-items-center">
                <button type="button"
                  class="border-0 rounded-1 fs-14 fw-medium position-relative d-inline-block bg-primary text-white transition">
                  Get Ticket
                  <i class="flaticon-plus text-white"></i>
                </button>
                <button type="button"
                  class="border-0 rounded-1 fs-14 fw-medium position-relative d-inline-block transition text-primary">
                  Add To Calendar
                  <i class="flaticon-calendar text-primary"></i>
                </button>
                <button type="button"
                  class="border-0 rounded-1 fs-14 fw-medium position-relative d-inline-block transition text-primary">
                  1201
                  <i class="flaticon-heart-2 text-danger"></i>
                </button>
                <button type="button"
                  class="border-0 rounded-1 fs-14 fw-medium position-relative d-inline-block transition text-primary">
                  <i class="flaticon-share text-primary"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="info bg-gray">
            <div class="row">
              <div class="col-sm-6 col-lg-3">
                <div class="info-card position-relative">
                  <div class="icon bg-info rounded-circle text-center position-absolute start-0 text-white">
                    <i class="flaticon-clock"></i>
                  </div>
                  <span class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1">
                    Starts:
                  </span>
                  <span class="fw-medium text-paragraph">
                    {{ changeDate(getEvent?.startDate) }}
                    {{ extractHourMinuteFromTime(getEvent?.startTime) }}
                  </span>
                </div>

              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="info-card position-relative">
                  <div class="icon bg-info rounded-circle text-center position-absolute start-0 text-white">
                    <i class="flaticon-clock"></i>
                  </div>
                  <span class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1">
                    End:
                  </span>
                  <span class="fw-medium text-paragraph">
                    {{ changeDate(getEvent?.endDate) }}
                    {{ extractHourMinuteFromTime(getEvent?.endTime) }}
                  </span>
                </div>
              </div>

              <div class="col-sm-6 col-lg-4">
                <div class="info-card position-relative">
                  <div class="icon bg-success rounded-circle text-center position-absolute start-0 text-white">
                    <i class="flaticon-maps-and-flags"></i>
                  </div>
                  <span class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1">
                    Location:
                  </span>
                  <span class="fw-medium text-paragraph">
                    {{ getEvent?.location }}
                  </span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-4">
                <div class="info-card position-relative">
                  <div class="icon bg-warning rounded-circle text-center position-absolute start-0 text-white">
                    <i class="flaticon-money"></i>
                  </div>
                  <span class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1">
                    Ticket Price:
                  </span>
                  <span class="fw-medium text-paragraph">${{ getEvent?.price }}</span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-5">
                <div class="info-card position-relative">
                  <div class="icon bg-danger rounded-circle text-center position-absolute start-0 text-white">
                    <i class="flaticon-date-1"></i>
                  </div>
                  <span class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1">
                    Remaining Seats:
                  </span>
                  <span class="fw-medium text-paragraph">{{ getEvent?.remainingSeats }}/{{ getEvent?.totalSeats }}</span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-5">
                <div class="info-card position-relative">
                  <div class="icon bg-danger rounded-circle text-center position-absolute start-0 text-white">
                    <i class="flaticon-date-1"></i>
                  </div>
                  <span class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1">
                    Remaining Bottles:
                  </span>
                  <span class="fw-medium text-paragraph">{{ getEvent?.remainingBottles }}/{{ getEvent?.totalBottles
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white event-details-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="mb-10 mb-sm-15 mb-lg-20">
            <h5 class="card-title fw-bold mb-0 fs-15 fs-md-16 fs-lg-18">
              About The Event
            </h5>
          </div>
          <p class="text-paragraph fs-md-15 fs-lg-16 text-paragraph lh-base">
            {{ getEvent?.description }}
          </p>


        </div>
      </div>
      <div class="card mb-25 border-0 rounded-0 bg-white event-details-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="mb-10 mb-sm-15 mb-lg-20">
            <h5 class="card-title fw-bold mb-0 fs-15 fs-md-16 fs-lg-18">
              Promoter information's
            </h5>
          </div>
          <p class="text-paragraph fs-md-15 fs-lg-16 text-paragraph lh-base">
            {{ getEvent?.promotingInfo }}
          </p>


        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert";
import { storageUrl } from '../../utils/constants';


export default defineComponent({
  name: "EventDetails",
  data() {
    return {
      storageUrl: ""
    }
  },
  methods: {
    ...mapActions(["fetchOneEvent", "deleteCategoryEvent"]),
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
      if (inputTime) {
        // Extracting hour and minute from the time
        var [hour, minute] = inputTime.split(':').slice(0, 2);

        // Creating the new time string in the format "03:30"
        var newTimeFormat = hour + ':' + minute;

        return newTimeFormat;
      }
      return null
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
    navigateToEditCategoryPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: 'EditCategoryEventPage',
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    navigateToCategoryDetailPage(idCategoryEvent) {
      this.$router.push({
        name: 'CategoryEventDetailsPage',
        params: { idCategoryEvent: idCategoryEvent },
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
          await this.deleteCategoryEvent(id);
          this.$router.push({ name: 'CategoriesEventPage' });
          // Afficher un message de succès
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
    ...mapGetters(["getEventsError", "getEventsLoading", "getEvent"]),
  },
  async mounted() {
    this.storageUrl = storageUrl;
    if (this.$route.params && this.$route.params.idEvent) {
      console.log('ddd', this.$route.params.idEvent)
      await this.fetchOneEvent(this.$route.params.idEvent);
      console.log(this.getEvent)
    }
  }

});
</script>
<style scoped>
.card-image {
  height: 500px;
  width: 100%;
  /* Redimensionner l'image à 30 % de la largeur de la carte */
}
</style>
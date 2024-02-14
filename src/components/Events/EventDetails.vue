<template>
  <div class="row">
    <div class="col-12">
      <div
        class="card mb-30 border-0 rounded-0 bg-white event-details-card container-fluid"
      >
        <div class="swiper-container event-swiper">
          <div class="swiper-wrapper">
            <!-- Boucle sur toutes les images de l'événement -->
            <div
              class="swiper-slide"
              v-for="(photo, index) in getEvent?.photos"
              :key="index"
            >
              <img
                v-if="storageUrl && photo.url"
                :src="storageUrl + photo.url"
                alt="event-image"
                class="card-image"
              />
            </div>
          </div>
          <!-- Ajouter les flèches de navigation -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
        <div class="card-body p-15 letter-spacing">
          <div class="ps-5 pe-5 mb-15 ps-sm-20 pe-sm-20 mb-sm-25">
            <div
              class="mb-12 mb-md-20 d-lg-flex align-items-center justify-content-between"
            >
              <div class="d-lg-flex align-items-center">
                <div class="date rounded-1 text-center">
                  <span class="d-block bg-primary text-white fs-md-15 fw-bold">
                    {{ getDayAbbreviation(getEvent?.startDate) }}
                  </span>
                  <span class="d-block text-black fw-black">{{
                    getDayOfMonth(getEvent?.startDate)
                  }}</span>
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
                      <span class="fw-semibold text-primary"
                        >{{ getEvent?.namePromoter }}
                      </span>
                    </span>
                    <span
                      v-if="getEvent?.active == true"
                      class="badge text-outline-success ms-10"
                      >Active</span
                    >
                    <span
                      v-if="getEvent?.active == false"
                      class="badge text-outline-danger ms-10"
                      >Inactive</span
                    >
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <span class="d-block text-muted"> Categories: </span>
                    <div
                      v-for="(e, index) in getEvent?.categoryEvents"
                      :key="e.id"
                    >
                      <span class="d-inline-block text-primary">{{
                        e.name
                      }}</span>
                      <!-- Ajouter un séparateur sauf pour le dernier élément -->
                      <span
                        v-if="index !== getEvent.categoryEvents.length - 1"
                        class="text-muted"
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info bg-gray">
            <div class="row">
              <div class="col-sm-6 col-lg-3">
                <div class="info-card position-relative">
                  <div
                    class="icon bg-info rounded-circle text-center position-absolute start-0 text-white"
                  >
                    <i class="flaticon-clock"></i>
                  </div>
                  <span
                    class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                  >
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
                  <div
                    class="icon bg-info rounded-circle text-center position-absolute start-0 text-white"
                  >
                    <i class="flaticon-clock"></i>
                  </div>
                  <span
                    class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                  >
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
                  <div
                    class="icon bg-success rounded-circle text-center position-absolute start-0 text-white"
                  >
                    <i class="flaticon-maps-and-flags"></i>
                  </div>
                  <span
                    class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                  >
                    Location:
                  </span>
                  <span class="fw-medium text-paragraph">
                    {{ getEvent?.location }}
                  </span>
                </div>
              </div>
              <div class="col-sm-6 col-lg-4">
                <div class="info-card position-relative">
                  <div
                    class="icon bg-warning rounded-circle text-center position-absolute start-0 text-white"
                  >
                    <i class="flaticon-money"></i>
                  </div>
                  <span
                    class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                  >
                    Ticket Price:
                  </span>
                  <span class="fw-medium text-paragraph"
                    >${{ getEvent?.price }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6 col-lg-5">
                <div class="info-card position-relative">
                  <div
                    class="icon bg-danger rounded-circle text-center position-absolute start-0 text-white"
                  >
                    <i class="flaticon-date-1"></i>
                  </div>
                  <span
                    class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                  >
                    Remaining Seats:
                  </span>
                  <span class="fw-medium text-paragraph"
                    >{{ getEvent?.remainingSeats }}/{{
                      getEvent?.totalSeats
                    }}</span
                  >
                </div>
              </div>
              <div class="col-sm-6 col-lg-5">
                <div class="info-card position-relative">
                  <div
                    class="icon bg-danger rounded-circle text-center position-absolute start-0 text-white"
                  >
                    <i class="flaticon-date-1"></i>
                  </div>
                  <span
                    class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                  >
                    Remaining Bottles:
                  </span>
                  <span class="fw-medium text-paragraph"
                    >{{ getEvent?.remainingBottles }}/{{
                      getEvent?.totalBottles
                    }}</span
                  >
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
        <div
          class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing contact-card"
        >
          <div class="mb-10 mb-sm-15 mb-lg-20">
            <h3 class="card-title fw-bold mb-0 fs-15 fs-md-16 fs-lg-18">
              Promoter information's
            </h3>
          </div>
          <div class="card-body p-20 p-md-25 p-lg-30">
            <div class="mb-15 mb-md-20 mb-lg-25 d-flex justify-content-between">
              <div class="position-relative rounded-circle">
                <img
                  v-if="storageUrl && getEvent?.partner?.user?.photo?.url"
                  :src="storageUrl + getEvent?.partner?.user?.photo?.url"
                  class="rounded-circle"
                  width="80"
                  height="80"
                  alt="user"
                />
              </div>
            </div>
            <h5 class="fs-15 fs-md-18 fw-bold text-black mb-0">
              {{ getEvent?.partner?.name + " " + getEvent?.partner?.surname }}
            </h5>
            <ul class="info-list ps-0 mb-0 list-unstyled">
              <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14"
                  >PHONE:</span
                >
                {{ getEvent?.partner?.phone }}
              </li>
              <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14"
                  >EMAIL:</span
                >
                {{ getEvent?.partner?.user?.email }}
              </li>
              <li class="text-paragraph fs-md-15 fs-lg-16 position-relative">
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14"
                  >ADDRESS:</span
                >
                {{ getEvent?.partner.address }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert";
import { storageUrl } from "../../utils/constants";
import Swiper from "swiper";

export default defineComponent({
  name: "EventDetails",
  data() {
    return {
      storageUrl: "",
      swiper: null, // Ajouter une référence au slider Swiper
    };
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
      if (inputTime) {
        // Extracting hour and minute from the time
        var [hour, minute] = inputTime.split(":").slice(0, 2);

        // Creating the new time string in the format "03:30"
        var newTimeFormat = hour + ":" + minute;

        return newTimeFormat;
      }
      return null;
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

    truncateDescription(description) {
      const maxLength = 65;
      if (description.length <= maxLength) {
        return description;
      } else {
        return description.slice(0, maxLength) + "...";
      }
    },
    navigateToEditCategoryPage(idCategoryEvent) {
      if (idCategoryEvent !== null && idCategoryEvent !== undefined) {
        this.$router.push({
          name: "EditCategoryEventPage",
          params: { idCategoryEvent: idCategoryEvent },
        });
      }
    },
    navigateToCategoryDetailPage(idCategoryEvent) {
      this.$router.push({
        name: "CategoryEventDetailsPage",
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
          this.$router.push({ name: "CategoriesEventPage" });
          // Afficher un message de succès
          swal({
            text: "Category deleted Successfully!",
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
    ...mapGetters(["getEventsError", "getEventsLoading", "getEvent"]),
  },
  async mounted() {
    this.storageUrl = storageUrl;
    if (this.$route.params && this.$route.params.idEvent) {
      console.log("ddd", this.$route.params.idEvent);
      await this.fetchOneEvent(this.$route.params.idEvent);
      console.log(this.getEvent);
    }
    // Initialiser le slider Swiper après que les images de l'événement ont été chargées
    this.swiper = new Swiper(".swiper-container", {
      // Configurer les options du slider Swiper selon vos besoins
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      allowTouchMove: false, // disable touch/swipe
    });
    // Add click event to navigation arrows
    const nextButton = document.querySelector(".swiper-button-next");
    const prevButton = document.querySelector(".swiper-button-prev");

    nextButton.addEventListener("click", () => {
      this.swiper.slideNext();
    });

    prevButton.addEventListener("click", () => {
      this.swiper.slidePrev();
    });
  },
});
</script>
<style scoped>
.event-swiper {
  margin: 0 auto; /* Centrer horizontalement */
  padding: auto;
}
.container-fluid {
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
}

.event-details-card {
  max-width: 100%;
}
.card-image {
  height: 500px;
  width: 100%; /* Redimensionner l'image à 100% de la largeur du conteneur */
}
/* Ajouter un espace entre les images */
.swiper-slide {
  margin-right: 70px; /* Espacement entre les images */
}
.swiper-container {
  position: relative;
}

.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px; /* Adjust as needed */
  height: 40px; /* Adjust as needed */
  background-color: rgba(255, 255, 255, 0.5); /* Adjust as needed */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(255, 255, 255, 0.8); /* Adjust as needed */
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-family: "swiper-icons";
  font-size: 20px;
  color: #000; /* Adjust as needed */
}

.swiper-button-prev {
  left: 10px; /* Adjust as needed */
}

.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 10px; /* Adjust as needed */
}
/* Ajouter un espace entre les images */
.swiper-slide {
  margin-right: 70px; /* Espacement entre les images */
}
.swiper-container {
  position: relative;
}

.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px; /* Adjust as needed */
  height: 40px; /* Adjust as needed */
  background-color: rgba(255, 255, 255, 0.5); /* Adjust as needed */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(255, 255, 255, 0.8); /* Adjust as needed */
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-family: "swiper-icons";
  font-size: 20px;
  color: #000; /* Adjust as needed */
}

.swiper-button-prev {
  left: 10px; /* Adjust as needed */
}

.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 10px; /* Adjust as needed */
}
</style>

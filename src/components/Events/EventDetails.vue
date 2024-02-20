<template>
  <BreadCrumb
    :PrevPage="'Events List'"
    :url="'/events'"
    :PageTitle="getEvent?.name"
  />
  <div class="row">
    <div
      class="card mb-30 border-0 rounded-0 bg-white event-details-card container-fluid"
    >
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(photo, index) in getEvent?.photos" :key="index">
          <img
            v-if="storageUrl && photo.url"
            :src="storageUrl + photo.url"
            alt="event-image"
            class="card-image"
        /></swiper-slide>
      </swiper>
      <div class="card-body p-15 letter-spacing">
        <div class="row">
          <!-- Ajout d'un conteneur flex -->

          <div class="col text-end">
            <a
              class="card-link-btn text-decoration-none text-primary fw-medium position-relative d-inline-block mt-10 mt-sm-0"
              href="javascript:void(0);"
              @click="navigateToEditEventPage(getEvent?.id)"
            >
              <i class="flaticon-pen lh-2 me-16 position-relative top-1"></i>
              Edit
            </a>
          </div>
        </div>
        <div class="ps-5 pe-5 mb-15 ps-sm-20 pe-sm-20 mb-sm-25">
          <div
            class="mb-12 mb-md-20 d-lg-flex align-items-center justify-content: space-between"
          >
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
                <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                  Promote by:
                  <span class="fw-semibold text-primary"
                    >{{
                      getEvent?.partner?.attributes.name +
                      " " +
                      getEvent?.partner?.attributes.surname
                    }}
                  </span>
                </span>
              </div>
              <div class="d-flex align-items-center">
                <div style="display: flex; justify-content: space-between">
                  <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                    Categories:
                  </span>
                  <div
                    v-for="(e, index) in getEvent?.categoryEvents"
                    :key="e.id"
                  >
                    <span class="text-primary">{{ e.name }}</span>
                    <span
                      v-if="index !== getEvent?.categoryEvents.length - 1"
                      class="text-muted"
                    >
                      -
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div style="display: flex; justify-content: space-between">
                  <span class="fw-semibold text-muted fs-12 fs-md-13 fs-lg-14">
                    Status:
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
              </div>
            </div>
          </div>
        </div>
        <div class="info bg-gray">
          <div class="row">
            <div class="col-sm-6 col-lg-6">
              <div class="info-card position-relative">
                <div
                  class="icon bg-info rounded-circle text-center position-absolute start-0 text-white"
                >
                  <i class="flaticon-clock"></i>
                </div>
                <span
                  class="d-block text-black-emphasis fs-md-15 fs-lg-16 fw-bold mb-1"
                >
                  Start:
                </span>
                <span class="fw-medium text-paragraph">
                  {{ changeDate(getEvent?.startDate) }}
                  {{ extractHourMinuteFromTime(getEvent?.startTime) }}
                </span>
              </div>
            </div>
            <div class="col-sm-6 col-lg-6">
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

            <div class="col-sm-6 col-lg-6">
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
            <div class="col-sm-6 col-lg-6">
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
            <div class="col-sm-6 col-lg-6">
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
            <div class="col-sm-6 col-lg-6">
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
        <div class="card mb-25 border-0 rounded-0 bg-white profile-intro-card">
          <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
            <div
              class="mb-15 mb-md-20 d-flex align-items-center justify-content-between"
            >
              <h5 class="card-title fw-bold mb-0 fs-lg-18">
                Promoter information's
              </h5>
            </div>
            <div
              class="user-info d-sm-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center">
                <div class="image">
                  <img
                    v-if="
                      storageUrl &&
                      getEvent?.partner?.attributes.user?.data?.attributes
                        ?.photo?.data?.attributes?.url
                    "
                    :src="
                      storageUrl +
                      getEvent?.partner?.attributes.user?.data?.attributes
                        ?.photo?.data?.attributes.url
                    "
                    class="rounded-circle"
                    width="85"
                    height="85"
                    alt="user"
                  />
                </div>
                <div class="ms-15 ms-md-20">
                  <h5 class="text-black fw-black mb-1">
                    {{
                      getEvent?.partner?.attributes.name +
                      " " +
                      getEvent?.partner?.attributes.surname
                    }}
                  </h5>
                  <!-- <span class="d-block text-muted">@victordynamic</span> -->
                </div>
              </div>
            </div>
            <div class="content pe-0">
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium mb-8">
                Phone
              </span>
              <p class="fs-md-15 mb-0 text-paragraph lh-base">
                {{ getEvent?.partner.attributes?.phone }}
              </p>
            </div>
            <div class="content pe-0">
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium mb-8">
                Email
              </span>
              <p class="fs-md-15 mb-0 text-paragraph lh-base">
                {{ getEvent?.partner?.attributes.user?.data.attributes.email }}
              </p>
            </div>
            <div class="content pe-0">
              <span class="d-block text-black fs-md-15 fs-lg-16 fw-medium mb-8">
                Address
              </span>
              <p class="fs-md-15 mb-0 text-paragraph lh-base">
                {{ getEvent?.partner.attributes.address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <loading
    v-model:active="getEventsLoading"
    :can-cancel="true"
    :is-full-page="true"
  />
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import swal from "sweetalert";
import { storageUrl } from "../../utils/constants";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import BreadCrumb from "../Common/BreadCrumb.vue";

export default defineComponent({
  name: "EventDetails",
  components: {
    Loading,
    Swiper,
    SwiperSlide,
    BreadCrumb,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data() {
    return {
      storageUrl: "",
      swiper: null, // Ajouter une référence au slider Swiper
    };
  },
  methods: {
    ...mapActions(["fetchOneEvent", "deleteCategoryEvent", "getEventsLoading"]),
    navigateToEditEventPage(idEvent) {
      if (idEvent !== null && idEvent !== undefined) {
        this.$router.push({
          name: "EditEventPage",
          params: { idEvent: idEvent },
        });
      }
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
            closeOnClickOutside: false,
          });
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
    // this.swiper = new Swiper(".swiper-container", {
    //   loop: false,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //   },
    //   allowTouchMove: false,
    //   on: {
    //     slideChange: () => {
    //       const bullets = document.querySelectorAll(
    //         ".swiper-pagination-bullet"
    //       );
    //       const activeIndex = this.swiper.realIndex;
    //       bullets.forEach((bullet, index) => {
    //         if (index === activeIndex) {
    //           bullet.classList.add("swiper-pagination-bullet-active");
    //         } else {
    //           bullet.classList.remove("swiper-pagination-bullet-active");
    //         }
    //       });
    //     },
    //   },
    // });
  },
});
</script>
<style scoped>
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #ddd;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
}

.swiper-pagination-bullet-active {
  background-color: #333;
}
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

<template>
  <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <button class="close_icon" @click="closeModal">×</button>
          <div class="d-flex align-items-start" v-if="dataProp">
            <div
              class="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                :class="{ active: openedOne.profile }"
                @click="openSection('profile')"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                :aria-controls="v - pills - home"
                :aria-selected="openedOne.profile"
              >
                Reservation Details
              </button>
              <button
                :class="{ active: openedOne.customer }"
                @click="openSection('customer')"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                :aria-controls="v - pills - profile"
                :aria-selected="openedOne.customer"
              >
                Customer Details
              </button>
              <button
                :class="{ active: openedOne.documents }"
                @click="openSection('documents')"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                :aria-controls="v - pills - messages"
                :aria-selected="openedOne.documents"
              >
                Reservation Documents
              </button>
              <button
                :class="{ active: openedOne.ressource }"
                @click="openSection('ressource')"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                :aria-controls="v - pills - settings"
                :aria-selected="openedOne.ressource"
              >
                Resource Details
              </button>
            </div>
            <div
              class="tab-content"
              id="v-pills-tabContent"
              style="width: 100%"
            >
              <div
                class="tab-pane fade"
                style="width: 100%"
                :class="{ 'show active': openedOne.profile }"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div
                  class="user-card"
                  style="
                    width: 100% !important ;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <span class="avatar-holder"> </span>
                  <span class="user-info-holder">
                    <h2 class="name">Reservation</h2>
                    <span
                      style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-around;
                      "
                    >
                      <span>{{ dataProp.attributes.pickup_date }}</span>
                      <span>{{ dataProp.attributes.drop_off_date }}</span>
                    </span>

                    <hr style="margin-top: -10px" />
                    <!-- <span class="skill">    pickup location : pickup
                      drop_off_location :drop</span> -->

                    <div
                      class="evaluations"
                      style="display: flex; flex-direction: row"
                    >
                      <div
                        style="
                          display: flex;
                          justify-content: flex-start;
                          align-items: center;
                          flex-direction: column;
                        "
                      >
                        <span class="stars evaluation">
                          <span class="star-icon evaluation-icon">
                            <!-- icon -->
                          </span>
                          <span class="star-text evaluation-text">
                            total amount :{{ dataProp.attributes.total_amount }}
                            $
                          </span>
                        </span>
                        <span class="reviews evaluation">
                          <span class="reviews-icon evaluation-icon">
                            <!-- icon -->
                          </span>
                          <span class="reviews-text evaluation-text">
                            added amount :
                            {{ dataProp.attributes.added_amount }} $
                          </span>
                        </span>
                      </div>

                      <div
                        style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          flex-direction: column;
                        "
                      >
                        <span class="student evaluation">
                          <span class="student-icon evaluation-icon">
                            <!-- icon -->
                          </span>
                          <span class="student-text evaluation-text"
                            >tax : {{ dataProp.attributes.tax }}
                          </span>
                        </span>
                        <span class="student evaluation">
                          <span class="student-icon evaluation-icon">
                            <!-- phone -->
                          </span>
                          <span class="student-text evaluation-text"
                            >phone : {{ dataProp.attributes.phone }}
                          </span>
                        </span>
                      </div>
                    </div>

                    <span class="desc">
                      <p>
                        drop off location :
                        {{ dataProp.attributes.drop_off_location }}
                      </p>
                    </span>

                    <!-- <span class="button">
                      <button class="show-more-btn">Show More</button>
                    </span> -->
                  </span>
                </div>
              </div>
              <div
                class="tab-pane fade"
                :class="{ 'show active': openedOne.customer }"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <div
                  class="user-card"
                  v-if="
                    dataProp.attributes.customer &&
                    dataProp.attributes.customer.data &&
                    dataProp.attributes.customer.data.attributes &&
                    dataProp.attributes.customer.data.attributes.user &&
                    dataProp.attributes.customer.data.attributes.user.data &&
                    dataProp.attributes.customer.data.attributes.user.data
                      .attributes
                  "
                >
                  <span class="avatar-holder">
                    <img
                      style="width: 120px; height: 120px"
                      :src="
                        getFullImageUrl(
                          dataProp.attributes.customer.data.attributes.user.data
                            .attributes.photo.data.attributes.url
                        )
                      "
                      alt="Avatar"
                    />
                  </span>
                  <span class="user-info-holder">
                    <h2 class="name">
                      {{ dataProp.attributes.customer.data.attributes.name }}
                      {{ dataProp.attributes.customer.data.attributes.surname }}
                    </h2>
                    <span class="skill">{{
                      dataProp.attributes.customer.data.attributes.user.data
                        .attributes.email
                    }}</span>

                    <div class="evaluations">
                      <span class="stars evaluation">
                        <span class="star-icon evaluation-icon">
                          <!-- icon -->
                        </span>
                        <span class="star-text evaluation-text"
                          >Driver Licence :
                          {{
                            dataProp.attributes.customer.data.attributes
                              .driver_license
                          }}</span
                        >
                      </span>

                      <span class="reviews evaluation">
                        <span class="reviews-icon evaluation-icon">
                          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                            <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                          </svg> -->
                        </span>
                        <span class="reviews-text evaluation-text"
                          >phone :
                          {{
                            dataProp.attributes.customer.data.attributes.phone
                          }}</span
                        >
                      </span>

                      <span class="student evaluation">
                        <span class="student-icon evaluation-icon">
                          Insurance :
                          {{
                            dataProp.attributes.customer.data.attributes
                              .Insurance
                          }}
                        </span>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div
                class="tab-pane fade"
                :class="{ 'show active': openedOne.documents }"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <div class="user-card" v-if="dataProp.attributes.documents">
                  <FileManager :documents="dataProp.attributes.documents" />
                </div>
              </div>
              <div
                class="tab-pane fade"
                :class="{ 'show active': openedOne.ressource }"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                <div
                  class="user-card"
                  style="width: 100% !important"
                  v-if="
                    dataProp.attributes.villa &&
                    dataProp.attributes.villa.data &&
                    dataProp.attributes.villa.data.attributes
                  "
                >
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Card Title</h5>
                          <p class="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                          <p class="card-text">
                            <small class="text-muted"
                              >Last updated 3 mins ago</small
                            >
                          </p>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <img
                          src=""
                          class="img-fluid rounded-start"
                          alt="Card image cap"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="user-card"
                  style="width: 100% !important"
                  v-if="
                    dataProp.attributes.vehicle &&
                    dataProp.attributes.vehicle &&
                    dataProp.attributes.vehicle.data &&
                    dataProp.attributes.vehicle.data.attributes &&
                    dataProp.attributes.vehicle.data.attributes.photos &&
                    dataProp.attributes.vehicle.data.attributes.photos.data
                  "
                >
                  <div class="">
                    <div class="row g-0">
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title" v-if="dataProp.attributes.vehicle && dataProp.attributes.vehicle.data && dataProp.attributes.vehicle.data.attributes && dataProp.attributes.vehicle.data.attributes.make && dataProp.attributes.vehicle.data.attributes.make.data && dataProp.attributes.vehicle.data.attributes.make.data.attributes ">
  {{   dataProp.attributes.vehicle.data.attributes.make.data.attributes.name }}
                          </h5>
                          <p class="card-text">
                            {{
                              dataProp.attributes.vehicle.data.attributes
                                .description
                            }}
                          </p>
                          <p class="card-text">
                            <small class="text-muted"
                              >Daily :
                              {{
                                dataProp.attributes.vehicle.data.attributes
                                  .daily
                              }}$</small
                            >
                          </p>
                          <p class="card-text">
                            <small
                              class="text-muted"
                              v-if="
                                dataProp.attributes.vehicle.data.attributes
                                  .partner &&
                                dataProp.attributes.vehicle.data.attributes
                                  .partner.data
                              "
                              >Partner :
                              {{
                                dataProp.attributes.vehicle.data.attributes
                                  .partner.data.attributes.name
                              }}</small
                            >
                          </p>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <img
                          style="width: 100%; height: 100% !important"
                          :src="
                            getFullImageUrl(
                              dataProp.attributes.vehicle.data.attributes.photos
                                .data[0].attributes.url
                            )
                          "
                          alt="Card image cap"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="user-card"
                  style="width: 100% !important"
                  v-if="
                    dataProp.attributes.event &&
                    dataProp.attributes.event.data &&
                    dataProp.attributes.event.data.attributes
                  "
                >
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Card Title</h5>
                          <p class="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                          <p class="card-text">
                            <small class="text-muted"
                              >Last updated 3 mins ago</small
                            >
                          </p>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <img
                          src=""
                          class="img-fluid rounded-start"
                          alt="Card image cap"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import FileManager from "../FileManagar/FileManager.vue";
export default {
  props: {
    show: Boolean,
    dataProp: {
      type: Object,
      required: true,
    },
  },
  components: {
    FileManager,
  },
  data() {
    return {
      dataAtt: this.dataProp,
      name: "",
      openedOne: {
        profile: true,
        customer: false,
        documents: false,
        ressource: false,
      },
    };
  },
  methods: {
    getFullImageUrl(relativePath) {
      console.log(relativePath, "relativePath");
      const stockage = process.env.VUE_APP_STORAGE_URL;
      return `${stockage}${relativePath}`;
    },
    closeModal() {
      this.$emit("close");
    },
    openSection(section) {
      // Reset all sections to false
      for (let key in this.openedOne) {
        this.openedOne[key] = false;
      }
      // Set the clicked section to true
      this.openedOne[section] = true;
    },
  },
  mounted() {
    console.log("openedOne.customer:", this.openedOne.customer);
    console.log(this.dataProp, "reservation");
  },
};
</script>
<style lang="scss" scoped>
.active {
  background-color: #6560f0 !important;
  color: white !important;
}
.nav-link:hover {
  background-color: #6560f0 !important;
  color: white !important;
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(110, 110, 110, 0.7);
}

.modal-inner {
  position: relative;
  max-width: 700px;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 32px;
  text-align: center;

  .confirmation-text {
    font-size: 18px;
    margin-bottom: 24px;
  }

  .buttons {
    display: flex;
    justify-content: center;

    button {
      padding: 10px 20px;
      margin: 0 8px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #34495e;
      }
    }
  }

  .close_icon {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 24px;
    color: #333;
    cursor: pointer;
  }
}
button {
  background-color: white !important;
  color: #34495e !important;
  border: none !important;
  padding: 3px !important;
}
.buttons {
  display: flex !important;
  flex-direction: row !important;
  gap: 5px !important;
}
button :hover {
  background-color: #333 !important ;
  color: white !important;
  border: none !important;
}
.confirm-button {
  background-color: #fff;
  color: #34495e;
  border: 1px solid #34495e;
}

.user-card {
  width: 100%;
  height: auto;
  display: flex;
  padding: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  gap: 1rem;
  color: #333;
}

.avatar-holder img {
  width: 36rem;
  height: 12rem;
  border-radius: 50%;
  background: #e6effa;
  padding: 0.5rem;
  position: relative;
  display: block;
  object-fit: cover;
}

.user-info-holder {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  font-size: 1.625rem;
  color: #1c2b62;
  font-weight: bold;
  font-family: "Merriweather", sans-serif;
}

.skill {
  font-size: 1rem;
  color: #1c2b62;
}

.evaluations {
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  color: #1c2b62;
}

.evaluation-icon svg {
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
}

.desc {
  color: #1c2b62;
  font-weight: 300;
}

.show-more-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #1c2b62;
  font-size: 1rem;
  font-weight: 600;
  color: #1c2b62;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.25s ease 0s;
}

.show-more-btn:hover,
.show-more-btn:focus {
  background: #1c2b62;
  color: #fff;
}

@media screen and (max-width: 768px) {
  .user-card {
    flex-direction: column;
    align-items: center;
  }
}
</style>

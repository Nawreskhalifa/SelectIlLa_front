<template>
   <transition name="modal-animation">
    <div v-show="show" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="show" class="modal-inner">
          <div class="card">
            <div class="row">
              <div class="col-lg-5 col-xl-4">
                <div
                  class="card mb-25 border-0 rounded-0 bg-white letter-spacing lead-info-box"
                >
                  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
                    <div class="profile-info d-sm-flex align-items-center">
                       <div class="title mt-12 mt-sm-0">
                        <h5 class="text-black fw-medium mb-8">
                         {{partner.name}}
                        </h5>
                      </div>
                    </div>
                    <div
                      class="border-top mt-15 mb-15 mt-sm-20 mb-sm-20 mt-md-25 mb-md-25 mt-lg-30 mb-lg-30"
                    ></div>
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >

                    </div>
                    <ul class="info mt-25 ps-0 mb-0 list-unstyled">

                      <li class="position-relative">
                        <div class="icon text-info rounded-circle text-center">
                          <i class="flaticon-telephone-call"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold"
                          >Phone No</span
                        >
                        <a
                          href="tel:+1-321-456-8756"
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none"
                        >
 {{partner.phone}}                        </a>
                      </li>
                      <li class="position-relative">
                        <div
                          class="icon text-primary rounded-circle text-center"
                        >
                          <i class="flaticon-web"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold"
                          >Website</span
                        >
                        <a
                          href="#"
                          target="_blank"
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted text-decoration-none"
                        >
                          Johnydev.com
                        </a>
                      </li>
                      <li class="position-relative">
                        <div
                          class="icon text-warning rounded-circle text-center"
                        >
                          <i class="flaticon-industry"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold"
                          >Industry</span
                        >
                        <span
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted"
                        >
                          Medium
                        </span>
                      </li>
                      <li class="position-relative">
                        <div class="icon text-info rounded-circle text-center">
                          <i class="flaticon-employee"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold">
                          No Of Employees
                        </span>
                        <span
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted"
                        >
                          125
                        </span>
                      </li>
                      <li class="position-relative">
                        <div
                          class="icon text-success rounded-circle text-center"
                        >
                          <i class="flaticon-money"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold">
                          Annual Revenue
                        </span>
                        <span
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted"
                        >
                          $ 24000 USD
                        </span>
                      </li>
                      <li class="position-relative">
                        <div class="icon text-info rounded-circle text-center">
                          <i class="flaticon-date-1"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold">
                          Last Contacted
                        </span>
                        <span
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted"
                        >
                          12 March 2023, 10:54 AM
                        </span>
                      </li>
                      <li class="position-relative">
                        <div
                          class="icon text-primary rounded-circle text-center"
                        >
                          <i class="flaticon-search-1"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold">
                          Lead Source
                        </span>
                        <span
                          class="d-inline-block fs-md-15 fs-lg-16 text-muted"
                        >
                          Social media advertisement
                        </span>
                      </li>
                      <li class="position-relative">
                        <div
                          class="icon text-warning rounded-circle text-center"
                        >
                          <i class="flaticon-status"></i>
                        </div>
                        <span class="d-block text-black mb-5 fw-semibold">
                          Lead Status
                        </span>
                        <span class="badge text-outline-info">New Lead</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-7 col-xl-8">
                <div class="leads-details-tabs">
                  <ul
                    class="nav nav-tabs border-0 mb-25"
                    id="myTab"
                    role="tablist"
                  >
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100 active"
                        id="tasks-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tasks-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="tasks-tab-pane"
                        aria-selected="true"
                      >
                        Ressources
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
                        id="deals-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#deals-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="deals-tab-pane"
                        aria-selected="false"
                      >
                        Deals
                      </button>
                    </li>

                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link fs-md-15 fs-lg-16 fw-medium border-0 rounded-0 d-block text-center w-100"
                        id="attachments-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#attachments-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="attachments-tab-pane"
                        aria-selected="false"
                      >
                        Attachments
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active Mytap"
                      id="tasks-tab-pane"
                      role="tabpanel"
                      tabindex="0"
                    >

                        <div class="grid">


                          <div v-for="(item,i) in allRessources" :key="i">
                            <img src="item" alt="Sample photo">
                            <div class="text">
                              <h3 v-if="item.make">{{item.make }} </h3>
                              <h3 v-if="item.name">{{item.name }} </h3>
                              <p> {{ item.description}} </p>
                              </div>
                          </div>
                        </div>

                     </div>
                    <div
                      class="tab-pane fade"
                      id="deals-tab-pane"
                      role="tabpanel"
                      tabindex="0"
                    >
                      <div
                        class="card mb-25 border-0 rounded-0 bg-white letter-spacing"
                      >
                        <div
                          class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
                        >
                          <h5 class="card-title fw-bold mb-0">Emails</h5>
                          <div class="d-flex align-items-center mt-10 mt-md-0">
                            <form class="search-box position-relative me-15">
                              <input
                                type="text"
                                class="form-control shadow-none text-black rounded-0 border-0"
                                placeholder="Search email"
                              />
                              <button
                                type="submit"
                                class="bg-transparent text-primary transition p-0 border-0"
                              >
                                <i class="flaticon-search-interface-symbol"></i>
                              </button>
                            </form>
                            <button
                              class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block mt-10 mt-sm-0"
                              type="button"
                            >
                              <i class="flaticon-dots"></i>
                            </button>
                          </div>
                        </div>
                        <div
                          class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="emails-tab-pane"
                      role="tabpanel"
                      tabindex="0"
                    >
                      <div
                        class="card mb-25 border-0 rounded-0 bg-white letter-spacing"
                      >
                        <div
                          class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
                        >
                          <h5 class="card-title fw-bold mb-0">Emails</h5>
                          <div class="d-flex align-items-center mt-10 mt-md-0">
                            <form class="search-box position-relative me-15">
                              <input
                                type="text"
                                class="form-control shadow-none text-black rounded-0 border-0"
                                placeholder="Search email"
                              />
                              <button
                                type="submit"
                                class="bg-transparent text-primary transition p-0 border-0"
                              >
                                <i class="flaticon-search-interface-symbol"></i>
                              </button>
                            </form>
                            <button
                              class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block mt-10 mt-sm-0"
                              type="button"
                            >
                              <i class="flaticon-dots"></i>
                            </button>
                          </div>
                        </div>
                        <div
                          class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="attachments-tab-pane"
                      role="tabpanel"
                      tabindex="0"
                    >
                      <div
                        class="card mb-25 border-0 rounded-0 bg-white letter-spacing"
                      >
                        <div
                          class="card-head bg-white d-md-flex align-items-center justify-content-between pt-15 pb-15 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
                        >
                          <h5 class="card-title fw-bold mb-0">Emails</h5>
                          <div class="d-flex align-items-center mt-10 mt-md-0">
                            <form class="search-box position-relative me-15">
                              <input
                                type="text"
                                class="form-control shadow-none text-black rounded-0 border-0"
                                placeholder="Search email"
                              />
                              <button
                                type="submit"
                                class="bg-transparent text-primary transition p-0 border-0"
                              >
                                <i class="flaticon-search-interface-symbol"></i>
                              </button>
                            </form>
                            <button
                              class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block mt-10 mt-sm-0"
                              type="button"
                            >
                              <i class="flaticon-dots"></i>
                            </button>
                          </div>
                        </div>
                        <div
                          class="card-body pt-0 pb-15 pb-sm-20 pb-md-25 pb-lg-30 ps-15 pe-15 ps-sm-20 pe-sm-20 ps-md-25 pe-md-25 ps-lg-30 pe-lg-30"
                        >
                          <ul class="list ps-0 mb-0 list-unstyled">
                            <li>
                              <span class="fw-medium d-block fs-md-15 fs-lg-16">
                                <i
                                  class="flaticon-image lh-1 position-relative text-primary top-2 me-5"
                                ></i>
                                Adlash_1.png
                              </span>
                              <div
                                class="d-flex align-items-center text-muted mt-5"
                              >
                                <span class="d-block">555kb</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">J. Ronan</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">13 Apr, 2023</span>
                              </div>
                              <img alt="admin" width="100" class="mt-10" />
                            </li>
                            <li>
                              <span class="fw-medium d-block fs-md-15 fs-lg-16">
                                <i
                                  class="flaticon-image lh-1 position-relative text-primary top-2 me-5"
                                ></i>
                                Adlash_2.png
                              </span>
                              <div
                                class="d-flex align-items-center text-muted mt-5"
                              >
                                <span class="d-block">1MB</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">J. Pinkman</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">12 Apr, 2023</span>
                              </div>
                            </li>
                            <li>
                              <span class="fw-medium d-block fs-md-15 fs-lg-16">
                                <i
                                  class="flaticon-image lh-1 position-relative text-primary top-2 me-5"
                                ></i>
                                Adlash_3.png
                              </span>
                              <div
                                class="d-flex align-items-center text-muted mt-5"
                              >
                                <span class="d-block">472kb</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">A. Carter</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">11 Apr, 2023</span>
                              </div>
                            </li>
                            <li>
                              <span class="fw-medium d-block fs-md-15 fs-lg-16">
                                <i
                                  class="flaticon-document lh-1 position-relative text-primary top-2 me-5"
                                ></i>
                                Adlash_4.txt
                              </span>
                              <div
                                class="d-flex align-items-center text-muted mt-5"
                              >
                                <span class="d-block">433kb</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">V. Loper</span>
                                <span
                                  class="w-6 h-6 rounded-circle bg-muted ms-8 me-8"
                                ></span>
                                <span class="d-block">10 Apr, 2023</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons">
              <button class="confirm-button" @click="confirmUpdate">
                Confirm
              </button>
              <button class="cancel-button" @click="closeModal">No</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
 </template>

<script>
 export default {
  props: {
    show: Boolean,
    partner: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      partnerUser :{
        type:Object
      },
      ressources:{}

    };
  },
  computed:{
    allRessources() {
    if (this.partner && this.partner.vehicles && this.partner.villas && this.partner.events) {
        const data = [...this.partner.vehicles, ...this.partner.villas, ...this.partner.events];
        console.log(data);
        return data;
    } else {
        // Handle the case where `this.partner` or its properties are not defined
        console.error("Partner data or its properties are not defined.");
        return [];
    }
}
},
  methods: {
    closeModal() {
      this.$emit("close");
    },


  },

  async created() {
    console.log(this.partner);

  },
}
 </script>

<style lang="scss" scoped>
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
  top: 0; /* Adjust this value to create space from the top */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(110, 110, 110, 0.7);
}

.modal-inner {
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

      &.confirm-button {
        background-color: #6560f0;
        color: #fff;
      }

      &.cancel-button {
        background-color: #fff;
        color: #6560f0;
      }

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
.card {
  margin-top: 50% !important;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}

.grid > article {
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
}

.grid > article img {
  max-width: 100%;
}

.grid .text {
  padding: 20px;
}

</style>
